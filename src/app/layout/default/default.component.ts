import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpDialogComponent } from 'src/core/popups/help-dialog/help-dialog.component';
import { DashboardStoreService } from 'src/core/services/dashboard-store/dashboard-store.service';

@Component({
  selector: 'dashboard-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
  private static readonly DEFAULT_SYMBOL = 'BTCUSDT';

  private readonly _subscriptions = new Subscription();

  sideBarOpen = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: DashboardStoreService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.store.activeSymbol = DefaultComponent.DEFAULT_SYMBOL;
    this.store.prepareSymbols();

    this._subscriptions.add(
      this.router.events.subscribe(this.onCloseSideBar.bind(this))
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onToggleSideBar(): void {
    this.sideBarOpen = !this.sideBarOpen;
    console.log(this.sideBarOpen);
  }

  onHelpClicked(): void {
    this.dialog.open(HelpDialogComponent);
  }

  onCloseSideBar(): void {
    this.sideBarOpen = false;
  }
}
