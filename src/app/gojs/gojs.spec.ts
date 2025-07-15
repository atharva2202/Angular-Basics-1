import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gojs } from './gojs';

describe('Gojs', () => {
  let component: Gojs;
  let fixture: ComponentFixture<Gojs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gojs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gojs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
