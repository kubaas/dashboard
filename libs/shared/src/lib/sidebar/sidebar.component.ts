import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() dashboard = '';
  @Input() gainersAndLosers = '';
  @Input() currency = '';
  @Input() interval = '';
}
