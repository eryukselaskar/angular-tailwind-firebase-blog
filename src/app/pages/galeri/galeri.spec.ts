import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Galeri } from './galeri';

describe('Galeri', () => {
  let component: Galeri;
  let fixture: ComponentFixture<Galeri>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Galeri]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Galeri);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
