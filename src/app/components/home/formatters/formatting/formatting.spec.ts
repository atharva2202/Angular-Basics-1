import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formatting } from './formatting';

describe('Formatting', () => {
  let component: Formatting;
  let fixture: ComponentFixture<Formatting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formatting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formatting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
