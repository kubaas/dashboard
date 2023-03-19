import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts/highstock';
import { Subscription } from 'rxjs';
import { BinanceService } from 'src/core/services/binance/binance.service';
import { DashboardStoreService } from 'src/core/services/dashboard-store/dashboard-store.service';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  Highcharts = Highcharts;

  currencies = new FormControl();
  symbols: string[] = [];

  klinesChartOptions!: Highcharts.Options;
  shouldShowChart = false;

  constructor(
    private readonly binance: BinanceService,
    private readonly store: DashboardStoreService
  ) {}

  ngOnInit() {
    this._subscriptions.add(
      this.store.symbols$.subscribe((symbols) => (this.symbols = symbols))
    );
    this._subscriptions.add(
      this.currencies.valueChanges.subscribe((value) => {
        this.binance.getKlineBars(value).subscribe((v) => {
          const data = v.map((tmp) => tmp.map((t) => Number(t)));

          this.klinesChartOptions = { series: [{ type: 'candlestick', data }] };
          this.shouldShowChart = true;
        });

        this.store.activeSymbol = value;
      })
    );

    this.currencies.patchValue(this.store.activeSymbol);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
