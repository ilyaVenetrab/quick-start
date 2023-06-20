import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-duration-course',
  templateUrl: './duration-course.component.html',
  styleUrls: ['./duration-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationCourseComponent {
  @Input()
  value = 0;

  @Output()
  changeValue: EventEmitter<number> = new EventEmitter<number>();

  onChange(value: number): void {
    this.changeValue.emit(value);
  }
}
