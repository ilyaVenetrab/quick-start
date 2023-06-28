import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../../../services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass'],
})
export class BreadcrumbsComponent {
  items: MenuItem[] = [];

  home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
    label: 'Курсы',
    iconStyle: { 'margin-right': '.5rem' },
  };

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.breadcrumbs$.subscribe((resp) => {
      this.items = resp;
    });
  }
}
