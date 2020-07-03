import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomObservablesComponent } from './custom-observables/custom-observables.component';
import { AlphabetInvasionComponent } from './alphabet-invasion/alphabet-invasion.component';
import { HttpPollingComponent } from './http-polling/http-polling.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomObservablesComponent,
    AlphabetInvasionComponent,
    HttpPollingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
