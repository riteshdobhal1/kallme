import {Component, OnInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Category} from './category';
import {AppService} from './app.service';
import * as globalval from './shared/global';
import {CompleterService, CompleterData} from 'ng2-completer';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [AppService, NgClass]
})
export class AppComponent implements OnInit {
    private hideElement: boolean = true;
    private showHome: boolean = true;
    private loginActive: boolean = true;
    categoryItems: Array<Object>;
    contentList: Array<Object>;
    filteredContent: Array<Object>;
    subCategoryObj: Object;
    subCategoryFilter: Object;
    subCategoryList: Array<Object>;
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
    suggestionsData: Array<Object>;
    suggestions: CompleterData;

    constructor(private appService: AppService, private completerService: CompleterService) {
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
        this.subCategoryObj = {};
        this.subCategoryFilter = {};
        this.appService.getUser().subscribe(user => {
            console.log(user);
        });
    };

    searchCategories(): void {
        this.subCategoryObj = {};
        this.subCategoryFilter = {};
        if (!!this.search.length) {
            this.appService.getSearchResults(this.search).subscribe(contentList => {
                    this.contentList = contentList;
                    this.filteredContent = contentList;
                    this.showHome = false;
                    this.contentList.forEach(content => {
                        if (this.subCategoryObj.hasOwnProperty(content["sub_category"])) {
                            this.subCategoryObj[content["sub_category"]] = {
                                count: this.subCategoryObj[content["sub_category"]]["count"] + 1,
                                category: content["category"]
                            };
                        } else {
                            this.subCategoryObj[content["sub_category"]] = {
                                count: 1,
                                category: content["category"]
                            };
                        }
                    });
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

    filterSubCategory(target, key): void {
        if (target.checked == true) {
            this.subCategoryFilter[key] = true;
        } else {
            delete this.subCategoryFilter[key];
        }
        this.filterResults();
    }

    filterResults(): void {
        if (Object.keys(this.subCategoryFilter).length === 0) {
            this.filteredContent = this.contentList;
        } else {
            this.filteredContent = this.contentList.filter(content => {
                if (this.subCategoryFilter.hasOwnProperty(content["sub_category"])) {
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
        this.getSuggestionItems();
    }

    getSuggestionItems(): void {
        this.appService.getSuggestionsList().subscribe(response => {
                this.suggestionsData = response;
                this.suggestions = this.completerService.local(this.suggestionsData, 'keywords', 'title').descriptionField('description');

            },
            err => {
                console.log(err);
                return false;
            });
    }

    getCategoryItems(): void {
        this.appService.getCategory().subscribe(categoryItems => {
                this.categoryItems = categoryItems;
            },
            err => {
                console.log(err);
                return false;
            });
    }


    toggleElement(): void {
        if (this.hideElement) {
            this.hideElement = false;
        } else {
            this.hideElement = true;
        }
    }

    showList(): void {
        console.log("called");
    }

    getUser(): void {
        console.log(this.appService.getUser());
    }


}
