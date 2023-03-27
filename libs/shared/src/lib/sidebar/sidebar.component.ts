import { Component, Input } from '@angular/core';

export interface SideBarModel {
  text: string;
  matIcon: string;
  queryParams?: Record<string, string>;
  routerLink: string;
}

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() data: SideBarModel[] = [];
}
