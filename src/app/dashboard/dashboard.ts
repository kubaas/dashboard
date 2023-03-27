import { KlineBarsInterval } from 'src/core/services/binance';

export function setKlinesChartOptions(
  data: number[][],
  currency: string
): Highcharts.Options {
  return {
    series: [
      {
        name: currency,
        data: data,
        type: 'candlestick',
        upColor: 'green',
        color: 'red',
      },
    ],
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: { text: '' },
    },
    title: {
      text: `${currency} to USD Chart`,
    },
  };
}

export function getIntervalWithLimit(
  interval: KlineBarsInterval
): [KlineBarsInterval, number] {
  switch (interval) {
    case '1M':
      return ['1d', 31];
    case '1w':
      return ['30m', 336];
    case '3d':
      return ['30m', 144];
    case '1d':
      return ['30m', 48];
    case '12h':
      return ['5m', 144];
    case '6h':
      return ['5m', 72];
    case '1h':
      return ['1m', 60];
    default:
      return ['1M', 0];
  }
}
