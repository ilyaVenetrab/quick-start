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
});
