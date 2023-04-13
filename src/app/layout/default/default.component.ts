import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SideBarModel } from '@dashboard/libs/shared';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { HelpDialogComponent } from './../../../core/popups/help-dialog/help-dialog.component';
import { Ticker24HR } from './../../../core/services/binance';
import { DashboardStoreService } from './../../../core/services/dashboard-store';

@Component({
  selector: 'dashboard-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
  private readonly _subscriptions = new Subscription();

  tickers$!: Observable<Ticker24HR[]>;
  sideBarData$!: Observable<SideBarModel[]>;

  sideBarOpen = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: DashboardStoreService,
    private readonly router: Router,
    private translate: TranslateService
  ) {}

  get currency(): string {
    return this.store.activeSymbol;
  }

  get interval(): string {
    return this.store.activeInterval;
  }

  ngOnInit(): void {
    this.tickers$ = this.store.ticker24HR$;

    this.store.prepareSymbols();

    this._subscriptions.add(
      this.router.events.subscribe(this.onCloseSideBar.bind(this))
    );
    this.sideBarData$ = this.translate
      .get(['sidebar.dashboard', 'sidebar.gainersAndLosers'])
      .pipe(
        map((translations: Record<string, string>) => [
          {
            text: translations['sidebar.dashboard'],
            matIcon: 'dashboard',
            queryParams: {
              currency: this.currency,
              interval: this.interval,
            },
            routerLink: '/dashboard',
          },
          {
            text: translations['sidebar.gainersAndLosers'],
            matIcon: 'trending_up',
            routerLink: '/gainers-and-losers',
          },
        ])
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
