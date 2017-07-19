import {Component, OnInit} from '@angular/core';
import {Category} from './category';
import {AppService} from './app.service';
import * as globalval from './shared/global';

declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [AppService]
})
export class AppComponent implements OnInit {
    private hideElement: boolean = true;
    private showHome: boolean = true;
    categoryItems: Array<Object>;
    contentList: Array<Object>;
    filteredContent: Array<Object>;
    categoryObj: Object;
    subCategoryObj: Object;
    categoryFilter: Object;
    subCategoryFilter: Object;
    categoryList: Array<string>;
    subCategoryList: Array<string>;
    home: string;
    contact: string;
    about: string;
    services: string;
    login_signup: string;
    search: string;
    home_img_title1: string;
    home_img_title2: string;
    services_header: string;
    aboutus_header: string;
    aboutus_title: string;
    address_header: string;
    phone: string;
    email: string;
    copyright: string;
    address_description;

    constructor(private appService: AppService) {
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
    };

    searchCategories(): void {
        this.categoryObj = {};
        this.subCategoryObj = {};
        this.categoryFilter = {};
        this.subCategoryFilter = {};
        if(!!this.search.length) {
            this.appService.getSearchResults(this.search).subscribe(contentList => {
                    this.contentList = contentList;
                    this.filteredContent = contentList;
                    this.showHome = false;
                    this.contentList.forEach(content => {
                        if(this.categoryObj.hasOwnProperty(content["category"])) {
                            this.categoryObj[content["category"]] = this.categoryObj[content["category"]] + 1;
                        } else {
                            this.categoryObj[content["category"]] = 1;
                        }

                        if(this.subCategoryObj.hasOwnProperty(content["sub_category"])) {
                            this.subCategoryObj[content["sub_category"]] = this.subCategoryObj[content["sub_category"]] + 1;
                        } else {
                            this.subCategoryObj[content["sub_category"]] = 1;
                        }
                    });
                    this.categoryList = Object.keys(this.categoryObj);
                    this.subCategoryList = Object.keys(this.subCategoryObj);
                },
                err => {
                    console.log(err);
                    return false;
                });
        } else {
            this.showHome = true;
            this.contentList = [];
        }
    }

    filterCategory(target, key): void {
        if(target.checked == true) {
            this.categoryFilter[key] = true;
        } else {
            delete this.categoryFilter[key];
        }
        this.filterResults();
    }

    filterSubCategory(target, key): void {
        if(target.checked == true) {
            this.subCategoryFilter[key] = true;
        } else {
            delete this.subCategoryFilter[key];
        }
        this.filterResults();
    }

    filterResults(): void {
        if(Object.keys(this.categoryFilter).length === 0 && Object.keys(this.subCategoryFilter).length === 0) {
            this.filteredContent = this.contentList;
        } else {
            this.filteredContent = this.contentList.filter(content => {
                if(this.categoryFilter.hasOwnProperty(content["category"]) || this.subCategoryFilter.hasOwnProperty(content["sub_category"])) {
                    return content;
                }
            });
        }
    }

    goToHome(): void {
        this.search = '';
        this.showHome = true;
    }

    ngOnInit(): void {
        this.getCategoryItems();

    }

    getCategoryItems() {
        this.appService.getCategory().subscribe(categoryItems => {
                this.categoryItems = categoryItems;
            },
            err => {
                console.log(err);
                return false;
            });
    }


    toggleElement() {
        if (this.hideElement) {
            this.hideElement = false;
        } else {
            this.hideElement = true;
        }
    }

    showList() {
        console.log("called");
    }

    getUser() {
        console.log(this.appService.getUser());
    }


}
