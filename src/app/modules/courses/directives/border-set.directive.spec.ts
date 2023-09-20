import { BorderSetDirective } from './border-set.directive';
import { ElementRef, Renderer2 } from '@angular/core';
function setup<T>(): { default: () => any; build: () => T; [key: string]: any } {
  const element = { nativeElement: { children: [{}] } } as ElementRef;
  const renderer = { setStyle: jasmine.createSpy('setStyle') } as unknown as Renderer2;
  const builder = {
    renderer,
    element,
    default(): any {
      return builder;
    },
    build(): any {
      return new BorderSetDirective(element, renderer);
    },
  };
  return builder;
}
describe('BorderSetDirective', () => {
  let directive: BorderSetDirective;
  const { build, renderer } = setup<BorderSetDirective>();

  beforeEach(() => {
    directive = build();
  });

  afterEach(() => {
    renderer.setStyle.calls.reset();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have green border', () => {
    directive.creationDate = new Date('2023-09-11T21:00:00.000Z');
    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith({}, 'border', '1px solid #16A34A');
  });

  it('should have blue border', () => {
    directive.creationDate = new Date('2023-12-11T21:00:00.000Z');
    directive.ngAfterViewInit();

    expect(renderer.setStyle).toHaveBeenCalledOnceWith({}, 'border', '1px solid #2563eb');
  });
});
