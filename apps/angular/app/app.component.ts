import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {NgClass} from '@angular/common';
import {Category} from './category';
import {PostFree} from './postfree';
import {User} from './user';
import {SignUp} from './signup';
import {Login} from './login';
import {AddUser} from './adduser';
import {AppService} from './app.service';
import * as globalval from './shared/global';
import {CompleterService, CompleterData} from 'ng2-completer';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [AppService, NgClass]
})
export class AppComponent implements OnInit,AfterViewInit {
    @ViewChild('myId') myId: ElementRef;
    ngAfterViewInit(){
        console.log('after view');
    }
    private hideElement: boolean = true;
    private showHome: boolean = true;
    private loginActive: boolean = true;
    private postFreeMsg: boolean = false;
    private postFreeErrorMsg: boolean = false;
    private editUserMsg: boolean = false;
    private signupUserSuccessMsg: boolean = false;
    private signupUserFailureMsg: boolean = false;
    private showForm: boolean = true;
    private postFreeForm: boolean = true;
    private showManageTab: boolean = false;
    private isadmin: boolean = false;
    private isagent: boolean = false;
    private spinner: boolean = false;
    private isAdminAgent: boolean = false;
    private isAgentVendorForm: boolean = false;
    private subcategoryloaded: boolean = false;
    private showUsersList: boolean = false;
    private userInfo: boolean = false;
    private myinfo: boolean = false;
    private loginFailureMsg: boolean = false;
    private showChild: boolean = false;
    private addvendor: boolean = false;
    
