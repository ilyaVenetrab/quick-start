import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../../models/course';
import { CoursesService } from '../../../../services/courses.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { debounceTime, Subject, take } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass'],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];

  loadMoreDisabled = false;

  filterSearch: Subject<string> = new Subject<string>();

  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {
    this.filterSearch
      .pipe(
        filter((str) => !str || str.length > 3),
        debounceTime(250),
      )
      .subscribe((search) => {
        this.loadData(10, search);
      });
  }

  editCourse(entity: ICourse): void {
    this.router.navigateByUrl('/courses/' + entity.id);
  }

  deleteCourse(id: number): void {
    this.confirmationService.confirm({
      header: 'Удалить курс?',
      message: 'Вы действительно хотите удалить этот курс?',
      acceptLabel: 'Удалить',
      acceptIcon: 'pi',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.coursesService.removeItem(id).subscribe(() => {
          this.loadData();
        });
      },
      rejectLabel: 'Отмена',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text',
      reject: () => {},
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(count = 10, search = ''): void {
    this.coursesService
      .getList(count, search)
      .pipe(take(1))
      .subscribe((course) => {
        this.courses = course;

        this.loadMoreDisabled = this.courses.length >= count;
      });
  }

  loadMore(): void {
    this.loadData(this.courses.length + 10);
  }

  onSearch(str: string): void {
    this.filterSearch.next(str);
  }

  createNew(): void {
    this.router.navigate(['/courses/new']);
  }
}
