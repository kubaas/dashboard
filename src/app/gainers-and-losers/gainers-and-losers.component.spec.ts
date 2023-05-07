import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { Observable, interval, of } from 'rxjs';
import { BinanceService, Ticker24HR } from 'src/core/services/binance';
import { DashboardStoreService } from 'src/core/services/dashboard-store';
import { GainersAndLosersTableComponent } from './gainers-and-losers-table/gainers-and-losers-table.component';
import { GainersAndLosersComponent } from './gainers-and-losers.component';

describe('GainersAndLosersComponent', () => {
  const tickers = [
    {
      symbol: 'BTC',
      lastPrice: '999',
      priceChangePercent: '10',
    } as Ticker24HR,
    {
      symbol: 'ETH',
      lastPrice: '111',
      priceChangePercent: '-50',
    } as Ticker24HR,
  ];
  const mockBinanceService = {
    getTicker24HR: (): Observable<Ticker24HR[]> => of(tickers),
  };

  let component: GainersAndLosersComponent;
  let fixture: ComponentFixture<GainersAndLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GainersAndLosersComponent, GainersAndLosersTableComponent],
      imports: [
        AgGridModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        MatProgressBarModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        { provide: BinanceService, useValue: mockBinanceService },
        DashboardStoreService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GainersAndLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill gainers on init', (done) => {
    component.gainers$.subscribe((gainers) => {
      expect(gainers).toEqual(tickers);
      done();
    });
  });

  it('should fill losers on init', (done) => {
    component.losers$.subscribe((losers) => {
      expect(losers).toEqual(tickers.reverse());
      done();
    });
  });

  it('should increase progress bar every second by 10', (done) => {
    interval(1000).subscribe((interval) => {
      expect(component.refreshProgress).toBe(10 * interval + 10);

      if (interval === 2) done();
    });
  });
});
