import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpPollingComponent } from './http-polling.component';

describe('HttpPollingComponent', () => {
  let component: HttpPollingComponent;
  let fixture: ComponentFixture<HttpPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
