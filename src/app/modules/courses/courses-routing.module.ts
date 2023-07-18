import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { UpdateCourseResolver } from './components/new-course/update-course.resolver';
import { ICourse } from '../../models/course';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: CourseListComponent,
      },
      {
        path: 'new',
        component: NewCourseComponent,
        data: { breadcrumb: 'Новый курс' },
      },
      {
        path: ':courseId',
        component: NewCourseComponent,
        resolve: {
          course: UpdateCourseResolver,
        },
        data: { breadcrumb: ({ course }: { course: ICourse }) => `${course.title}` },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
