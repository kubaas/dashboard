import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import { isEmpty } from 'lodash';
import { combineLatest, filter, mergeMap, startWith, Subscription } from 'rxjs';
import { BinanceService, KlineBarsInterval } from 'src/core/services/binance';
import {
  DashboardStoreService,
  MappedSymbols,
} from 'src/core/services/dashboard-store/dashboard-store.service';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  Highcharts = Highcharts;
  intervals: KlineBarsInterval[] = ['1h', '6h', '12h', '1d', '3d', '1w', '1M'];

  currencies = new FormControl();
  intervalControl = new FormControl();
  symbolsMap: MappedSymbols[] = [];

  klinesChartOptions!: Highcharts.Options;
  pieChartOptions!: Highcharts.Options;
  shouldShowChart = false;

  constructor(
    private readonly binance: BinanceService,
    private readonly store: DashboardStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  get symbolsWithImgs(): Record<string, string> {
    const symbols = {} as Record<string, string>;
    this.symbolsMap.forEach((symbol) => (symbols[symbol.symbol] = symbol.logo));
    return symbols;
  }

  get symbols(): string[] {
    return this.symbolsMap.map((symbol) => symbol.symbol);
  }

  get symbolsText(): string {
    return this.symbols.join(' ');
  }

  private get currencyValue(): string {
    return this.currencies.value;
  }

  ngOnInit() {
    this._subscriptions.add(
      this.store.symbols$.subscribe(
        (symbolsMap) => (this.symbolsMap = symbolsMap)
      )
    );

    this._subscriptions.add(
      this.activatedRoute.queryParams
        .pipe(
          filter((params: any) => params.currency && params.interval),
          mergeMap((params: any) => {
            console.log(params);
            this.intervalControl.patchValue(params.interval, {
              emitEvent: false,
            });
            this.currencies.patchValue(params.currency, { emitEvent: false });

            return this.binance.getKlineBars(
              params.currency ?? '',
              ...this.getIntervalWithLimit(params.interval ?? '')
            );
          })
        )
        .subscribe((value) => {
          const data = value.map((klines) =>
            klines.map((kline) => Number(kline))
          );

          this.setKlinesChartOptions(data);
          this.shouldShowChart = true;
        })
    );

    this._subscriptions.add(
      combineLatest([
        this.currencies.valueChanges.pipe(startWith(this.currencies.value)),
        this.intervalControl.valueChanges.pipe(
          startWith(this.intervalControl.value)
        ),
      ]).subscribe(([currency, interval]) => {
        this.store.activeSymbol = currency;
        this.store.activeInterval = interval;

        return this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { currency, interval },
        });
      })
    );

    this._subscriptions.add(
      this.currencies.valueChanges.subscribe(
        (value) => (this.store.activeSymbol = value)
      )
    );

    this._subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        if (isEmpty(params)) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { currency: 'BTCUSDT', interval: '1M' },
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private getIntervalWithLimit(
    interval: KlineBarsInterval
  ): [KlineBarsInterval, number] {
    switch (interval) {
      case '1M':
        return ['1d', 31];
      case '1w':
        return ['30m', 336];
      case '3d':
        return ['30m', 144];
      case '1d':
        return ['30m', 48];
      case '12h':
        return ['5m', 144];
      case '6h':
        return ['5m', 72];
      case '1h':
        return ['1m', 60];
      default:
        return ['1M', 0];
    }
  }

  private setKlinesChartOptions(data: number[][]): void {
    this.klinesChartOptions = {
      series: [
        {
          name: this.currencyValue,
          data: data,
          type: 'candlestick',
          upColor: 'green',
          color: 'red',
        },
      ],
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      title: {
        text: `${this.currencyValue} to USD Chart`,
      },
    };
  }
}
