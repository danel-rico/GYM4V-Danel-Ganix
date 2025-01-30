import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddBarComponent } from './search-add-bar.component';

describe('SearchAddBarComponent', () => {
  let component: SearchAddBarComponent;
  let fixture: ComponentFixture<SearchAddBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAddBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAddBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
