import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MappedSymbols } from 'src/core/services/dashboard-store/dashboard-store.service';
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
  @Input() symbolsMap: MappedSymbols[] = [];

  gridOptions = Config.gridOptions;

  get symbols(): Record<string, string> {
    const symbols = {} as Record<string, string>;
    this.symbolsMap.forEach((symbol) => (symbols[symbol.symbol] = symbol.logo));
    return symbols;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['symbolsMap'] && this.gridOptions.api) {
      this.gridOptions.api.setColumnDefs(Config.columnDefs(this.symbols));
    }
  }

  onGridReady(): void {
    this.gridOptions.api!.setColumnDefs(Config.columnDefs(this.symbols));
  }
}
