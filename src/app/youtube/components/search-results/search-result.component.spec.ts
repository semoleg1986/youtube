import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../redux/reducers';
import { SetCurrentPage, SetPageSize } from '../../../redux/actions/pagination.action';
import { PageStateService } from '../../services/page-state.service';
import { SortService } from '../../services/sort-service';
import { FilterService } from '../../services/filter.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortingPipe } from '../../pipes/sort.pipe';
import { youtubeReducer } from '../../../redux/reducers/youtube/youtube.reducer';
import { cardsReducer } from '../../../redux/reducers/card/card.reducer';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let store: Store<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, FilterPipe, SortingPipe],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cards', cardsReducer),
        StoreModule.forFeature('youtube', youtubeReducer), // Add your reducers here
      ],
      providers: [
        PageStateService,
        SortService,
        FilterService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should calculate total pages', () => {
    const lengthItems = 30;
    component.pageSize = 10;
    component.calculateTotalPages(lengthItems);
    expect(component.totalPages).toBe(3);
  });
  it('should change page size', () => {
    const pageSize = 10;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.changePageSize(pageSize);
    expect(dispatchSpy).toHaveBeenCalledWith(new SetPageSize(pageSize));
  });
  it('should change page', () => {
    const pageNumber = 2;
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.changePage(pageNumber);
    expect(dispatchSpy).toHaveBeenCalledWith(new SetCurrentPage(pageNumber));
  });
});
