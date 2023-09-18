import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs';
import { ICourse } from '../../../../models/course';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAuthor } from '../../../../models/authors';
import { HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ICourseState } from '../../../../store/courses/reducers/courses.reducer';
import { saveCourse, updateCourse } from '../../../../store/courses/actions/courses.actions';

interface ICourseForm {
  id: FormControl<number | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  creationData: FormControl<Data | null>;
  duration: FormControl<number | null>;
  authors: FormControl<IAuthor[] | null>;
  topRated: FormControl<boolean | null>;
}

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpClientModule],
})
export class NewCourseComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new EventEmitter<void>();

  form = this.fb.group<ICourseForm>({
    id: this.fb.control(null),
    title: this.fb.control(null, {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    description: this.fb.control(null, {
      validators: [Validators.required, Validators.maxLength(500)],
    }),
    creationData: this.fb.control(new Date(), {
      validators: [Validators.required],
    }),
    duration: this.fb.control(null, {
      validators: [Validators.required, Validators.pattern('^[0-9]*$')],
    }),
    authors: this.fb.control(null, {
      validators: [Validators.required],
    }),
    topRated: this.fb.control(false),
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private readonly store: Store<ICourseState>,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        map(({ course }: { course: ICourse } | Data) => course),
        filter((course) => course),
        takeUntil(this.destroy$),
      )
      .subscribe((course) => {
        this.form.patchValue({
          ...course,
          creationData: new Date(course.creationData),
        });
      });
  }

  onCancel(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(): void {
    if (this.form.valid) {
      if (this.form.value.id) {
        this.store.dispatch(updateCourse({ course: this.form.value as ICourse }));
      } else {
        this.store.dispatch(saveCourse({ course: this.form.value as ICourse }));
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
