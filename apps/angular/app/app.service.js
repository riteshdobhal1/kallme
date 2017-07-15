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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
const globalval = require("./shared/global");
let AppService = class AppService {
    constructor(http) {
        this.http = http;
    }
    getUser() {
        return this.http.get(`${globalval.rest_api_domain}/user/list`)
            .map((res) => res.json());
    }
    getCategory() {
        return this.http.get(`${globalval.rest_api_domain}/category/list`)
            .map((res) => res.json());
    }
    getSearchResults(searchString) {
        return this.http.get(`${globalval.rest_api_domain}/category/search`, {
            search: {
                search: searchString
            }
        })
            .map((res) => res.json());
    }
    getCategoryList() {
    }
};
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map