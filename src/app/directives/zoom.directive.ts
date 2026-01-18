import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appZoom]',
  standalone: true,
})
export class ZoomDirective {
  @Input() scaleFactor: number = 1.1;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.setTransition();
  }

  private setTransition() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.3s ease-in-out',
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `scale(${this.scaleFactor})`,
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
