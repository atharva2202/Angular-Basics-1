import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formatters } from './formatters';

describe('Formatters', () => {
  let component: Formatters;
  let fixture: ComponentFixture<Formatters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formatters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formatters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
