import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { BaseComponent } from './components/base/base.component';
import { IconComponent } from '../youtube/components/icon/icon.component';
import { AngularModule } from '../material/angular/angular.module';

@NgModule({
  declarations: [CustomButtonComponent, BaseComponent],
  imports: [CommonModule, RouterModule, IconComponent, AngularModule, FormsModule],
  exports: [CustomButtonComponent, IconComponent, AngularModule, FormsModule],
})
export class SharedModule {}
