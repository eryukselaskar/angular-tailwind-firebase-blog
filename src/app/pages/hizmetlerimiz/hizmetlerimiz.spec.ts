import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hizmetlerimiz } from './hizmetlerimiz';

describe('Hizmetlerimiz', () => {
  let component: Hizmetlerimiz;
  let fixture: ComponentFixture<Hizmetlerimiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hizmetlerimiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hizmetlerimiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
