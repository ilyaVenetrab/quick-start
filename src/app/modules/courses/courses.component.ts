import { Component } from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
  providers: [FilterPipe],
})
export class CoursesComponent {}