    categoryItems: Array<Object>;
    subCategoryItems: Array<Object>;
    usersList: Array<Object>;
    vendorsList: Array<Object>;
    contentList: Array<Object>;
    userDetails: Array<Object>;
    filteredContent: Array<Object>;
    subCategoryObj: Object;
    subCategoryFilter: Object;
    subCategoryList: Array<Object>;
    home: string;
    contact: string;
    about: string;
    services: string;
    login_signup: string;
    manage_users:string;
    manage_vendors:string;
    myprofile:string;
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
    post_free_add: string;
    usertype : string;
    suggestionsData: Array<Object>;
    suggestions: CompleterData;
    citiesData:Array<Object>;
    packData:Array<Object>;
    user_id: number;
    msg_1: string;
    msg_2: string;    
    msg_3: string;
    msg_4: string;
    msg_5: string;
    msg_6: string;
    msg_7: string;
    post_free_data = new PostFree();
    user_info = new User();
    login = new Login();
    signup = new SignUp();
    adduser = new AddUser();
    success_msg : string;  
    error_msg : string;
    manage_label : string;
    userStatus: Object;
    deleteStatus: Object;
    vendorAdmin: Object; 
    userData:Object;
    uid: number;
    type: string;
    admin_id:number;
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
        this.post_free_add = globalval.post_free_add;
        this.subCategoryObj = {};
        this.subCategoryFilter = {};
        this.msg_1 = globalval.msg_1;
        this.msg_2 = globalval.msg_2;
        this.msg_3 = globalval.msg_3;
        this.msg_4 = globalval.msg_4;
        this.msg_5 = globalval.msg_5;
        this.msg_6 = globalval.msg_6;
        this.msg_7 = globalval.msg_7;
        this.manage_users = globalval.manage_users;
        this.manage_vendors = globalval.manage_vendors;
        this.myprofile = globalval.myprofile;
        this.userStatus = {};
        this.deleteStatus = {};
        this.vendorAdmin = {};
        this.userData = {};
        
    };

    loadContents(contentList): void {
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
    }

    resetFilters(): void {
        this.subCategoryObj = {};
        this.subCategoryFilter = {};
    }

    searchCategories(): void {
        this.resetFilters();
        if (!!this.search.length) {
            this.appService.getSearchResults(this.search).subscribe(contentList => {
                    this.loadContents(contentList);
                },
                err => {
                    console.log(err);
                    return false;
                });
        } else {
            this.goToHome();
        }
    }

    getSubCategories(): Array<number> {
        var subCategories = [];
        this.categoryItems.forEach(category => {
            category["sub_categories"].forEach(subCategory => {
                if(subCategory.selected === true) {
                    subCategories.push(subCategory.id);
                }
            });
        });
        return subCategories;
    }

    searchSubCategories(): void {
        this.resetFilters();
        var subCategories = this.getSubCategories();
        if (!!subCategories.length) {
            this.appService.getCategoryFilter(subCategories).subscribe(contentList => {
                    this.loadContents(contentList);
                },
                err => {
                    console.log(err);
                    return false;
                });
        } else {
            this.goToHome();
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
        this.contentList = [];
        this.categoryItems.forEach(category => {
            if(category.hasOwnProperty("selected"))
                delete category["selected"];
            category["sub_categories"].forEach(subCategory => {
                if(subCategory.hasOwnProperty("selected"))
                    delete subCategory["selected"];
            });
        });
    }

    ngOnInit(): void {
        this.getCategoryItems();
        this.getSuggestionItems();
        this.getCities();
        this.getPack();
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
    
    getCities():void {
        
        this.appService.getCitiesList().subscribe(response => {
                this.citiesData = response;
          },
            err => {
                console.log(err);
                return false;
            });
        
        
    }
    getPack():void {
        
        this.appService.getPackList().subscribe(response => {
                this.packData = response;
          },
            err => {
                console.log(err);
                return false;
            });
        
        
    }    
        
    getCategoryItems(): void {
        this.appService.getCategory().subscribe(categoryItems => {
                this.categoryItems = categoryItems;
                console.log(this.categoryItems);
            },
            err => {
                console.log(err);
                return false;
            });
    }
    loadSubcategory(category_id):void {
         this.post_free_data.subcategory_id = "undefined";
         
         this.categoryItems.forEach(category => {
             var cat = category["id"];
             if(cat == category_id){
                this.subCategoryItems = category["sub_categories"];
                this.subcategoryloaded=true;
            }
        });
        
         
        
        
    }
    
    addPostFree(): void {
        if(this.post_free_data.subcategory_id == "undefined"){
            return;
        }
        this.spinner = true;
        this.appService.addPostFreeData(this.post_free_data).subscribe(response => {
                            
                            if(response.toString() === "msg_5"){
                                this.postFreeErrorMsg = true;
                                this.error_msg = this.msg_5;
                            }else{
                            
                            this.postFreeMsg = true;
                            this.postFreeForm = false;
                            this.subcategoryloaded = false;
                            }
                            },
                err => {
                    this.postFreeMsg = true;
                    
        	        console.log(err);            
                    return false;
                });
                this.spinner = false;
     }
     addUser(): void {
        if(this.adduser.subcategory_id == "undefined"){
            return;
        }
        this.spinner = true;
        this.adduser['admin_id'] = this.admin_id;
        console.log(this.isagent);
        
        if(this.isagent == true){
            this.adduser['type'] = "vendor";
            
        }
        console.log(this.adduser);
        this.appService.addUserData(this.adduser).subscribe(response => {
                            this.signupUserSuccessMsg = true;
                            if(response.toString() === "msg_6"){
                                
                                this.success_msg = this.msg_6;
                                                               
                                this.showForm = false; 
                                
                            }else if(response.toString() === "msg_5"){
                                this.success_msg = this.msg_5;
                                
                            }else{
                                
                                
                            }
                            this.spinner = false;                                                                          
                            console.log(response);            
                            },
                err => {
                                  
                    console.log(err);
                    this.error_msg = this.msg_4;            
                    return false;
                });
                this.spinner = false;
     }
   signUpUser(): void {
        this.spinner = true;
        this.signup['admin_id'] = this.admin_id;
        this.appService.signUpUser(this.signup).subscribe(response => {
                            this.signupUserSuccessMsg = true;
                            if(response.toString() === "msg_1"){
                                
                                this.success_msg = this.msg_1;
                                this.showForm = false; 
                                
                            }else if(response.toString() === "msg_2"){
                                this.success_msg = this.msg_2;
                                
                            }else if(response.toString() === "msg_3"){
                                this.success_msg = this.msg_3;
                            }else{
                                
                                
                            }
                            this.spinner = false;                                                                          
                            console.log(response);            
                            },
                err => {
                    
                    this.signupUserFailureMsg = true;
                    this.error_msg = this.msg_4;                    
                    return false;
                }); 
     }  
   loginUser(): void {
        this.spinner = true;
        this.loginFailureMsg = false;
        this.appService.loginUser(this.login).subscribe(response => {
                            console.log(response);
                            this.user_id = response[4];
                            this.admin_id = response[4];
                            this.type = response[3].toString();
                            this.showManageTab = true;
                            this.isAgentVendorForm = true;                    
                            if(response[3].toString() == "agent"){
                                                                
                                this.isadmin = false;
                                this.isagent = true;
                                
                            }else if(response[3].toString() == "admin"){
                                
                                this.isagent = false;
                                this.isadmin = true;
                            }else if(response[3].toString() == "vendor"){
                                                                
                                this.isagent = false;
                                this.isadmin = false;
                                                                                               
                            }else{
                                this.loginFailureMsg = true;
                                this.showManageTab = false;
                                this.error_msg = this.msg_7;
                            } 
                            
                            this.spinner = false;               
                            },
                err => {
                    this.spinner = false;
                    this.isAgentVendorForm = true;
                    this.loginFailureMsg = true;
                    this.showManageTab = false;
                    this.error_msg = this.msg_4;
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

    
    allUsers(): void {
        this.spinner = true;
        this.myinfo = false;
        this.appService.getUser().subscribe(usersList => {
            
                this.usersList = usersList;
                this.spinner = false;
                this.showUsersList = true;
                console.log(this.usersList);
            },
            err => {
                console.log(err);
                return false;
            });
        
    }
    allVendors(): void {
        this.spinner = true;
        this.myinfo = false;
        this.vendorAdmin['admin_id'] = this.admin_id; 
        this.appService.getVendor(this.vendorAdmin).subscribe(response => {
                
                //console.log(vendorsList);
                this.vendorsList = response;
                this.spinner = false;
                this.showUsersList = true;
                // console.log(this.vendorsList);
            },
            err => {
                console.log(err);
                return false;
            });
        
    }
    subCategoryClicked(sub_category): void {
        sub_category.selected = !sub_category.selected;
    }
    logoutUser(){
        this.appService.logout().subscribe(response => {
                                     },
                err => {
                    
                    return false;
                });

        this.showManageTab = false;
        
    }
    addVendor(mode){
        if(mode == 1){
            this.addvendor = true;
        }else{
            this.addvendor = false;
        }
       
        
    }
    editUser(uid,type,mode): void{
        this.spinner = true;
        console.log(uid,type);
        this.userData['user_id'] = uid;
        this.userData['type'] = type;
        this.userData['mode'] = mode; 
        
        this.appService.getUserDetails(this.userData).subscribe(userDetails => {
            
                this.userDetails = userDetails;
                this.spinner = false;
                this.userInfo = false;
                if(mode !== "active"){
                    this.userInfo = true;                    
                }
                
                
                this.showUsersList = false;
                this.editUserMsg = false;
                console.log(this.userDetails)
                
                this.loadSubcategory(this.userDetails['category_id']);
                
                console.log(this.userDetails);
            },
            err => {
                console.log(err);
                return false;
            });       
        
    }
    editUserDetails(): void{
        this.spinner = true;
        
        this.appService.updateUserDetails(this.userDetails).subscribe(user_data => {
            
                
                this.spinner = false;
                this.editUserMsg = true;
                this.userInfo = false;
                
                console.log(user_data);
            },
            err => {
                console.log(err);
                return false;
            });       
        
    }
    changeState(user_id,status,type,mobile,usr): void{
        
        this.spinner = true;
        this.userStatus['user_id'] = user_id;
        this.userStatus['status'] = status;
        this.userStatus['type'] = type;
        this.userStatus['mobile'] = mobile;
        this.appService.changeUserState(this.userStatus).subscribe(response => {
                            if(usr == "all"){
                                
                                this.allUsers();
                                
                            }else{
                                
                                this.allVendors();
                                                                
                            }
                            this.spinner = false;            
                            },
                err => {
                    
                    return false;
                });
        
    }
    deleteUser(user_id,type): void{
        
        this.spinner = true;
        this.deleteStatus['user_id'] = user_id;
        this.appService.deleteSelectedUser(this.deleteStatus).subscribe(response => {
                            if(type == "admin"){
                                
                                this.allUsers();
                                
                            }else{
                                
                                this.allVendors();
                                                                
                            }
                            this.spinner = false;            
                            },
                err => {
                    
                    return false;
                });
        
    }
}
