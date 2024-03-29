import type { AfterViewInit } from '@angular/core'
import { Component, Inject, ElementRef, Renderer2 } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { environment } from '../environments/environment'

@Component({
  selector: 'onfido-sdk',
  template: '<div id="onfido"></div>',
})
export class OnfidoComponent implements AfterViewInit {
  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private el: ElementRef
  ) {}

  ngAfterViewInit() {
    const loadWebSDKJs = new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script')
      script.src = `https://sdk.onfido.com/capture/core/${environment.SDK_TARGET_VERSION}/Onfido.iife.js`
      script.onload = () => resolve()
      script.onerror = () => reject()
      this.renderer.appendChild(
        this.el.nativeElement.ownerDocument.head,
        script
      )
    })

    loadWebSDKJs
      .then(() => {
        const isClassicIntegration = environment.IS_CLASSIC_INTEGRATION

        const token = environment.SDK_TOKEN
        const workflowRunId = environment.WORKFLOW_RUN_ID

        let onfidoInit = `
          Onfido.init({
              token: "${token}",
              workflowRunId: "${workflowRunId}",
              containerId: "onfido",
              onComplete: (data) => window._complete = data,
              onError: (error) => window._error = error,
            })
        `

        if (isClassicIntegration === 'true') {
          onfidoInit = `
            Onfido.init({
                token: "${token}",
                "steps": [{"type": "document", "options": { "disableCrossDevice": true } }],
                containerId: "onfido",
                onComplete: (data) => window._complete = data,
                onError: (error) => window._error = error,
              })
            `
        }
        const script = this.renderer.createElement('script')
        script.text = onfidoInit
        this.renderer.appendChild(
          this.el.nativeElement.ownerDocument.head,
          script
        )
      })
      .catch(() => {
        console.error('Error loading onfido init!')
        // Handle error loading scripts
      })
  }
}
