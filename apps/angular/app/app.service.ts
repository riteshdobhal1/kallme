import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Category} from './category';
import {CATEGORYDATA} from './mock-category';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as globalval from './shared/global';

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

    getSearchResults(searchString) {
        return this.http.get(`${globalval.rest_api_domain}/category/search`, {
            search: {
                search: searchString
            }
        })
            .map((res: Response) => res.json());
    }

    getSuggestionsList() {
        return this.http.get(`${globalval.rest_api_domain}/suggestions/list`)
            .map((res: Response) => res.json());
    }

    getCategoryList() {

    }

}
