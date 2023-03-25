import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomLayoutType, GridOptions } from 'ag-grid-community';
import { MappedTickers } from '../gainers-and-losers.component';
import { GainersAndLosersTableConfig as Config } from './gainers-and-losers-table.config';

@Component({
  selector: 'dashboard-gainers-and-losers-table',
  templateUrl: './gainers-and-losers-table.component.html',
  styleUrls: ['./gainers-and-losers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersAndLosersTableComponent implements OnChanges {
  @Input() data: MappedTickers[] = [];
  @Input() symbolsMap: Record<string, string> = {};

  gridOptions: GridOptions = {
    defaultColDef: {
      filter: true,
      floatingFilter: true,
      resizable: true,
      sortable: true,
    },
    columnDefs: [],
    rowStyle: { alignItems: 'center' },
  };

  domLayout: DomLayoutType = 'autoHeight';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['symbolsMap'] && this.gridOptions.api) {
      this.gridOptions.api.setColumnDefs(Config.columnDefs(this.symbolsMap));
    }
  }

  onGridReady(): void {
    this.gridOptions.api!.setColumnDefs(Config.columnDefs(this.symbolsMap));
  }
}
