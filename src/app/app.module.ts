import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StarterAppComponent } from './starter-app.component';
import { StarterComponent } from './starter/starter.component';
import { StarterService } from './shared/starter.service';

@NgModule({
  declarations: [
    StarterAppComponent,
    StarterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StarterService
  ],
  bootstrap: [
    StarterAppComponent
  ]
})
export class AppModule { }
