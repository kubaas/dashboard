import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SymbolsList } from '../binance/binance.model';
import { BinanceService } from '../binance/binance.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardStoreService implements OnDestroy {
  private readonly _subscriptions = new Subscription();
  private _symbolsSubject = new BehaviorSubject<string[]>([]);
  private _activeSymbol?: string;

  constructor(private readonly binance: BinanceService) {}

  get symbols$(): Observable<string[]> {
    return this._symbolsSubject.asObservable();
  }

  get activeSymbol(): string {
    return this._activeSymbol ?? '';
  }

  set activeSymbol(activeSymbol: string) {
    this._activeSymbol = activeSymbol;
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

  private mapSymbols(symbolsList: SymbolsList): string[] {
    return symbolsList.data.map((symbol) => symbol.symbol);
  }
}
