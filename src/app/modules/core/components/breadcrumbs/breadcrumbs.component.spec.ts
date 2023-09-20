import { BreadcrumbsComponent } from './breadcrumbs.component';
import { autoSpy, SpyOf } from '../../../../utils/auto-spy';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

function setup<T>(): {
  default: () => any;
  build: () => T;
  [key: string]: any;
} {
  const breadcrumbService: SpyOf<BreadcrumbService> = autoSpy(BreadcrumbService);
  const builder = {
    default(): any {
      return builder;
    },
    build(): any {
      return new BreadcrumbsComponent(breadcrumbService);
    },
  };
  return builder;
}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  const { build } = setup<BreadcrumbsComponent>();

  beforeEach(() => {
    component = build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
