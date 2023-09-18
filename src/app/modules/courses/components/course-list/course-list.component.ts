import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from '../../../../models/course';
import { CoursesService } from '../../../../services/courses.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ICourseState } from '../../../../store/courses/reducers/courses.reducer';
import { Store } from '@ngrx/store';
import { deleteCourse, getCourses } from '../../../../store/courses/actions/courses.actions';
import { selectCourses } from '../../../../store/courses/selectors/courses.selectors';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new EventEmitter<void>();

  courses$: Observable<ICourse[]> = this.store.select(selectCourses);

  filterSearch: Subject<string> = new Subject<string>();

  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private readonly store: Store<ICourseState>,
  ) {
    this.filterSearch
      .pipe(
        filter((str) => !str || str.length > 3),
        debounceTime(250),
        takeUntil(this.destroy$),
      )
      .subscribe((search) => {
        this.store.dispatch(getCourses({ limit: 10, search }));
      });
  }

  editCourse(entity: ICourse): void {
    this.router.navigateByUrl('/courses/' + entity.id);
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: 'Удалить курс?',
      message: 'Вы действительно хотите удалить этот курс?',
      acceptLabel: 'Удалить',
      acceptIcon: 'pi',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.store.dispatch(deleteCourse({ id }));
      },
      rejectLabel: 'Отмена',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text',
      reject: () => {},
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getCourses({}));
  }

  loadMore(): void {
    this.store.dispatch(getCourses({}));
  }

  onSearch(str: string): void {
    this.filterSearch.next(str);
  }

  createNew(): void {
    this.router.navigate(['/courses/new']);
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
