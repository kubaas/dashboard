import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithImageRendererComponent } from './text-with-image-renderer.component';

describe('TextWithImageRendererComponent', () => {
  let component: TextWithImageRendererComponent;
  let fixture: ComponentFixture<TextWithImageRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextWithImageRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextWithImageRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
