import { CommonDataService } from './common-data.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from '../model/paged-data';
import { BookModel } from '../model/book-model';
import { Page } from '../model/page';
import { defaultConstant } from '../config/constants/default.constant';
@Injectable()
export class ServerResultsService {

    test: EventEmitter<any> = new EventEmitter();
    public storeKey = defaultConstant.Keys.StoreKey;
    public Data = [];
    
    constructor(
        private _commonDataService: CommonDataService
    ) {

    }

    public getResults(page: Page): Observable<PagedData<BookModel>> {
        this.Data = this._commonDataService.getData(this.storeKey);
        return of(this.Data).pipe(map(data => this.getPagedData(page)));
    }

    private getPagedData(page: Page): PagedData<BookModel> {
        const pagedData = new PagedData<BookModel>();
        page.totalElements = this.Data.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++){
            const jsonObj = this.Data[i];
            const employee = new BookModel(jsonObj.bookid, jsonObj.name, jsonObj.author, jsonObj.price, jsonObj.imageurl, jsonObj.date);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }

} 