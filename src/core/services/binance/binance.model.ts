export type KlineBarsInterval =
  | '1s'
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M';

export interface Ticker24HR {
  askPrice: string;
  askQty: string;
  bidPrice: string;
  bidQty: string;
  closeTime: number;
  count: number;
  firstId: number;
  highPrice: string;
  lastId: number;
  lastPrice: string;
  lastQty: string;
  lowPrice: string;
  openPrice: string;
  openTime: number;
  prevClosePrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  weightedAvgPrice: string;
}

export interface SymbolsList {
  code: string;
  data: Symbol[];
  message: string | null;
  messageDetail: string | null;
  success: boolean;
}

export interface Symbol {
  baseAsset: string;
  circulatingSupply: number;
  cmcUniqueId: number;
  dayChange: number;
  dayChangeAmount: number | null;
  fullName: string;
  hidden: number;
  highLight: number;
  id: number;
  listingTime: number;
  localFullName: string;
  logo: string;
  mapperName: string;
  marketCap: number;
  name: string;
  price: number;
  quoteAsset: string;
  rank: number;
  reverse: number;
  slug: string;
  specialAsset: false;
  symbol: string;
  totalSupply: number;
  volume: number;
}
