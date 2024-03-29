import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './services/account.service';
import { StocksService } from './services/stocks.service';
import { Stock } from './services/stocks.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StocksService
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  refresh: boolean = true;
  stocks: Stock[] = [];
  interval: any;

  constructor(private accountService: AccountService,
    private stockService: StocksService) { }

  ngOnInit(): void {
    this.load();
    this.interval = setInterval(() => {
      if (this.refresh) {
        this.load();
      }
    }, 15000)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  toggleRefresh(): void {
    this.refresh = !this.refresh;
  }

  reset(): void {
    this.accountService.reset();
  }

  private load(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks
    }, error => {
      console.log(`There was an error loading stocks: ${error}`);
    });
  }

}
