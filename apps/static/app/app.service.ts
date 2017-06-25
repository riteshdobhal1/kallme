import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import { Category } from './category';
import { CATEGORYDATA } from './mock-category';

import 'rxjs/add/operator/map';

@Injectable()

export class AppService {
     constructor (
    	private http: Http
  	) {} 
  	
  	getUser() {
    	return this.http.get(`http://kallme.in:5000/user/list`)
    	.map((res:Response) => res.json());
    	
  	}
    getCategory(): Category[] {
	return CATEGORYDATA ;
    }
}
