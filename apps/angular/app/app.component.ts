import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { AppService } from './app.service';
import * as globalval from './shared/global';

declare var $:any;

@Component({
  selector: 'my-app',
  templateUrl:'./app/app.component.html',
  providers:[AppService]
  })
export class AppComponent implements OnInit {
	 private hideElement: boolean = true;
	 categoryItems:Array<Object> ; 
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
	this.appService.getUser().subscribe(user=>{
		console.log(user);
	});
	};

	searchCategories(): void {
		debugger;
	}
	
	ngOnInit(): void {
        this.getCategoryItems();
            
   }
	getCategoryItems(){
		
		this.appService.getCategory().subscribe(categoryItems => {
			this.categoryItems = categoryItems;
		},
		err => {
      			console.log(err);
      			return false;
    		});
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
