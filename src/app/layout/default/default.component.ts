import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelpDialogComponent } from 'src/core/popups/help-dialog/help-dialog.component';
import {
  DashboardStoreService,
  MappedSymbols,
} from 'src/core/services/dashboard-store/dashboard-store.service';

@Component({
  selector: 'dashboard-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  sideBarOpen = false;
  symbolsMap: MappedSymbols[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: DashboardStoreService,
    private readonly router: Router
  ) {}

  get symbols(): MappedSymbols[] {
    return this.symbolsMap;
  }

  get currency(): string {
    return this.store.activeSymbol;
  }

  get interval(): string {
    return this.store.activeInterval;
  }

  ngOnInit(): void {
    this.store.prepareSymbols();

    this._subscriptions.add(
      this.router.events.subscribe(this.onCloseSideBar.bind(this))
    );
    this._subscriptions.add(
      this.store.symbols$.subscribe(
        (symbolsMap) => (this.symbolsMap = symbolsMap)
      )
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  onToggleSideBar(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }

  onHelpClicked(): void {
    this.dialog.open(HelpDialogComponent);
  }

  onCloseSideBar(): void {
    this.sideBarOpen = false;
  }
}
