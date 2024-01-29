import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AngularModule } from '../material/angular/angular.module';
import { IconComponent } from '../youtube/components/icon/icon.component';
import { FilterBlockComponent } from './components/filter-block/filter-block.component';
import { NotFoundComponent } from './pages/404/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    FilterBlockComponent,
    NotFoundComponent,
    AdminComponent,
  ],
  imports: [CommonModule, AngularModule, FormsModule, IconComponent, SharedModule, ReactiveFormsModule, AppRoutingModule, MatSnackBarModule],
  exports: [
    HeaderComponent,
    FilterBlockComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {}
