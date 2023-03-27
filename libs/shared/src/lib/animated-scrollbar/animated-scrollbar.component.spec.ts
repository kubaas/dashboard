import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedScrollbarComponent } from './animated-scrollbar.component';

describe('AnimatedScrollbarComponent', () => {
  let component: AnimatedScrollbarComponent;
  let fixture: ComponentFixture<AnimatedScrollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimatedScrollbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimatedScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
