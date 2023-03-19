import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainersAndLosersTableComponent } from './gainers-and-losers-table.component';

describe('GainersAndLosersTableComponent', () => {
  let component: GainersAndLosersTableComponent;
  let fixture: ComponentFixture<GainersAndLosersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GainersAndLosersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GainersAndLosersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
