import { Component, OnInit } from '@angular/core';
import {
  FormArray, FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { imgPattern, videoPattern } from '../../../config/types';
import { DateValidators } from '../../utils/date-validators';
import { Store, select } from '@ngrx/store';
import { AdminFormData } from '../../../youtube/models/admin.model';
import { Observable } from 'rxjs';
import { selectCards } from '../../../redux/selectors/card.selectors';
import { addCard } from '../../../redux/actions/card.action';
import { VideoItem } from '../../../youtube/models/search/search-item.model';
import { NoticeService } from '../../../youtube/services/notice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  AdminForm!: FormGroup;
  public cards$: Observable<VideoItem[]>;

  constructor(
    private form: FormBuilder, 
    public store$: Store<AdminFormData[]>, 
    private notice: NoticeService
  ) {
    this.cards$ = this.store$.pipe(select(selectCards))
  }

  onSubmit() {
    if (this.AdminForm.valid) {
      const cardData: VideoItem = this.preparedValuesCustomCard(this.AdminForm.value) 
      this.store$.dispatch(new addCard({ card: cardData}))
      this.AdminForm.reset();   
      this.notice.showSuccess('Successfully added card!');
    }

  }

  preparedValuesCustomCard(formValue: AdminFormData): VideoItem {
    const uniqueId = uuidv4();
    const dateValue: string = formValue.date;
    const date: Date = new Date(Date.parse(dateValue));
    const { tags, title, description, date: publishedAt, img } = formValue;
  
    const thumbnails = {
      default: { url: img, width: 120, height: 90 },
      medium: { url: img, width: 320, height: 180 },
      high: { url: img, width: 480, height: 360 },
      standard: { url: img, width: 640, height: 480 },
      maxres: { url: img, width: 1280, height: 720 },
    };
  
    const snippet = {
      tags: tags,
      title,
      description: description || 'None',
      publishedAt: date.toISOString(), 
      thumbnails: thumbnails,
    };
  
    return {
      id: uniqueId,
      custom: true,
      snippet,
    };
  }
  
  ngOnInit(): void {
    this.AdminForm = this.form.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.maxLength(255)],
      img: ['', [Validators.required, Validators.pattern(imgPattern)]],
      video: ['', [Validators.required, Validators.pattern(videoPattern)]],
      date: ['', [Validators.required, DateValidators.notFuture()]],
      tags: this.form.array([this.createTagFormControl()]),
    });
  }

  getTitleError(error: string) {
    return this.AdminForm.get('title')?.errors?.[error];
  }

  getDescriptionError(error: string) {
    return this.AdminForm.get('description')?.errors?.[error];
  }

  getImgError(error: string) {
    return this.AdminForm.get('img')?.errors?.[error];
  }

  getLinkError(error: string) {
    return this.AdminForm.get('video')?.errors?.[error];
  }

  getDateError(error: string) {
    return this.AdminForm.get('date')?.errors?.[error];
  }

  createTagFormControl(): FormGroup {
    return this.form.group({
      tag: ['', [Validators.required]],
    });
  }

  get tags(): FormArray {
    return this.AdminForm.get('tags') as FormArray;
  }

  addTagInput(event: Event): void {
    if (this.tags.length < 5) {
      this.tags.push(this.createTagFormControl());
    }
    event.preventDefault();
  }

  removeTagInput(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  resetForm(): void {
    this.AdminForm.reset();
  }
}
