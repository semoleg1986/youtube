import {
  Directive, ElementRef, Input, OnInit, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appShadowColor]',
})
export class ShadowColorDirective implements OnInit {
  @Input('appShadowColor') item!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private readonly RED_THRESHOLD = 180;

  private readonly YELLOW_THRESHOLD = 30;

  private readonly GREEN_THRESHOLD = 7;

  private readonly RED_COLOR = '5px 10px 10px 0px rgba(255, 0, 0, 0.25)';

  private readonly YELLOW_COLOR = '5px 10px 10px 0px rgba(255, 255, 0, 0.25)';

  private readonly GREEN_COLOR = '5px 10px 10px 0px rgba(0, 255, 0, 0.25)';

  private readonly DEFAULT_COLOR = '5px 10px 10px 0px rgba(0, 0, 255, 0.25)';

  ngOnInit() {
    if (this.item) {
      const publishedAt = new Date(this.item);
      const currentDate = new Date();
      const differenceInDays = (currentDate.getTime() - publishedAt.getTime()) / (1000 * 3600 * 24);

      if (differenceInDays > this.RED_THRESHOLD) {
        this.el.nativeElement.style.boxShadow = this.RED_COLOR;
      } else if (differenceInDays > this.YELLOW_THRESHOLD && differenceInDays <= this.RED_THRESHOLD) {
        this.el.nativeElement.style.boxShadow = this.YELLOW_COLOR;
      } else if (differenceInDays > this.GREEN_THRESHOLD && differenceInDays <= this.YELLOW_THRESHOLD) {
        this.el.nativeElement.style.boxShadow = this.GREEN_COLOR;
      } else {
        this.el.nativeElement.style.boxShadow = this.DEFAULT_COLOR;
      }
    }
  }
}
