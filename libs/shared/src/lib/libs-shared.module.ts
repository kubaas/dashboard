import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule, MatToolbarModule],
  declarations: [FooterComponent, HeaderComponent, SidebarComponent],
  exports: [FooterComponent, HeaderComponent, SidebarComponent],
})
export class LibsSharedModule {}
