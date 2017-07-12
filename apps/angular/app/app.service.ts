import { Injectable, OnInit } from '@angular/core';
import {Http,Response} from '@angular/http';
import { Category } from './category';
import { CATEGORYDATA } from './mock-category';
import { Observable }     from 'rxjs/Observable';
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
    
	getCategory() {
        return this.http.get(`http://kallme.in:5000/category/list`)
        .map((res:Response) => res.json());
    	}
    
    getCategoryList(){
    	
    }
    
}
