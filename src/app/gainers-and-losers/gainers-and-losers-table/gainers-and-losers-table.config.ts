import { ColDef, GridOptions } from 'ag-grid-community';
import { TextWithImageRendererComponent } from 'libs/ag-grid/src/lib/text-with-image-renderer/text-with-image-renderer.component';

export namespace GainersAndLosersTableConfig {
  export const gridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    columnDefs: [],
    rowStyle: { alignItems: 'center' },
    domLayout: 'autoHeight',
  };

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
