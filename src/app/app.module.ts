import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DemoAppComponent } from './demo-app.component';
import { DemoComponent } from './demo/demo.component';
import { DemoService } from './shared/demo.service';

@NgModule({
  declarations: [
    DemoAppComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DemoService
  ],
  bootstrap: [
    DemoAppComponent
  ]
})
export class AppModule { }
