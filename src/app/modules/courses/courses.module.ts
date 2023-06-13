import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoreModule } from '../core/core.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { SearchComponent } from './components/search/search.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CourseItemComponent } from './components/course-item/course-item.component';

@NgModule({
  declarations: [CoursesComponent, SearchComponent, CourseItemComponent],
  imports: [
    CoursesRoutingModule,
    CommonModule,
    CoreModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
})
export class CoursesModule {}
