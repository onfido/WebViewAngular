import { Component, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-webview",
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
  webviewUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.webviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://sdk.onfido.com/blank");
  }

  ngAfterViewInit() {
    const loadWebSDKJs = new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement("script");
      script.src = "https://sdk.onfido.com/capture/core/latest/Onfido.iife.js";
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.renderer.appendChild(
        this.el.nativeElement.ownerDocument.head,
        script,
      );
    });

    loadWebSDKJs
      .then(() => {
        const token = "api_token";
        const workflowRunId = "api_token";

        const onfidoInit = `
        Onfido.init({
            "token": "${token}",
            "workflowRunId": "${workflowRunId}",
            onComplete: '_complete',
            onError: '_error'
          })
        `;
        const script = this.renderer.createElement("script");
        script.text = onfidoInit;
        this.renderer.appendChild(this.el.nativeElement.ownerDocument.head, script);
      })
      .catch(() => {
        console.error("Error loading onfido init!");
        // Handle error loading scripts
      });
  }
}
