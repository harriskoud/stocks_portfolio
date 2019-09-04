import { Injectable } from '@angular/core';
import { Stock } from './stocks.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const defaultBalance: number = 10000;

@Injectable()
export class AccountService {

    private _balance: number = defaultBalance;
    private _cost: number;
    private _value: number;
    private _stocks: Stock[] = [];


    get balance(): number { return this._balance; }
    get cost(): number { return this._cost; }
    get value(): number { return this._value; }
    get stocks(): Stock[] { return this._stocks; }

    purchase(stock: Stock) {
        console.log('i am in')
        stock = Object.assign({}, stock);
        if (stock.price < this.balance) {
            this._balance = this.debit(stock.price, this.balance);
            stock.cost = stock.price;
            this._cost = this.credit(stock.price, this.cost);
            stock.change = 0;
            this._stocks.push(stock);
            this.calculateValue();
        }
    }

    sell(index: number){
        let stock = this.stocks[index];
        if(stock){
            this._balance = this.credit(stock.price,this.balance);
            this._stocks.splice(index,1);
            this._cost = this.debit(stock.cost,this.cost);
            this.calculateValue;
        }
    }

    init() {

    }

    reset() {
        this._value = 0;
        this._stocks = [];
        this._balance = defaultBalance;
    }

    calculateValue() {
        this._value = this._stocks.map(stock => stock.price).reduce((a, b) => { return a + b }, 0);
    }

    private debit(stockPrice: number, currentBalance: number): number {
        return (currentBalance * 100 - stockPrice * 100) / 100;
    }

    private credit(stockPrice: number, currentBalance: number): number {
        return (currentBalance * 100 + stockPrice * 100) / 100;
    }


}


