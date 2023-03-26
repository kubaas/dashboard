import { Injectable, OnDestroy } from '@angular/core';
import { pick } from 'lodash';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  KlineBarsInterval,
  Symbol,
  SymbolsList,
} from '../binance/binance.model';
import { BinanceService } from '../binance/binance.service';

export type MappedSymbols = Pick<Symbol, 'symbol' | 'logo' | 'dayChangeAmount'>;

@Injectable({
  providedIn: 'root',
})
export class DashboardStoreService implements OnDestroy {
  private readonly _subscriptions = new Subscription();
  private _symbolsSubject = new BehaviorSubject<MappedSymbols[]>([]);
  private _activeSymbol?: string;
  private _activeInterval?: KlineBarsInterval;

  constructor(private readonly binance: BinanceService) {}

  get symbols$(): Observable<MappedSymbols[]> {
    return this._symbolsSubject.asObservable();
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
  }

  private mapSymbols(symbolsList: SymbolsList): MappedSymbols[] {
    return symbolsList.data.map((symbol) =>
      pick(symbol, ['symbol', 'logo', 'dayChangeAmount'])
    );
  }
}
