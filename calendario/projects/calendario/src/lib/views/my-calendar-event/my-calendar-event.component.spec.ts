import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalendarEventComponent } from './my-calendar-event.component';

describe('MyCalendarEventComponent', () => {
  let component: MyCalendarEventComponent;
  let fixture: ComponentFixture<MyCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCalendarEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
