import { Component, Input } from '@angular/core';
import { VideoItem } from '../../models/search/search-item.model';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss'],
})
export class StaticsComponent {
  @Input() item!: VideoItem;
}
