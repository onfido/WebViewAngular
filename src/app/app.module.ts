import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { WebViewComponent } from './components/webview.component'

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, WebViewComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
