import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoreModule } from '../core/core.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { SearchComponent } from './components/search/search.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { BorderSetDirective } from './directives/border-set.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesService } from '../../services/courses.service';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DurationCourseComponent } from './components/new-course/duration-course/duration-course.component';
import { AuthorsComponent } from './components/new-course/authors/authors.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UpdateCourseResolver } from './components/new-course/update-course.resolver';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    CoursesComponent,
    SearchComponent,
    CourseItemComponent,
    BorderSetDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    CourseListComponent,
    NewCourseComponent,
    DurationCourseComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CoursesRoutingModule,
    CardModule,
    InputTextareaModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  providers: [CoursesService, UpdateCourseResolver],
})
export class CoursesModule {}
