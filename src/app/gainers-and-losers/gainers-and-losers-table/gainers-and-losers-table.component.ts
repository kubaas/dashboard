import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { MappedTickers } from '../gainers-and-losers.component';

@Component({
  selector: 'dashboard-gainers-and-losers-table',
  templateUrl: './gainers-and-losers-table.component.html',
  styleUrls: ['./gainers-and-losers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersAndLosersTableComponent {
  @Input() data?: MappedTickers[];

  columnDefs: ColDef[] = [
    {
      field: '#',
      width: 100,
      valueGetter: (node) => Number(node.node?.rowIndex) + 1,
    },
    { field: 'symbol', width: 115 },
    { field: 'lastPrice', width: 153 },
    {
      field: 'priceChangePercent',
      width: 195,
      valueFormatter: (node) => (node.value > 0 ? '+' : '') + node.value + ' %',
      cellStyle: (params) =>
        params.value > 0 ? { color: 'green' } : { color: 'red' },
    },
  ];

  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    resizable: true,
    sortable: true,
  };
}
