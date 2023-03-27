import { Ticker24HR } from 'src/core/services/binance';

export type MappedTickers = Pick<
  Ticker24HR,
  'symbol' | 'lastPrice' | 'priceChangePercent'
>;
