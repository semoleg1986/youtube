import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './shared/components/base/base.component';
import { NotFoundComponent } from './core/pages/404/not-found/not-found.component';
import { AuthGuardService } from './auth/guard/auth.guard.service';
import { LoginGuardGuard } from './auth/guard/login.guard.service';
import { AdminComponent } from './core/pages/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [LoginGuardGuard],
      },
      {
        path: 'youtube',
        loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'favs',
        loadChildren: () => import('./favorite/favs.module').then((m) => m.FavsModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
