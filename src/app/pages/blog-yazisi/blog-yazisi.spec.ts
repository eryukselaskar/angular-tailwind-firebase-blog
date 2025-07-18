import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogYazisi } from './blog-yazisi';

describe('BlogYazisi', () => {
  let component: BlogYazisi;
  let fixture: ComponentFixture<BlogYazisi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogYazisi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogYazisi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
