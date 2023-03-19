import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts/highstock';
import { mergeMap, Subscription } from 'rxjs';
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
  symbolsMap: Record<string, string> = {};

  klinesChartOptions!: Highcharts.Options;
  pieChartOptions!: Highcharts.Options;
  shouldShowChart = false;

  constructor(
    private readonly binance: BinanceService,
    private readonly store: DashboardStoreService
  ) {}

  get symbols(): string[] {
    return Object.keys(this.symbolsMap);
  }

  ngOnInit() {
    this._subscriptions.add(
      this.store.symbols$.subscribe(
        (symbolsMap) => (this.symbolsMap = symbolsMap)
      )
    );
    this._subscriptions.add(
      this.currencies.valueChanges
        .pipe(mergeMap((value) => this.binance.getKlineBars(value)))
        .subscribe((value) => {
          const data = value.map((klines) =>
            klines.map((kline) => Number(kline))
          );

          this.klinesChartOptions = { series: [{ type: 'candlestick', data }] };
          this.shouldShowChart = true;
        })
    );
    this._subscriptions.add(
      this.currencies.valueChanges.subscribe(
        (value) => (this.store.activeSymbol = value)
      )
    );

    this.pieChartOptions = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: 'Browser market shares at a specific website, 2014',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
              color: 'black',
            },
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Browser share',
          data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true,
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7],
          ],
        },
      ],
    };

    this.currencies.patchValue(this.store.activeSymbol);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
