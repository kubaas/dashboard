import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KlineBarsInterval, SymbolsList, Ticker24HR } from './binance.model';

@Injectable({
  providedIn: 'root',
})
export class BinanceService {
  private static readonly URL = 'https://www.binance.com/api/v3';
  private static readonly TICKER_URL = `${BinanceService?.URL}/ticker/24hr`;
  private static readonly SYMBOLS_LIST_URL = `https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list`;
  private static readonly KLINES_URL = (
    symbol: string,
    limit: number,
    interval: KlineBarsInterval
  ) =>
    `${BinanceService.URL}/klines?symbol=${symbol}&limit=${limit}&interval=${interval}`;

  constructor(private readonly http: HttpClient) {}

  getTicker24HR(): Observable<Ticker24HR[]> {
    return this.http.get<Ticker24HR[]>(BinanceService.TICKER_URL);
  }

  getKlineBars(
    currency: string,
    interval: KlineBarsInterval,
    limit: number
  ): Observable<Array<string | number>[]> {
    return this.http.get<Array<string | number>[]>(
      BinanceService.KLINES_URL(currency, limit, interval)
    );
  }

  getSymbolsList(): Observable<SymbolsList> {
    return this.http.get<SymbolsList>(BinanceService.SYMBOLS_LIST_URL);
  }
}
