import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NewCourseComponent } from './components/new-course/new-course.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses/list',
  },
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'list',
        component: CourseListComponent,
      },
      {
        path: 'new',
        component: NewCourseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
