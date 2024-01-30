import { Component, OnInit, VERSION } from "@angular/core";
import { init, SdkHandle } from "onfido-sdk-ui";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;
  onfido: SdkHandle = null;

  ngOnInit() {
    this.initOnfido();
  }

  initOnfido() {
    this.onfido = init({
      token:
        "test",
      containerId: "onfido-mount",
      onComplete: () => {
        console.log("completed");
      },

      shouldCloseOnOverlayClick: true,
      useModal: false,
      isModalOpen: true,
      onUserExit: (code) => {
        console.log("user exit ", code);
      },
      onError: (e) => {
        console.log("error", e);
      },
      onModalRequestClose: (() => {
        console.log("request close");
        this.onfido.setOptions({ isModalOpen: false });
      }).bind(this),
      steps: ["welcome", "document", "face", "complete"],
    });

    addEventListener("userAnalyticsEvent", (event: any) =>
      console.log("event", event.detail),
    );
  }
}
