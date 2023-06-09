import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AnimatedScrollbarComponent } from './animated-scrollbar/animated-scrollbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LogoutComponent,
    AnimatedScrollbarComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LogoutComponent,
    AnimatedScrollbarComponent,
  ],
})
export class LibsSharedModule {}
