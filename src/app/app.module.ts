import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomObservablesComponent } from './custom-observables/custom-observables.component';
import { AlphabetInvasionComponent } from './alphabet-invasion/alphabet-invasion.component';
import { HttpPollingComponent } from './http-polling/http-polling.component';
import { TypeAheadComponent } from './type-ahead/type-ahead.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomObservablesComponent,
    AlphabetInvasionComponent,
    HttpPollingComponent,
    TypeAheadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
