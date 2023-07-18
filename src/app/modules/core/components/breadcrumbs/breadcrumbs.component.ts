import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass'],
})
export class BreadcrumbsComponent {
  items$: Observable<MenuItem[]> = this.breadcrumbService.breadcrumbs$;

  home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
    label: 'Курсы',
    iconStyle: { 'margin-right': '.5rem' },
  };

  constructor(private readonly breadcrumbService: BreadcrumbService) {}
}
