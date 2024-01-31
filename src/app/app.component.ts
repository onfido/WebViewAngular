import type { OnInit } from '@angular/core'
import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  templateUrl: './components/webview.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Web SDK Angular WebView integration'

  ngOnInit() {}
}
