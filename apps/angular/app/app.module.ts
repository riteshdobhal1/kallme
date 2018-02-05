import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule}     from '@angular/http';
import {AppComponent}  from './app.component';
import {routing}  from './app.routing';
import {AppService} from './app.service';
import {JsonpService} from './jsonp.service';
import {FormsModule} from "@angular/forms";
import {Ng2CompleterModule} from "ng2-completer";

@NgModule({
    imports: [BrowserModule, JsonpModule, routing, HttpModule, Ng2CompleterModule, FormsModule],
    declarations: [AppComponent],
    providers: [AppService, JsonpService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
