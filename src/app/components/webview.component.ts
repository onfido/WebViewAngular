import type { AfterViewInit } from '@angular/core'
import { Component, Inject, ElementRef, Renderer2 } from '@angular/core'
import type { SafeResourceUrl } from '@angular/platform-browser'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-webview',
  template: `
    <div>
      <iframe
        [src]="webviewUrl"
        width="100%"
        height="10px"
        frameborder="0"
      ></iframe>
    </div>
  `,
})
export class WebViewComponent implements AfterViewInit {
  webviewUrl: SafeResourceUrl

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ElementRef) private el: ElementRef
  ) {
    const url = 'https://sdk.onfido.com/blank'
    this.webviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  ngAfterViewInit() {
    const loadWebSDKJs = new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script')
      script.src = 'https://sdk.onfido.com/capture/core/latest/Onfido.iife.js'
      script.onload = () => resolve()
      script.onerror = () => reject()
      this.renderer.appendChild(
        this.el.nativeElement.ownerDocument.head,
        script
      )
    })

    loadWebSDKJs
      .then(() => {
        const token =
          'eyJhbGciOiJFUzUxMiJ9.eyJleHAiOjE3MDY2MzgxMTUsInBheWxvYWQiOnsiYXBwIjoiN2E1OWFjYWItNTUxZC00NWU4LWE3YzUtM2RmZDQ2MTJhZmZjIiwiY2xpZW50X3V1aWQiOiIzYzNkNDRlMC0xMTNlLTQ0OGQtOGVkYy03MzM0MDQxYWVhYjgiLCJpc19zYW5kYm94IjpmYWxzZSwiaXNfc2VsZl9zZXJ2aWNlX3RyaWFsIjpmYWxzZSwiaXNfdHJpYWwiOmZhbHNlLCJzYXJkaW5lX3Nlc3Npb24iOiJkYjA5NzNjZS1mYzBjLTQ2MDMtYjM1OS1jOGU3YWRiYmZkYTkiLCJoYXNfdXNhZ2VfcGxhbiI6ZmFsc2V9LCJ1dWlkIjoicGxhdGZvcm1fc3RhdGljX2FwaV90b2tlbl91dWlkIiwidXJscyI6eyJkZXRlY3RfZG9jdW1lbnRfdXJsIjoiaHR0cHM6Ly9maW5kLWRvY3VtZW50LWluLWltYWdlLmV1LXdlc3QtMS5kZXYub25maWRvLnh5eiIsInN5bmNfdXJsIjoiaHR0cHM6Ly9jcm9zcy1kZXZpY2Utc3luYy5ldS13ZXN0LTEuZGV2Lm9uZmlkby54eXoiLCJob3N0ZWRfc2RrX3VybCI6Imh0dHBzOi8vaWQuZXUtd2VzdC0xLmRldi5vbmZpZG8ueHl6IiwiYXV0aF91cmwiOiJodHRwczovL2FwaS5ldS13ZXN0LTEuZGV2Lm9uZmlkby54eXoiLCJvbmZpZG9fYXBpX3VybCI6Imh0dHBzOi8vYXBpLmV1LXdlc3QtMS5kZXYub25maWRvLnh5eiIsInRlbGVwaG9ueV91cmwiOiJodHRwczovL2FwaS5ldS13ZXN0LTEuZGV2Lm9uZmlkby54eXoifX0.MIGHAkFSBSohX7GiYa9svS1e3vHffZk7NOIvSAOxxaZMVrOOTb-_CoZde0JvBmTjAKCP-XQt3tZqozuGqzMgKIzsqdfiqwJCAda8e1q76t_Cp0rKr1es3CMBjNVWb1VxlLcS5C3xes-quxFYQ3aXA6JuA-I4pGDohGfGyma04_JN2fp_m6UruPfb'
        const workflowRunId = 'f646a14c-77d8-49c4-94cd-91f11a2287b4'

        const onfidoInit = `
        Onfido.init({
            "token": "${token}",
            "workflowRunId": "${workflowRunId}",
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
