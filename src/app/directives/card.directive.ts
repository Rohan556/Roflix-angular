import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { ZoomDirective } from './zoom.directive';

@Directive({
  selector: '[appCard]',
  hostDirectives: [
    {
      directive: ZoomDirective,
      inputs: ['scaleFactor'],
    },
  ],
  standalone: true,
})
export class CardDirective {
  @Input() elevation = 1;
  @Input() blur = 10;
  @Input() opacity = 0.15;

  @HostBinding('style.borderRadius') borderRadius = '12px';
  @HostBinding('style.transition') transition =
    'transform 0.2s ease, box-shadow 0.2s ease';
  @HostBinding('style.cursor') cursor = 'pointer';

  constructor(private el: ElementRef) {
    this.setShadow(this.elevation);

    this.applyBaseStyles();
  }

  private applyBaseStyles() {
    const el = this.el.nativeElement;

    el.style.background = `rgba(255, 255, 255, ${this.opacity})`;
    el.style.backdropFilter = `blur(${this.blur}px)`;
    el.style.webkitBackdropFilter = `blur(${this.blur}px)`;
    el.style.border = '1px solid rgba(255, 255, 255, 0.25)';
    el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.35)';
    el.style.padding = '16px';
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setShadow(this.elevation + 6);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1)';
    this.setShadow(this.elevation);
  }

  private setShadow(level: number) {
    this.el.nativeElement.style.boxShadow = `0 ${level}px ${level * 4}px rgba(0,0,0,0.25)`;
  }
}
