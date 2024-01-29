import { Component } from '@angular/core';
import { SearchResultService } from '../../services/search-result.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private service: SearchResultService) {}
}
