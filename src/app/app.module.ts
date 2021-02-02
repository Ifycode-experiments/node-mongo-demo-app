import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserAppComponent } from './user-app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    UserAppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [UserAppComponent]
})
export class AppModule { }
