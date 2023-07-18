import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';
import { ICourse } from '../../../../models/course';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CoursesService } from '../../../../services/courses.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCourseComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new EventEmitter<void>();

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
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        map(({ course }: { course: ICourse } | Data) => course),
        filter((course) => course),
        takeUntil(this.destroy$),
      )
      .subscribe((course) => {
        this.course = course;
      });
  }

  durationChange(value: number) {
    this.course.duration = value;
  }

  onCancel(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(): void {
    this.coursesService.saveItem(this.course);
    this.router.navigateByUrl('/courses');
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
