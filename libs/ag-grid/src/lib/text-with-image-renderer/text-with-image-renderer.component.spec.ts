import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithImageRendererComponent } from './text-with-image-renderer.component';
import { TextWithImage } from './text-with-image-renderer.model';

describe('TextWithImageRendererComponent', () => {
  const params = { value: 'test', imgSource: 'testImg' } as TextWithImage;

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

  it('should assign properties from params', () => {
    component.agInit(params);

    expect(component.text).toBe('test');
    expect(component.imgSource).toBe('testImg');
  });

  it('should call agInit on refresh', () => {
    // given
    const spy = jest.spyOn(component, 'agInit');

    // when
    component.refresh(params);

    // then
    expect(spy).toHaveBeenCalledWith(params);
  });

  it('should clear imgSource on error', () => {
    // given
    component.agInit(params);

    // when
    component.onImgError();

    // then
    expect(component.text).toBe('test');
    expect(component.imgSource).toBe('');
  });
});
