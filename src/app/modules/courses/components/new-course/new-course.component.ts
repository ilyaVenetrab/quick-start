import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map } from 'rxjs';
import { ICourse } from '../../../../models/course';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CoursesService } from '../../../../services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCourseComponent {
  course: ICourse = {
    id: 0,
    title: '',
    description: '',
    creationData: new Date(),
    duration: 0,
    topRated: false,
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
  ) {
    this.activatedRoute.data
      .pipe(
        map(({ course }: { course: ICourse } | Data) => course),
        filter((course) => course),
      )
      .subscribe((course) => {
        this.course = {
          ...course,
          creationData: new Date(course.creationData),
        };
      });
  }

  durationChange(value: number) {
    this.course.duration = value;
  }

  onCancel(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(): void {
    if (this.course.id === 0) {
      this.coursesService.saveItem(this.course).subscribe(() => {
        this.router.navigateByUrl('/courses');
      });
    } else {
      this.coursesService.updateItem(this.course).subscribe(() => {
        this.router.navigateByUrl('/courses');
      });
    }
  }
}
