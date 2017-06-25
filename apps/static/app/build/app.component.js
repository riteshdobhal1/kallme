"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("./app.service");
var global = require("./shared/global");
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.hideElement = true;
        this.categoryItems = [];
        this.home = global.home;
        this.contact = global.contact;
        this.about = global.about;
        this.services = global.services;
        this.login_signup = global.login_signup;
        this.search = global.search;
        this.home_img_title1 = global.home_img_title1;
        this.home_img_title2 = global.home_img_title2;
        this.services_header = global.services_header;
        this.aboutus_header = global.aboutus_header;
        this.aboutus_title = global.aboutus_title;
        this.address_header = global.address_header;
        this.phone = global.phone;
        this.email = global.email;
        this.copyright = global.copyright;
        this.address_description = global.address_description;
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        this.getCategoryItems();
    };
    AppComponent.prototype.getCategoryItems = function () {
        this.categoryItems = this.appService.getCategory();
        console.log(this.categoryItems);
    };
    AppComponent.prototype.toggleElement = function () {
        if (this.hideElement) {
            this.hideElement = false;
        }
        else {
            this.hideElement = true;
        }
    };
    AppComponent.prototype.showList = function () {
        console.log("called");
    };
    AppComponent.prototype.getUser = function () {
        console.log(this.appService.getUser());
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html'
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map