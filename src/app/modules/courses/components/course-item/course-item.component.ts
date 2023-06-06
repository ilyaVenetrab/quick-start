import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from '../../../../models/course';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.sass'],
})
export class CourseItemComponent {
  @Input()
  course: ICourse = {} as ICourse;

  @Output()
  edit: EventEmitter<ICourse> = new EventEmitter<ICourse>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.course);
  }

  onDelete(): void {
    this.delete.emit(this.course.id);
  }
}
