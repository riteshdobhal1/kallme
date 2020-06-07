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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var globalval = require("./shared/global");
var AppService = /** @class */ (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService.prototype.getUser = function () {
        var headers = new http_2.Headers({ 'Content-Type': undefined });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.get(globalval.rest_api_domain + "/user/list", options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.logout = function () {
        var headers = new http_2.Headers({ 'Content-Type': undefined });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.get(globalval.rest_api_domain + "/user/logout", options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getVendor = function (vendorAdmin) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/listvendor", vendorAdmin, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getCategory = function () {
        return this.http.get(globalval.rest_api_domain + "/category/list")
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getSearchResults = function (searchString) {
        return this.http.get(globalval.rest_api_domain + "/category/search", {
            search: {
                search: searchString
            }
        })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getCategoryFilter = function (subCategories) {
        return this.http.post(globalval.rest_api_domain + "/category/filter", {
            category_id: [],
            subcategory_id: subCategories
        })
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getSuggestionsList = function () {
        return this.http.get(globalval.rest_api_domain + "/suggestions/list")
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getCitiesList = function () {
        return this.http.get(globalval.rest_api_domain + "/user/getcitylist")
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getPackList = function () {
        return this.http.get(globalval.rest_api_domain + "/user/getpacklist")
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.addPostFreeData = function (postFree) {
        var headers = new http_2.Headers({ 'Content-Type': undefined });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(globalval.rest_api_domain + "/user/postfree", postFree, headers)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.signUpUser = function (signUp) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/signup", signUp, options)
            .map(function (res) { return res.json(); })["catch"](function (error) { return Observable_1.Observable["throw"](error.json().error || 'Server error'); }); //...errors if any
    };
    AppService.prototype.addUserData = function (addUser) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/adduser", addUser, options)
            .map(function (res) { return res.json(); })["catch"](function (error) { return Observable_1.Observable["throw"](error.json().error || 'Server error'); }); //...errors if any
    };
    AppService.prototype.loginUser = function (login) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/login", login, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.changeUserState = function (userStatus) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/changeuserstate", userStatus, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.deleteSelectedUser = function (deleteStatus) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/deleteuser", deleteStatus, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.deleteMultiUser = function (userIds) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/deletemultiuser", userIds, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getUserDetails = function (userinfo) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/getuserdetails", userinfo, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.updateUserDetails = function (user_info) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(globalval.rest_api_domain + "/user/updateuserdetails", user_info, options)
            .map(function (res) { return res.json(); });
    };
    AppService.prototype.getCategoryList = function () {
    };
    AppService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
    ], AppService);
    return AppService;
    var _a;
}());
exports.AppService = AppService;
