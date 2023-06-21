import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBorderSet]',
})
export class BorderSetDirective implements AfterViewInit {
  @Input('appBorderSet') creationDate: Date = new Date();

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const [child] = this.elementRef.nativeElement.children;
    const date = new Date();
    const dateGetTime = date.getTime();
    const creationDateGetTime = this.creationDate.getTime();

    if (
      creationDateGetTime < dateGetTime &&
      creationDateGetTime >= new Date(date.setDate(date.getDate() - 14)).getTime()
    ) {
      this.renderer.setStyle(child, 'border', '1px solid #16A34A');
    } else if (creationDateGetTime > dateGetTime) {
      this.renderer.setStyle(child, 'border', '1px solid #2563eb');
    }
  }
}
