import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserAppComponent } from './user-app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    UserAppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [UserAppComponent]
})
export class AppModule { }
