import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { BinanceService } from 'src/core/services/binance';
import { DashboardStoreService } from 'src/core/services/dashboard-store';
import { GainersAndLosersComponent } from './gainers-and-losers.component';

describe('GainersAndLosersComponent', () => {
  let component: GainersAndLosersComponent;
  let fixture: ComponentFixture<GainersAndLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GainersAndLosersComponent],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot(),
        MatProgressBarModule,
        MatProgressSpinnerModule,
      ],
      providers: [BinanceService, DashboardStoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(GainersAndLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
