import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BinanceService } from './binance.service';

describe('BinanceService', () => {
  let service: BinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BinanceService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
