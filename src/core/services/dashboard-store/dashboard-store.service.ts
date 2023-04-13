import { Injectable, OnDestroy } from '@angular/core';
import { orderBy, pick } from 'lodash';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  KlineBarsInterval,
  Symbol,
  SymbolsList,
  Ticker24HR,
} from '../binance/binance.model';
import { BinanceService } from '../binance/binance.service';

export type MappedSymbols = Pick<Symbol, 'symbol' | 'logo' | 'dayChangeAmount'>;

@Injectable({
  providedIn: 'root',
})
export class DashboardStoreService implements OnDestroy {
  private readonly _subscriptions = new Subscription();
  private _symbolsSubject = new BehaviorSubject<MappedSymbols[]>([]);
  private _ticker24HRSubject = new BehaviorSubject<Ticker24HR[]>([]);
  private _activeSymbol?: string;
  private _activeInterval?: KlineBarsInterval;

  constructor(private readonly binance: BinanceService) {}

  get symbols$(): Observable<MappedSymbols[]> {
    return this._symbolsSubject.asObservable();
  }

  get ticker24HR$(): Observable<Ticker24HR[]> {
    return this._ticker24HRSubject.asObservable();
  }

  get symbolsWithImgs$(): Observable<Record<string, string>> {
    return this.symbols$.pipe(
      map((symbols) =>
        symbols.reduce((map: Record<string, string>, obj) => {
          map[obj.symbol] = obj.logo;
          return map;
        }, {})
      )
    );
  }

  get activeSymbol(): string {
    return this._activeSymbol ?? '';
  }

  set activeSymbol(activeSymbol: string) {
    this._activeSymbol = activeSymbol;
  }

  get activeInterval(): KlineBarsInterval {
    return this._activeInterval ?? '1M';
  }

  set activeInterval(activeInterval: KlineBarsInterval) {
    this._activeInterval = activeInterval;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  prepareSymbols(): void {
    this._subscriptions.add(
      this.binance
        .getSymbolsList()
        .pipe(map(this.mapSymbols))
        .subscribe((symbols) => this._symbolsSubject.next(symbols))
    );
    this._subscriptions.add(
      this.binance
        .getTicker24HR()
        .pipe(
          map((tickers) =>
            orderBy(tickers, [(ticker) => ticker.symbol.toLowerCase()], ['asc'])
          )
        )
        .subscribe((tickers) => this._ticker24HRSubject.next(tickers))
    );
  }

  private mapSymbols(symbolsList: SymbolsList): MappedSymbols[] {
    return symbolsList.data.map((symbol) =>
      pick(symbol, ['symbol', 'logo', 'dayChangeAmount'])
    );
  }
}
