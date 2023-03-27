import { Ticker24HR } from './../../core/services/binance';

export type MappedTickers = Pick<
  Ticker24HR,
  'symbol' | 'lastPrice' | 'priceChangePercent'
>;
