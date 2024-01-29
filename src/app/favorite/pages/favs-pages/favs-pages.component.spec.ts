import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsPagesComponent } from './favs-pages.component';

describe('FavsPagesComponent', () => {
  let component: FavsPagesComponent;
  let fixture: ComponentFixture<FavsPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavsPagesComponent]
    });
    fixture = TestBed.createComponent(FavsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
