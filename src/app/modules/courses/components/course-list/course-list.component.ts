import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../../models/course';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CoursesService } from '../../../../services/courses.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass'],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];

  filterCourse: ICourse[] = this.courses;

  constructor(
    private filterPipe: FilterPipe,
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
        this.courses = this.coursesService.removeItem(id);
        this.filterCourse = this.courses;
      },
      rejectLabel: 'Отмена',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-text',
      reject: () => {},
    });
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
    this.filterCourse = this.courses;
  }

  loadMore(): void {
    console.log('loadMore');
  }

  onSearch(str: string): void {
    this.filterCourse = this.filterPipe.transform(this.courses, str);
  }

  createNew(): void {
    this.router.navigate(['/courses/new']);
  }
}
