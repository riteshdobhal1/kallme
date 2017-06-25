import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { AppService } from './app.service';

import * as global from './shared/global';

declare var $:any;

@Component({
  selector: 'my-app',
  templateUrl:'./app/app.component.html'
  })
export class AppComponent implements OnInit {
	 private hideElement: boolean = true;
	 categoryItems:Category[] = [];
	 home : string;
	 contact : string;
	 about : string;
     services: string;
	 login_signup: string;
	 search: string;
	 home_img_title1 : string;
	 home_img_title2 : string;
	 services_header : string;
   	 aboutus_header : string;
	 aboutus_title: string;
	 address_header : string;
	 phone : string;
	 email : string;
	 copyright: string;
	 address_description;
	 
     constructor(private appService:AppService){
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
	};
	
	ngOnInit(): void {
        this.getCategoryItems();
        
   }
	getCategoryItems():void{
		
		this.categoryItems = this.appService.getCategory();
		console.log(this.categoryItems);
	}
	
   
   toggleElement(){
   	
        if(this.hideElement){
            this.hideElement = false;
        }else{
            this.hideElement = true;
        }     
    }
	showList(){
		console.log("called");
	}
	getUser(){
			
		console.log(this.appService.getUser());
	}
	
	
}
