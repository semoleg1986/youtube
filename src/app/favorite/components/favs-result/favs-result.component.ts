import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../redux/reducers';
import { selectFavs } from '../../../redux/selectors/common.selectors';

@Component({
  selector: 'app-favs-result',
  templateUrl: './favs-result.component.html',
  styleUrls: ['./favs-result.component.scss']
})
export class FavsResultComponent {
  favoriteCards$ = this.store.pipe(select(selectFavs));

  constructor(private store: Store<State>) {}
}
