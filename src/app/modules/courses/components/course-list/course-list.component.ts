import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../../models/course';
import { CoursesService } from '../../../../services/courses.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass'],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];

  loadMoreDisabled = false;

  filterSearch = '';

  constructor(
    private coursesService: CoursesService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

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

  loadData(count = 10): void {
    this.coursesService
      .getList(count, this.filterSearch)
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
    this.filterSearch = str;
    this.loadData();
  }

  createNew(): void {
    this.router.navigate(['/courses/new']);
  }
}
