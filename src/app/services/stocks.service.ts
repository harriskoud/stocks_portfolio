import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Stock } from './stocks.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StocksService {

    constructor(private http: HttpClient){}

    getStocks(){
        return this.http.get<Array<Stock>>(ConfigService.get('api'));
    }
}
