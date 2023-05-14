import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LibsAgGridModule } from '@dashboard/ag-grid';
import { LibsSharedModule } from '@dashboard/libs/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { HelpDialogComponent } from './../core/popups/help-dialog/help-dialog.component';
import { BinanceService } from './../core/services/binance';
import { DashboardStoreService } from './../core/services/dashboard-store';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GainersAndLosersTableComponent } from './gainers-and-losers/gainers-and-losers-table/gainers-and-losers-table.component';
import { GainersAndLosersComponent } from './gainers-and-losers/gainers-and-losers.component';
import { DefaultComponent } from './layout/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DefaultComponent,
    GainersAndLosersComponent,
    GainersAndLosersTableComponent,
    HelpDialogComponent,
  ],
  imports: [
    AgGridModule,
    BrowserModule,
    BrowserAnimationsModule,
    LibsAgGridModule,
    LibsSharedModule,
    HighchartsChartModule,
    HttpClientModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [BinanceService, DashboardStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
