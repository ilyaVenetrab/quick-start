import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { CoursesService } from '../../../../services/courses.service';
import { ICourse } from '../../../../models/course';

@Injectable()
export class UpdateCourseResolver implements Resolve<ICourse | null> {
  constructor(private readonly router: Router, private readonly coursesService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse | null> {
    return of(this.coursesService.getItemById(Number(route.paramMap.get('courseId')))).pipe(
      map((course: ICourse | null) => {
        if (!course) {
          this.router.navigate(['/courses']);
        }
        return course;
      }),
      catchError(() => {
        this.router.navigate(['/courses']);
        return of(null);
      }),
    );
  }
}
