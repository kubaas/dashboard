import { Component, OnDestroy, OnInit } from '@angular/core';
import { pick, take, takeRight } from 'lodash';
import { interval, Observable, Subscription, tap } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { Ticker24HR } from './../../core/services/binance/binance.model';
import { BinanceService } from './../../core/services/binance/binance.service';
import { DashboardStoreService } from './../../core/services/dashboard-store';
import { MappedTickers } from './gainers-and-losers.model';

@Component({
  selector: 'dashboard-gainers-and-losers',
  templateUrl: './gainers-and-losers.component.html',
  styleUrls: ['./gainers-and-losers.component.scss'],
})
export class GainersAndLosersComponent implements OnInit, OnDestroy {
  private static readonly INTERVAL_1S = 1000;
  private static readonly INTERVAL_10S = 10 * 1000;

  private readonly _subscriptions = new Subscription();

  symbolsWithImgs$!: Observable<Record<string, string>>;
  gainers$!: Observable<MappedTickers[]>;
  losers$!: Observable<MappedTickers[]>;

  refreshProgress = 0;

  constructor(
    private readonly binance: BinanceService,
    private readonly store: DashboardStoreService
  ) {}

  ngOnInit(): void {
    const gainerAndLosers$ = interval(
      GainersAndLosersComponent.INTERVAL_10S
    ).pipe(
      startWith('ping'),
      mergeMap(() =>
        this.binance.getTicker24HR().pipe(
          map((tickers) => tickers.map(this.mapTickers).sort(this.sortTickers)),
          tap(() => (this.refreshProgress = 0))
        )
      )
    );

    this.symbolsWithImgs$ = this.store.symbolsWithImgs$;
    this.gainers$ = gainerAndLosers$.pipe(map((ticker) => take(ticker, 10)));
    this.losers$ = gainerAndLosers$.pipe(
      map((ticker) => takeRight(ticker, 10).reverse())
    );

    this._subscriptions.add(
      interval(GainersAndLosersComponent.INTERVAL_1S).subscribe(
        () => (this.refreshProgress += 10)
      )
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private mapTickers = (ticker: Ticker24HR) =>
    pick(ticker, ['symbol', 'lastPrice', 'priceChangePercent']);

  private sortTickers = (a: MappedTickers, b: MappedTickers) =>
    Number(b.priceChangePercent) - Number(a.priceChangePercent);
}
