import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { OnfidoComponent } from './components/onfido.component'

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, OnfidoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
