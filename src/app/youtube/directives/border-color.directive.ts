import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
})
export class BorderColorDirective implements OnInit {
  @Input('appBorderColor') item!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private readonly RED_THRESHOLD = 180;

  private readonly YELLOW_THRESHOLD = 30;

  private readonly GREEN_THRESHOLD = 7;

  private readonly RED_COLOR = '#FF0000';

  private readonly YELLOW_COLOR = '#FFFF00';

  private readonly GREEN_COLOR = '#00FF00';

  private readonly DEFAULT_COLOR = '#0000FF';

  ngOnInit() {
    if (this.item) {
      const publishedAt = new Date(this.item);
      const currentDate = new Date();
      const differenceInDays = (currentDate.getTime() - publishedAt.getTime()) / (1000 * 3600 * 24);

      if (differenceInDays > this.RED_THRESHOLD) {
        this.el.nativeElement.style.borderBottom = `5px solid ${this.RED_COLOR}`;
      } else if (differenceInDays > this.YELLOW_THRESHOLD && differenceInDays <= this.RED_THRESHOLD) {
        this.el.nativeElement.style.borderBottom = `5px solid ${this.YELLOW_COLOR}`;
      } else if (differenceInDays > this.GREEN_THRESHOLD && differenceInDays <= this.YELLOW_THRESHOLD) {
        this.el.nativeElement.style.borderBottom = `5px solid ${this.GREEN_COLOR}`;
      } else {
        this.el.nativeElement.style.borderBottom = `5px solid ${this.DEFAULT_COLOR}`;
      }
    }
  }
}
