import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } 	 from '@angular/http';
import { AppComponent }  from './app.component';
import { routing }  from './app.routing';
import { AppService } from './app.service';
@NgModule({
  imports:      [ BrowserModule, routing, HttpModule],
  declarations: [ AppComponent ],
  providers: [ AppService ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
