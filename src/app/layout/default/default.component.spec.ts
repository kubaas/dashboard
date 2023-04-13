import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnimatedScrollbarComponent,
  FooterComponent,
  HeaderComponent,
  SidebarComponent,
} from '@dashboard/libs/shared';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardStoreService } from 'src/core/services/dashboard-store';
import { DefaultComponent } from './default.component';

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DefaultComponent,
        HeaderComponent,
        AnimatedScrollbarComponent,
        SidebarComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatIconModule,
        RouterTestingModule,
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [DashboardStoreService],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
