import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions } from '@angular/http';
import {Category} from './category';
import {CATEGORYDATA} from './mock-category';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as globalval from './shared/global';
import {PostFree} from './postfree';
import {SignUp} from './signup';
import {Login} from './login';


@Injectable()

export class AppService {
    constructor(private http: Http) {
    }

    getUser() {
        let headers = new Headers({ 'Content-Type': undefined });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        
        return this.http.get(`${globalval.rest_api_domain}/user/list`,options)
            .map((res: Response) => res.json());

    }
    
    logout() {
        let headers = new Headers({ 'Content-Type': undefined });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.get(`${globalval.rest_api_domain}/user/logout`,options)
            .map((res: Response) => res.json());

    }


    getVendor(vendorAdmin):Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        
        return this.http.post(`${globalval.rest_api_domain}/user/listvendor`,vendorAdmin,options)
            .map((res: Response) => res.json());

    }

    

    getCategory() {
        return this.http.get(`${globalval.rest_api_domain}/category/list`)
            .map((res: Response) => res.json());
    }

    getSearchResults(searchString) {
        return this.http.get(`${globalval.rest_api_domain}/category/search`, {
            search: {
                search: searchString
            }
        })
            .map((res: Response) => res.json());
    }

    getCategoryFilter(subCategories) {
        return this.http.post(`${globalval.rest_api_domain}/category/filter`, {
            category_id: [],
            subcategory_id: subCategories
        })
            .map((res: Response) => res.json());
    }

    getSuggestionsList() {
        return this.http.get(`${globalval.rest_api_domain}/suggestions/list`)
            .map((res: Response) => res.json());
    }
    getCitiesList() {
        return this.http.get(`${globalval.rest_api_domain}/user/getcitylist`)
            .map((res: Response) => res.json());
    }
    getPackList() {
        return this.http.get(`${globalval.rest_api_domain}/user/getpacklist`)
            .map((res: Response) => res.json());
    }
    addPostFreeData(postFree):Observable<Response> {
        let headers = new Headers({ 'Content-Type': undefined });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(`${globalval.rest_api_domain}/user/postfree`, postFree,headers)
                .map((res: Response) => res.json());
            
    }
    
    signUpUser(signUp):Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/signup`, signUp,options)
                .map((res: Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
                   
    }
    addUserData(addUser):Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/adduser`, addUser,options)
                .map((res: Response) => res.json())
                .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
                   
    }
      

    loginUser(login):Observable<Response> {
        
        let headers = new Headers({ 'Content-Type': 'application/json'});
        
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/login`, login,options)
                .map((res: Response) => res.json());
                   
    }
    changeUserState(userStatus):Observable<Response> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/changeuserstate`, userStatus,options)
                .map((res: Response) => res.json());
                   
    }
    deleteSelectedUser(deleteStatus):Observable<Response> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/deleteuser`, deleteStatus,options)
                .map((res: Response) => res.json());
                  
    }
    deleteMultiUser(userIds):Observable<Response> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/deletemultiuser`, userIds,options)
                .map((res: Response) => res.json());
                  
    }
    getUserDetails(userinfo){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/getuserdetails`, userinfo,options)
           .map((res: Response) => res.json());
                   
    }
    updateUserDetails(user_info){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        options.withCredentials = true;
        return this.http.post(`${globalval.rest_api_domain}/user/updateuserdetails`, user_info,options)
           .map((res: Response) => res.json());
                   
    }
    getCategoryList() {

    } 

}
