import { Component, OnDestroy, OnInit } from '@angular/core';
import { pick, take, takeRight } from 'lodash';
import { interval, Subscription } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { Ticker24HR } from 'src/core/services/binance/binance.model';
import { BinanceService } from 'src/core/services/binance/binance.service';

export type MappedTickers = Pick<
  Ticker24HR,
  'symbol' | 'lastPrice' | 'priceChangePercent'
>;

@Component({
  selector: 'dashboard-gainers-and-losers',
  templateUrl: './gainers-and-losers.component.html',
  styleUrls: ['./gainers-and-losers.component.scss'],
})
export class GainersAndLosersComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  gainers: MappedTickers[] = [];
  losers: MappedTickers[] = [];
  refreshProgress = 0;

  constructor(private readonly binance: BinanceService) {}

  ngOnInit(): void {
    this._subscriptions.add(
      interval(1000).subscribe((time) => (this.refreshProgress += 10))
    );
    this._subscriptions.add(
      interval(10 * 1000)
        .pipe(
          startWith('ping'),
          mergeMap(() =>
            this.binance
              .getTicker24HR()
              .pipe(
                map((value) =>
                  value.map(this.mapTickers).sort(this.sortTickers)
                )
              )
          )
        )
        .subscribe(this.fillGainersAndLosers.bind(this))
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private mapTickers = (ticker: Ticker24HR) =>
    pick(ticker, ['symbol', 'lastPrice', 'priceChangePercent']);

  private sortTickers = (a: MappedTickers, b: MappedTickers) =>
    Number(b.priceChangePercent) - Number(a.priceChangePercent);

  private fillGainersAndLosers = (ticker: MappedTickers[]) => {
    this.gainers = take(ticker, 10);
    this.losers = takeRight(ticker, 10).reverse();
    this.refreshProgress = 0;
  };
}
