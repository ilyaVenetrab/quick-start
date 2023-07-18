import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, takeUntil } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnDestroy {
  private readonly _breadcrumbs$ = new BehaviorSubject<MenuItem[]>([]);

  private readonly destroy$ = new EventEmitter<void>();

  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((_event) => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: MenuItem[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot | null,
    parentUrl: string[],
    breadcrumbs: MenuItem[],
  ) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      if (route.data['breadcrumb']) {
        const menuItem = {
          label: this.getLabel(route.data),
          // url: '/' + routeUrl.join('/'),
          disabled: true,
          styleClass: 'opacity-100',
        };
        breadcrumbs.push(menuItem);
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data): string {
    return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
