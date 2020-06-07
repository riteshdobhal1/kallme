"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_service_1 = require("./app.service");
var forms_1 = require("@angular/forms");
var angular2_select_1 = require("angular2-select");
var ng2_completer_1 = require("ng2-completer");
var core_2 = require("@angular/core");
var SearchFilterPipe = /** @class */ (function () {
    function SearchFilterPipe() {
    }
    SearchFilterPipe.prototype.transform = function (items, field, value) {
        if (!items)
            return [];
        return items.filter(function (it) { return it[field] == value; });
    };
    SearchFilterPipe = __decorate([
        core_2.Pipe({
            name: 'searchfilter'
        }),
        core_2.Injectable()
    ], SearchFilterPipe);
    return SearchFilterPipe;
}());
exports.SearchFilterPipe = SearchFilterPipe;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, angular2_select_1.SelectModule, app_routing_1.routing, http_1.HttpModule, ng2_completer_1.Ng2CompleterModule, forms_1.FormsModule],
            declarations: [app_component_1.AppComponent, SearchFilterPipe],
            providers: [app_service_1.AppService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
