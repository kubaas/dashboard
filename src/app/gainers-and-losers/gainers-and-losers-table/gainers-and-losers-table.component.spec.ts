import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgGridModule } from 'ag-grid-angular';

import { GainersAndLosersTableComponent } from './gainers-and-losers-table.component';

describe.only('GainersAndLosersTableComponent', () => {
  let component: GainersAndLosersTableComponent;
  let fixture: ComponentFixture<GainersAndLosersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GainersAndLosersTableComponent],
      imports: [AgGridModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GainersAndLosersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
