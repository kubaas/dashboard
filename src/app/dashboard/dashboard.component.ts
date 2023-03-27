import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import { isEmpty } from 'lodash';
import {
  combineLatest,
  filter,
  map,
  mergeMap,
  Observable,
  startWith,
  Subscription,
} from 'rxjs';
import { BinanceService, KlineBarsInterval } from 'src/core/services/binance';
import {
  DashboardStoreService,
  MappedSymbols,
} from 'src/core/services/dashboard-store';
import { getIntervalWithLimit, setKlinesChartOptions } from './dashboard';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  Highcharts = Highcharts;
  klinesChartOptions!: Highcharts.Options;

  symbols$!: Observable<MappedSymbols[]>;
  symbolsWithImgs$!: Observable<Record<string, string>>;

  currencies = new FormControl();
  intervalControl = new FormControl();

  intervals: KlineBarsInterval[] = ['1h', '6h', '12h', '1d', '3d', '1w', '1M'];
  shouldShowChart = false;

  constructor(
    private readonly binance: BinanceService,
    private readonly store: DashboardStoreService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  private get currencyValue(): string {
    return this.currencies.value;
  }

  ngOnInit() {
    const queryParams$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => [
        params['currency'] as string,
        params['interval'] as string,
      ]),
      filter(([currency, interval]) => !!currency && !!interval)
    );

    this.symbols$ = this.store.symbols$;
    this.symbolsWithImgs$ = this.store.symbolsWithImgs$;

    this._subscriptions.add(
      queryParams$.subscribe(([currency, interval]) => {
        this.currencies.patchValue(currency, { emitEvent: false });
        this.intervalControl.patchValue(interval, { emitEvent: false });
      })
    );

    this.getNewKlinesAndSetChart(queryParams$);
    this.navigateWhenNewControlsValues();
    this.defaultWhenEmptyParams();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private getNewKlinesAndSetChart(queryParams$: Observable<string[]>): void {
    this._subscriptions.add(
      queryParams$
        .pipe(
          mergeMap(([currency, interval]) =>
            this.binance.getKlineBars(
              currency,
              ...getIntervalWithLimit(interval as KlineBarsInterval)
            )
          )
        )
        .subscribe((klines) => {
          const mapKlinesFn = (klines: (string | number)[]) =>
            klines.map((kline) => Number(kline));

          this.klinesChartOptions = setKlinesChartOptions(
            klines.map(mapKlinesFn),
            this.currencyValue
          );
          this.shouldShowChart = true;
        })
    );
  }

  private navigateWhenNewControlsValues(): void {
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
  }

  private defaultWhenEmptyParams(): void {
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
}
