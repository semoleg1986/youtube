import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { SortingPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component';
import { StaticsComponent } from './components/statics/statics.component';
import { BorderColorDirective } from './directives/border-color.directive';
import { ShadowColorDirective } from './directives/shadow-color.directive';
import { SharedModule } from '../shared/shared.module';
import { YoutubeRoutingModule } from './youtube-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    StaticsComponent,
    SearchResultsComponent,
    SearchItemComponent,
    SortingPipe,
    FilterPipe,
    MainComponent,
    DetailComponent,
    BorderColorDirective,
    ShadowColorDirective,
  ],
  imports: [CommonModule, SharedModule, YoutubeRoutingModule, MatSnackBarModule],
  providers: [],
  exports: [BorderColorDirective, StaticsComponent]
})
export class YoutubeModule { }
