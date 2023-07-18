import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    BreadcrumbsComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, ButtonModule, CardModule, RouterModule, BreadcrumbModule],
  exports: [HeaderComponent, FooterComponent, BreadcrumbsComponent],
})
export class CoreModule {}
