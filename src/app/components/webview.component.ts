import type { AfterViewInit } from '@angular/core'
import { Component, Inject, ElementRef, Renderer2 } from '@angular/core'
import type { SafeResourceUrl } from '@angular/platform-browser'
import { DomSanitizer } from '@angular/platform-browser'
import { environment } from '../environments/environment'

@Component({
  selector: 'app-webview',
  template: ` <div id="onfido-container"></div> `,
})
export class WebViewComponent implements AfterViewInit {
  webviewUrl: SafeResourceUrl

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
        const token = environment.SDK_TOKEN
        const workflowRunId = environment.WORKFLOW_RUN_ID

        const onfidoInit = `
        Onfido.init({
            "token": "${token}",
            "workflowRunId": "${workflowRunId}",
            "containerId": "onfido-container",
            onComplete: '_complete',
            onError: '_error'
          })
        `
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
