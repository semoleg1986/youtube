import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SearchItemComponent } from './search-item.component';
import { Store, StoreModule } from '@ngrx/store';
import { PageStateService } from '../../services/page-state.service';
import { Router } from '@angular/router';


describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  let mockRouter: any;
  let mockStore: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockStore = {
      dispatch: jest.fn(),
      pipe: jest.fn(() => ({
        subscribe: jest.fn(),
      })),
    };

    await TestBed.configureTestingModule({
      declarations: [SearchItemComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        PageStateService,
        { provide: Router, useValue: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call detailPageById', () => {
    const videoId = 'exampleVideoId';
    component.detailPageById(videoId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['youtube', videoId]);
  });

  it('should call deleteCards', () => {
    const videoId = 'exampleVideoId';
    component.deleteCards(videoId);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: '[Admin] Delete Card',
      payload: { videoId },
    });
  });

  it('should call addToFavorites', () => {
    const videoId = 'exampleVideoId';
    component.addToFavorites(videoId);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: '[Youtube] Add to Favorites',
      payload: { videoId },
    });
  });

  it('should call removeFromFavorites', () => {
    const videoId = 'exampleVideoId';
    component.removeFromFavorites(videoId);
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: '[Youtube] Remove from Favorites',
      payload: { videoId },
    });
  });

});
