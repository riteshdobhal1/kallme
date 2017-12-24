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
        return this.http.get(`${globalval.rest_api_domain}/user/list`)
            .map((res: Response) => res.json());

    }

    getCategory() {
        return this.http.get(`${globalval.rest_api_domain}/category/list`)
            .map((res: Response) => res.json());
    }

    getSearchResults(searchString, latitude, longitude) {
        return this.http.get(`${globalval.rest_api_domain}/category/search`, {
            search: {
                search: searchString,
                latitude: latitude,
                longitude: longitude
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
    
    addPostFreeData(postFree):Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(`${globalval.rest_api_domain}/user/postfree`, postFree,headers)
                .map((res: Response) => res.json());
            
    }
    
    signUpUser(signUp):Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(`${globalval.rest_api_domain}/user/signup`, signUp,headers)
                .map((res: Response) => res.json());
                   
    }
      

    loginUser(login):Observable<Response> {
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(`${globalval.rest_api_domain}/user/login`, login,headers)
                .map((res: Response) => res.json());
                   
    }

    // getDistance(source: Object, dest: Object) {
    //     return this.http.get(`http://maps.googleapis.com/maps/api/distancematrix/json?origins=${source.latitude},${source.longitude}&destinations=${dest.latitude},${dest.longitude}`)
    //         .map((res: Response) => res.json());
    // }
    
    getCategoryList() {

    }

}
