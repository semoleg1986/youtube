import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FavsPagesComponent } from './pages/favs-pages/favs-pages.component';

const routes: Routes = [
  {
    path: '',
    component: FavsPagesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavsRoutingModule {}
