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
import { BorderSetDirective } from './directives/border-set.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CoursesService } from '../../services/courses.service';

@NgModule({
  declarations: [
    CoursesComponent,
    SearchComponent,
    CourseItemComponent,
    BorderSetDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
  ],
  imports: [
    CoursesRoutingModule,
    CommonModule,
    CoreModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  providers: [CoursesService],
})
export class CoursesModule {}
