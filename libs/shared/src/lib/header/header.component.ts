import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() signOut = '';
  @Output() toggleSideBar = new EventEmitter<void>();
  @Output() helpClicked = new EventEmitter<void>();

  onMenuClick(): void {
    this.toggleSideBar.emit();
  }

  onHelpClick(): void {
    this.helpClicked.emit();
  }
}
