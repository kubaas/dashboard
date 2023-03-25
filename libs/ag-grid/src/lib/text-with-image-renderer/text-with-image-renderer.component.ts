import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { TextWithImage } from './text-with-image-renderer.model';

@Component({
  selector: 'dashboard-text-with-image-renderer',
  templateUrl: './text-with-image-renderer.component.html',
  styleUrls: ['./text-with-image-renderer.component.scss'],
})
export class TextWithImageRendererComponent
  implements ICellRendererAngularComp
{
  text = '';
  imgSource = '';

  agInit(params: TextWithImage): void {
    this.text = params.value;
    this.imgSource = params.imgSource ?? '';
  }

  refresh(params: TextWithImage): boolean {
    this.agInit(params);
    return true;
  }
}
