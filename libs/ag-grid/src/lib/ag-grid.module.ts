import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { TextWithImageRendererComponent } from './text-with-image-renderer/text-with-image-renderer.component';

@NgModule({
  imports: [AgGridModule, CommonModule, MatIconModule],
  declarations: [TextWithImageRendererComponent],
})
export class LibsAgGridModule {}
