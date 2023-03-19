import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from 'src/core/popups/help-dialog/help-dialog.component';
import { DashboardStoreService } from 'src/core/services/dashboard-store/dashboard-store.service';

@Component({
  selector: 'dashboard-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  private static readonly DEFAULT_SYMBOL = 'BTCUSDT';

  sideBarOpen = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: DashboardStoreService
  ) {}

  ngOnInit(): void {
    this.store.activeSymbol = DefaultComponent.DEFAULT_SYMBOL;
    this.store.prepareSymbols();
  }

  toggleSideBar(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }

  helpClicked(): void {
    this.dialog.open(HelpDialogComponent);
  }
}
