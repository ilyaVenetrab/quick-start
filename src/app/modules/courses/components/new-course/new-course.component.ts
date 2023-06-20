import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCourseComponent {
  name = '';

  description = '';

  date = '';

  duration = 0;

  durationChange(value: number) {
    this.duration = value;
  }

  onCancel(): void {}

  onSave(): void {
    console.log(this.name, this.description, this.date, this.duration);
  }
}
