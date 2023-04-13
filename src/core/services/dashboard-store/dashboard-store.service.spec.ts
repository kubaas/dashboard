import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BinanceService } from '../binance';

import { DashboardStoreService } from './dashboard-store.service';

describe('DashboardStoreService', () => {
  let service: DashboardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BinanceService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DashboardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
