
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FilterBlockComponent } from './filter-block.component';
import { FormsModule } from '@angular/forms';


describe('FilterBlockComponent', () => {
  let component: FilterBlockComponent;
  let fixture: ComponentFixture<FilterBlockComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterBlockComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(FilterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should handle Enter key press', fakeAsync(() => {
    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    jest.spyOn(console, 'log');
    component.handleKeyboardEvent(keyboardEvent);
    tick();

    expect(console.log).toHaveBeenCalledWith('Enter key was pressed');
  }));

});
