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
  dayChangeAmount: number;
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
