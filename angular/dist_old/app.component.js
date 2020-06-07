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
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var postfree_1 = require("./postfree");
var user_1 = require("./user");
var signup_1 = require("./signup");
var login_1 = require("./login");
var adduser_1 = require("./adduser");
var app_service_1 = require("./app.service");
var globalval = require("./shared/global");
var ng2_completer_1 = require("ng2-completer");
var AppComponent = /** @class */ (function () {
    function AppComponent(appService, completerService) {
        this.appService = appService;
        this.completerService = completerService;
        this.hideElement = true;
        this.showHome = true;
        this.loginActive = true;
        this.postFreeMsg = false;
        this.postFreeErrorMsg = false;
        this.editUserMsg = false;
        this.signupUserSuccessMsg = false;
        this.signupUserFailureMsg = false;
        this.showForm = true;
        this.postFreeForm = true;
        this.showManageTab = false;
        this.isadmin = false;
        this.isagent = false;
        this.spinner = false;
        this.isAdminAgent = false;
        this.isAgentVendorForm = false;
        this.subcategoryloaded = false;
        this.showUsersList = false;
        this.userInfo = false;
        this.myinfo = false;
        this.loginFailureMsg = false;
        this.showChild = false;
        this.addvendor = false;
        this.packSelected = "1";
        this.login_user = "";
        this.filterargs = "";
        this.statusUser = "all";
        this.typeUser = "all";
        this.userIds = "";
        this.selectedCityId = "";
        this.smsStatus = false;
        this.neft = false;
        this.cheque = false;
        this.paytm = false;
        this.post_free_data = new postfree_1.PostFree();
        this.user_info = new user_1.User();
        this.login = new login_1.Login();
        this.signup = new signup_1.SignUp();
        this.adduser = new adduser_1.AddUser();
        this.options0 = [];
        this.options1 = [];
        this.options2 = [];
        this.options3 = [];
        this.options4 = [];
        this.options5 = [];
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
        this.userSelected = [];
        this.user_ids = {};
        // let numOptions = 100;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        console.log('after view');
    };
    ;
    AppComponent.prototype.loadContents = function (contentList) {
        var _this = this;
        this.contentList = contentList;
        this.filteredContent = contentList;
        this.showHome = false;
        this.contentList.forEach(function (content) {
            if (_this.subCategoryObj.hasOwnProperty(content["sub_category"])) {
                _this.subCategoryObj[content["sub_category"]] = {
                    count: _this.subCategoryObj[content["sub_category"]]["count"] + 1,
                    category: content["category"]
                };
            }
            else {
                _this.subCategoryObj[content["sub_category"]] = {
                    count: 1,
                    category: content["category"]
                };
            }
        });
        this.subCategoryList = Object.keys(this.subCategoryObj);
    };
    AppComponent.prototype.resetFilters = function () {
        this.subCategoryObj = {};
        this.subCategoryFilter = {};
    };
    AppComponent.prototype.searchCategories = function () {
        var _this = this;
        this.resetFilters();
        if (!!this.search.length) {
            this.appService.getSearchResults(this.search).subscribe(function (contentList) {
                _this.loadContents(contentList);
            }, function (err) {
                console.log(err);
                return false;
            });
        }
        else {
            this.goToHome();
        }
    };
    AppComponent.prototype.getSubCategories = function () {
        var subCategories = [];
        this.categoryItems.forEach(function (category) {
            category["sub_categories"].forEach(function (subCategory) {
                if (subCategory.selected === true) {
                    subCategories.push(subCategory.id);
                }
            });
        });
        return subCategories;
    };
    AppComponent.prototype.searchSubCategories = function () {
        var _this = this;
        this.resetFilters();
        var subCategories = this.getSubCategories();
        if (!!subCategories.length) {
            this.appService.getCategoryFilter(subCategories).subscribe(function (contentList) {
                _this.loadContents(contentList);
            }, function (err) {
                console.log(err);
                return false;
            });
        }
        else {
            this.goToHome();
        }
    };
    AppComponent.prototype.filterSubCategory = function (target, key) {
        if (target.checked == true) {
            this.subCategoryFilter[key] = true;
        }
        else {
            delete this.subCategoryFilter[key];
        }
        this.filterResults();
    };
    AppComponent.prototype.filterResults = function () {
        var _this = this;
        if (Object.keys(this.subCategoryFilter).length === 0) {
            this.filteredContent = this.contentList;
        }
        else {
            this.filteredContent = this.contentList.filter(function (content) {
                if (_this.subCategoryFilter.hasOwnProperty(content["sub_category"])) {
                    return content;
                }
            });
        }
    };
    AppComponent.prototype.goToHome = function () {
        this.search = '';
        this.showHome = true;
        this.contentList = [];
        this.categoryItems.forEach(function (category) {
            if (category.hasOwnProperty("selected"))
                delete category["selected"];
            category["sub_categories"].forEach(function (subCategory) {
                if (subCategory.hasOwnProperty("selected"))
                    delete subCategory["selected"];
            });
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({});
        this.form.addControl('username', new forms_1.FormControl());
        this.form.addControl('city_id', new forms_1.FormControl());
        this.form.addControl('email', new forms_1.FormControl());
        this.form.addControl('mobile', new forms_1.FormControl());
        this.form.addControl('phone', new forms_1.FormControl());
        this.form.addControl('address', new forms_1.FormControl());
        this.form.addControl('pack', new forms_1.FormControl());
        this.form.addControl('company', new forms_1.FormControl());
        this.form.addControl('type', new forms_1.FormControl());
        this.form.addControl('category_id', new forms_1.FormControl());
        this.form.addControl('subcategory_id', new forms_1.FormControl());
        this.form.addControl('sms', new forms_1.FormControl());
        this.form.addControl('chequenumber', new forms_1.FormControl());
        this.form.addControl('bankname', new forms_1.FormControl());
        this.form.addControl('bankaddress', new forms_1.FormControl());
        this.form.addControl('transactionnumber', new forms_1.FormControl());
        this.form.addControl('utrnumber', new forms_1.FormControl());
        this.getCategoryItems();
        this.getSuggestionItems();
        this.getCities();
        this.getPack();
    };
    AppComponent.prototype.getSuggestionItems = function () {
        var _this = this;
        this.appService.getSuggestionsList().subscribe(function (response) {
            _this.suggestionsData = response;
            _this.suggestions = _this.completerService.local(_this.suggestionsData, 'keywords', 'title').descriptionField('description');
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.getCities = function () {
        var _this = this;
        var opts = new Array();
        this.appService.getCitiesList().subscribe(function (response) {
            _this.citiesData = response;
            for (var i = 0; i < _this.citiesData.length; i++) {
                opts[i] = {
                    value: _this.citiesData[i]['id'],
                    label: _this.citiesData[i]['name']
                };
            }
            _this.options0 = opts.slice(0);
            _this.options1 = opts.slice(0);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.getPack = function () {
        var _this = this;
        this.appService.getPackList().subscribe(function (response) {
            _this.packData = response;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.getCategoryItems = function () {
        var _this = this;
        var opts = new Array();
        this.appService.getCategory().subscribe(function (categoryItems) {
            _this.categoryItems = categoryItems;
            for (var i = 0; i < _this.categoryItems.length; i++) {
                opts[i] = {
                    value: _this.categoryItems[i]['id'],
                    label: _this.categoryItems[i]['name']
                };
            }
            _this.options2 = opts.slice(0);
            _this.options3 = opts.slice(0);
            //console.log(this.categoryItems);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.loadSubcategory = function (categoryObj) {
        var _this = this;
        var opts = new Array();
        var category_id = categoryObj;
        if (typeof (categoryObj) === "object") {
            category_id = categoryObj.value;
        }
        this.categoryItems.forEach(function (category) {
            var cat = category["id"];
            if (cat == category_id) {
                _this.subCategoryItems = category["sub_categories"];
                for (var i = 0; i < _this.subCategoryItems.length; i++) {
                    opts[i] = {
                        value: _this.subCategoryItems[i]['id'],
                        label: _this.subCategoryItems[i]['name']
                    };
                }
                _this.options4 = opts.slice(0);
                _this.options5 = opts.slice(0);
                _this.subcategoryloaded = true;
            }
        });
    };
    AppComponent.prototype.addPostFree = function () {
        var _this = this;
        if (this.post_free_data.subcategory_id == "undefined") {
            return;
        }
        this.spinner = true;
        this.appService.addPostFreeData(this.post_free_data).subscribe(function (response) {
            _this.ngOnInit();
            if (response.toString() === "msg_5") {
                _this.postFreeErrorMsg = true;
                _this.error_msg = _this.msg_5;
            }
            else {
                _this.postFreeMsg = true;
                _this.postFreeForm = false;
                _this.subcategoryloaded = false;
            }
        }, function (err) {
            _this.postFreeMsg = true;
            console.log(err);
            return false;
        });
        this.spinner = false;
    };
    AppComponent.prototype.addUser = function () {
        var _this = this;
        if (this.adduser.subcategory_id == "undefined") {
            return;
        }
        this.spinner = true;
        this.adduser['admin_id'] = this.admin_id;
        console.log(this.isagent);
        if (this.isagent == true) {
            this.adduser['type'] = "vendor";
        }
        if (this.smsStatus == true) {
            this.adduser['sms'] = "1";
        }
        else {
            this.adduser['sms'] = "0";
        }
        if (this.neft == true) {
            this.adduser['payment_mode'] = "NEFT";
        }
        else if (this.paytm == true) {
            this.adduser['payment_mode'] = "PAYTM";
        }
        else if (this.cheque == true) {
            this.adduser['payment_mode'] = "CHEQUE";
        }
        else {
            this.adduser['payment_mode'] = "FREE";
        }
        console.log(this.adduser);
        this.appService.addUserData(this.adduser).subscribe(function (response) {
            _this.signupUserSuccessMsg = true;
            _this.ngOnInit();
            if (response.toString() === "msg_6") {
                _this.success_msg = _this.msg_6;
                _this.smsStatus = false;
                _this.showForm = false;
            }
            else if (response.toString() === "msg_5") {
                _this.success_msg = _this.msg_5;
            }
            else {
            }
            _this.spinner = false;
            console.log(response);
        }, function (err) {
            console.log(err);
            _this.error_msg = _this.msg_4;
            return false;
        });
        this.spinner = false;
    };
    AppComponent.prototype.signUpUser = function () {
        var _this = this;
        this.spinner = true;
        this.signup['admin_id'] = this.admin_id;
        this.appService.signUpUser(this.signup).subscribe(function (response) {
            _this.signupUserSuccessMsg = true;
            if (response.toString() === "msg_1") {
                _this.success_msg = _this.msg_1;
                _this.showForm = false;
            }
            else if (response.toString() === "msg_2") {
                _this.success_msg = _this.msg_2;
            }
            else if (response.toString() === "msg_3") {
                _this.success_msg = _this.msg_3;
            }
            else {
            }
            _this.spinner = false;
            console.log(response);
        }, function (err) {
            _this.signupUserFailureMsg = true;
            _this.error_msg = _this.msg_4;
            return false;
        });
    };
    AppComponent.prototype.loginUser = function () {
        var _this = this;
        this.spinner = true;
        this.loginFailureMsg = false;
        this.appService.loginUser(this.login).subscribe(function (response) {
            console.log(response);
            _this.login_user = response[0];
            _this.user_id = response[4];
            _this.admin_id = response[4];
            _this.type = response[3].toString();
            _this.showManageTab = true;
            _this.isAgentVendorForm = true;
            if (response[3].toString() == "agent") {
                _this.isadmin = false;
                _this.isagent = true;
            }
            else if (response[3].toString() == "admin") {
                _this.isagent = false;
                _this.isadmin = true;
            }
            else if (response[3].toString() == "vendor") {
                _this.isagent = false;
                _this.isadmin = false;
            }
            else {
                _this.loginFailureMsg = true;
                _this.showManageTab = false;
                _this.error_msg = _this.msg_7;
            }
            _this.spinner = false;
        }, function (err) {
            _this.spinner = false;
            _this.isAgentVendorForm = true;
            _this.loginFailureMsg = true;
            _this.showManageTab = false;
            _this.error_msg = _this.msg_4;
            return false;
        });
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
    AppComponent.prototype.allUsers = function () {
        var _this = this;
        this.spinner = true;
        this.myinfo = false;
        this.appService.getUser().subscribe(function (usersList) {
            _this.usersList = usersList;
            _this.allUsersList = _this.usersList;
            _this.spinner = false;
            _this.showUsersList = true;
            console.log(_this.usersList);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.allVendors = function () {
        var _this = this;
        this.spinner = true;
        this.myinfo = false;
        this.vendorAdmin['admin_id'] = this.admin_id;
        this.appService.getVendor(this.vendorAdmin).subscribe(function (response) {
            //console.log(vendorsList);
            _this.vendorsList = response;
            _this.usersList = _this.vendorsList;
            _this.spinner = false;
            _this.showUsersList = true;
            // console.log(this.vendorsList);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.subCategoryClicked = function (sub_category) {
        sub_category.selected = !sub_category.selected;
    };
    AppComponent.prototype.logoutUser = function () {
        this.appService.logout().subscribe(function (response) {
        }, function (err) {
            return false;
        });
        this.showManageTab = false;
    };
    AppComponent.prototype.addVendor = function (mode) {
        if (mode == 1) {
            this.addvendor = true;
        }
        else {
            this.addvendor = false;
        }
    };
    AppComponent.prototype.editUser = function (uid, type, mode) {
        var _this = this;
        //this.ngOnInit();
        this.spinner = true;
        console.log(uid, type);
        this.userData['user_id'] = uid;
        this.userData['type'] = type;
        this.userData['mode'] = mode;
        this.appService.getUserDetails(this.userData).subscribe(function (userDetails) {
            _this.userDetails = userDetails;
            if (_this.userDetails['sms'] == 0) {
                _this.smsStatus = false;
            }
            else {
                _this.smsStatus = true;
            }
            _this.spinner = false;
            _this.userInfo = false;
            if (mode !== "active") {
                _this.userInfo = true;
            }
            _this.showUsersList = false;
            _this.editUserMsg = false;
            //this.selectedCityId = [this.userDetails['city_id']];                          
            console.log(_this.userDetails);
            _this.loadSubcategory(_this.userDetails['category_id']);
            console.log(_this.userDetails);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.logRadio = function (element) {
        this.packSelected = element.value;
    };
    AppComponent.prototype.editUserDetails = function () {
        var _this = this;
        this.spinner = true;
        this.userDetails['pack'] = this.packSelected;
        console.log(this.userDetails);
        if (this.smsStatus == true) {
            this.userDetails['sms'] = "1";
        }
        else {
            this.userDetails['sms'] = "0";
        }
        this.appService.updateUserDetails(this.userDetails).subscribe(function (user_data) {
            _this.spinner = false;
            _this.editUserMsg = true;
            _this.userInfo = false;
            _this.smsStatus = false;
            console.log(user_data);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    AppComponent.prototype.changeState = function (user_id, status, type, mobile, usr) {
        var _this = this;
        this.spinner = true;
        this.userStatus['user_id'] = user_id;
        this.userStatus['status'] = status;
        this.userStatus['type'] = type;
        this.userStatus['mobile'] = mobile;
        this.appService.changeUserState(this.userStatus).subscribe(function (response) {
            if (usr == "all") {
                _this.allUsers();
            }
            else {
                _this.allVendors();
            }
            _this.spinner = false;
        }, function (err) {
            return false;
        });
    };
    AppComponent.prototype.deleteUser = function (user_id, type) {
        var _this = this;
        if (!confirm("Are you sure to delete ")) {
            return;
        }
        this.spinner = true;
        this.deleteStatus['user_id'] = user_id;
        this.appService.deleteSelectedUser(this.deleteStatus).subscribe(function (response) {
            if (type == "admin") {
                _this.allUsers();
            }
            else {
                _this.allVendors();
            }
            _this.spinner = false;
        }, function (err) {
            return false;
        });
    };
    AppComponent.prototype.deleteMultipleUser = function (type) {
        var _this = this;
        if (this.userSelected.length == 0) {
            alert("Please select the checkbox to delete multiple users");
            return;
        }
        else {
            this.spinner = true;
            this.user_ids['user_ids'] = this.userSelected.join(",");
            this.appService.deleteMultiUser(this.user_ids).subscribe(function (response) {
                if (type == "admin") {
                    _this.allUsers();
                }
                else {
                    _this.allVendors();
                }
                _this.spinner = false;
                _this.userSelected = [];
            }, function (err) {
                return false;
            });
        }
    };
    AppComponent.prototype.changeUsersStatus = function (status) {
        if (this.userSelected.length == 0) {
            alert("Please select the checkbox to " + status + " multiple users");
            return;
        }
    };
    AppComponent.prototype.selectDeselectUser = function (user_id) {
        if (this.userSelected.length == 0) {
            this.userSelected.push(user_id);
        }
        else if (this.userSelected.length > 0) {
            if (this.userSelected.find(function (x) { return x === user_id; })) {
                var indexUserId = this.userSelected.indexOf(user_id);
                this.userSelected.splice(indexUserId, 1);
            }
            else {
                this.userSelected.push(user_id);
            }
        }
    };
    AppComponent.prototype.filterByStatus = function (userStatus) {
        var _this = this;
        if (userStatus == "activated") {
            this.usersFilteredList = this.allUsersList.filter(function (user) { return user.active === 1; });
            this.usersList = this.usersFilteredList;
            this.statusUser = "activated";
        }
        else if (userStatus == "deactivated") {
            this.usersFilteredList = this.allUsersList.filter(function (user) { return user.active === 0; });
            this.usersList = this.usersFilteredList;
            this.statusUser = "deactivated";
        }
        else {
            this.statusUser = "all";
            this.usersList = this.allUsersList;
        }
        if (this.typeUser == "agent" || this.typeUser == "vendor") {
            this.usersList = this.usersList.filter(function (user) { return user.type === _this.typeUser; });
        }
    };
    AppComponent.prototype.filterByUser = function (userType) {
        if (userType == "all") {
            this.usersList = this.allUsersList;
        }
        else {
            this.usersFilteredList = this.allUsersList.filter(function (user) { return user.type === userType; });
            this.usersList = this.usersFilteredList;
            this.typeUser = userType;
        }
        if (this.statusUser == "activated") {
            this.usersList = this.usersList.filter(function (user) { return user.active === 1; });
        }
        else if (this.statusUser == "deactivated") {
            this.usersList = this.usersList.filter(function (user) { return user.active === 0; });
        }
    };
    __decorate([
        core_1.ViewChild('myId'),
        __metadata("design:type", core_1.ElementRef)
    ], AppComponent.prototype, "myId");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app/app.component.html',
            providers: [app_service_1.AppService, common_1.NgClass]
        }),
        __metadata("design:paramtypes", [app_service_1.AppService, typeof (_a = typeof ng2_completer_1.CompleterService !== "undefined" && ng2_completer_1.CompleterService) === "function" && _a || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
