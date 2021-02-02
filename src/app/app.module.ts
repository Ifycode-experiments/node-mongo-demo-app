import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserAppComponent } from './user-app.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    UserAppComponent
  ],
  imports: [
    BrowserModule
    //BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [UserAppComponent]
})
export class AppModule { }
