import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Output() toggleSideBar = new EventEmitter<void>();

  toggleSideBar2(): void {
    this.toggleSideBar.emit();
  }
}
