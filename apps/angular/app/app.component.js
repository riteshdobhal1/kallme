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
const core_1 = require("@angular/core");
const app_service_1 = require("./app.service");
const globalval = require("./shared/global");
const $ = require("jquery");
let AppComponent = class AppComponent {
    constructor(appService) {
        this.appService = appService;
        this.hideElement = true;
        this.showHome = true;
        this.home = globalval.home;
        this.contact = globalval.contact;
        this.about = globalval.about;
        this.services = globalval.services;
        this.login_signup = globalval.login_signup;
        this.search = globalval.search;
        this.home_img_title1 = globalval.home_img_title1;
        this.home_img_title2 = globalval.home_img_title2;
        this.services_header = globalval.services_header;
        this.aboutus_header = globalval.aboutus_header;
        this.aboutus_title = globalval.aboutus_title;
        this.address_header = globalval.address_header;
        this.phone = globalval.phone;
        this.email = globalval.email;
        this.copyright = globalval.copyright;
        this.address_description = globalval.address_description;
        this.categoryObj = {};
        this.subCategoryObj = {};
        this.categoryFilter = {};
        this.subCategoryFilter = {};
        this.appService.getUser().subscribe(user => {
            console.log(user);
        });
    }
    ;
    searchCategories() {
        this.categoryObj = {};
        this.subCategoryObj = {};
        this.categoryFilter = {};
        this.subCategoryFilter = {};
        if (!!this.search.length) {
            this.appService.getSearchResults(this.search).subscribe(contentList => {
                this.contentList = contentList;
                this.filteredContent = contentList;
                this.showHome = false;
                this.contentList.forEach(content => {
                    if (this.categoryObj.hasOwnProperty(content["category"])) {
                        this.categoryObj[content["category"]] = this.categoryObj[content["category"]] + 1;
                    }
                    else {
                        this.categoryObj[content["category"]] = 1;
                    }
                    if (this.subCategoryObj.hasOwnProperty(content["sub_category"])) {
                        this.subCategoryObj[content["sub_category"]] = this.subCategoryObj[content["sub_category"]] + 1;
                    }
                    else {
                        this.subCategoryObj[content["sub_category"]] = 1;
                    }
                });
                this.categoryList = Object.keys(this.categoryObj);
                this.subCategoryList = Object.keys(this.subCategoryObj);
            }, err => {
                console.log(err);
                return false;
            });
        }
        else {
            this.showHome = true;
            this.contentList = [];
        }
    }
    filterCategory(target, key) {
        if (target.checked == true) {
            this.categoryFilter[key] = true;
        }
        else {
            delete this.categoryFilter[key];
        }
        this.filterResults();
    }
    filterSubCategory(target, key) {
        if (target.checked == true) {
            this.subCategoryFilter[key] = true;
        }
        else {
            delete this.subCategoryFilter[key];
        }
        this.filterResults();
    }
    filterResults() {
        if (Object.keys(this.categoryFilter).length === 0 && Object.keys(this.subCategoryFilter).length === 0) {
            this.filteredContent = this.contentList;
        }
        else {
            this.filteredContent = this.contentList.filter(content => {
                if (this.categoryFilter.hasOwnProperty(content["category"]) || this.subCategoryFilter.hasOwnProperty(content["sub_category"])) {
                    return content;
                }
            });
        }
    }
    goToHome() {
        this.search = '';
        this.showHome = true;
    }
    ngOnInit() {
        this.getCategoryItems();
        $('#myTab a').click(function (e) {
            var contentId = "link_" + $(this).attr('id');
            if (contentId == "link_login") {
                $("#link_login").show();
                $("#link_signup").hide();
            }
            else {
                $("#link_login").hide();
                $("#link_signup").show();
            }
        });
    }
    getCategoryItems() {
        this.appService.getCategory().subscribe(categoryItems => {
            this.categoryItems = categoryItems;
        }, err => {
            console.log(err);
            return false;
        });
    }
    toggleElement() {
        if (this.hideElement) {
            this.hideElement = false;
        }
        else {
            this.hideElement = true;
        }
    }
    showList() {
        console.log("called");
    }
    getUser() {
        console.log(this.appService.getUser());
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/app.component.html',
        providers: [app_service_1.AppService]
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map