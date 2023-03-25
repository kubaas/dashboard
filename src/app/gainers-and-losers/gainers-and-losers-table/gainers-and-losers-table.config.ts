import { ColDef } from 'ag-grid-community';
import { TextWithImageRendererComponent } from 'libs/ag-grid/src/lib/text-with-image-renderer/text-with-image-renderer.component';

export namespace GainersAndLosersTableConfig {
  export function columnDefs(symbolsMap: Record<string, string>): ColDef[] {
    return [
      {
        field: '#',
        width: 100,
        valueGetter: (node) => Number(node.node?.rowIndex) + 1,
        cellRendererFramework: TextWithImageRendererComponent,
        cellRendererParams: (params: any) => ({
          imgSource: symbolsMap?.[params.node.data.symbol],
        }),
      },
      { field: 'symbol', width: 115 },
      { field: 'lastPrice', width: 153 },
      {
        field: 'priceChangePercent',
        width: 195,
        valueFormatter: (node) =>
          (node.value > 0 ? '+' : '') + node.value + ' %',
        cellStyle: (params) =>
          params.value > 0 ? { color: 'green' } : { color: 'red' },
      },
    ];
  }
}
