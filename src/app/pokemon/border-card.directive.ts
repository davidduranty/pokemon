import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmonBorderCard]'
})
export class BorderCardDirective {

  initialColor: string = "#f5f5f5";
  defaultColor: string = "teal";
  defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight)
    this.survol(this.initialColor)
  }

  @Input('pkmonBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.survol(this.borderColor || this.defaultColor)
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.survol(this.initialColor)
  }
  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`
  }
  survol(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`
  }
}
