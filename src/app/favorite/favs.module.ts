import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavsPagesComponent } from './pages/favs-pages/favs-pages.component';
import { FavsRoutingModule } from './favs-routing.resolver';
import { FavsResultComponent } from './components/favs-result/favs-result.component';
import { FavsItemComponent } from './components/favs-item/favs-item.component';
import { YoutubeModule } from '../youtube/youtube.module';
import { BorderColorDirective } from '../youtube/directives/border-color.directive';
import { StaticsComponent } from '../youtube/components/statics/statics.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FavsPagesComponent,
    FavsResultComponent,
    FavsItemComponent,
  ],
  imports: [
    FavsRoutingModule,
    CommonModule,
    YoutubeModule,
    SharedModule,
  ]
})
export class FavsModule { }
