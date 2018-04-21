import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}     from '@angular/http';
import {AppComponent}  from './app.component';
import {routing}  from './app.routing';
import {AppService} from './app.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'angular2-select';
import {Ng2CompleterModule} from "ng2-completer";
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
   if (!items) return [];
   return items.filter(it => it[field] == value);
 }
}


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, SelectModule, routing, HttpModule, Ng2CompleterModule, FormsModule],
    declarations: [AppComponent,SearchFilterPipe],
    providers: [AppService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
