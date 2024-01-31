import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./components/webview.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Web SDK v" + VERSION.major;

  ngOnInit() {}
}
