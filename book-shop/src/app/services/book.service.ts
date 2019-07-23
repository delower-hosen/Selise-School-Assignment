import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from '../model/paged-data';
import { BookModel } from '../model/book-model';
import { Page } from '../model/page';
import { defaultConstant } from '../config/constants/default.constant';
import { ManagementService } from './management.service';
@Injectable()
export class MockServerResultsService {

    test: EventEmitter<any> = new EventEmitter();
    public storeKey = defaultConstant.Keys.StoreKey;
    public companyData = JSON.parse(localStorage.getItem(this.storeKey))?JSON.parse(localStorage.getItem(this.storeKey)):[];
    
    constructor() {

    }
    
    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    public getResults(page: Page): Observable<PagedData<BookModel>> {
        this.companyData = JSON.parse(localStorage.getItem(this.storeKey))?JSON.parse(localStorage.getItem(this.storeKey)):[];
        return of(this.companyData).pipe(map(data => this.getPagedData(page)));
    }

    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
     */
    private getPagedData(page: Page): PagedData<BookModel> {
        const pagedData = new PagedData<BookModel>();
        page.totalElements = this.companyData.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++){
            const jsonObj = this.companyData[i];
            const employee = new BookModel(jsonObj.bookid, jsonObj.name, jsonObj.author, jsonObj.price, jsonObj.imageurl, jsonObj.date);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }

} 