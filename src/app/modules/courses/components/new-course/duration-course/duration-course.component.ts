import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-duration-course',
  templateUrl: './duration-course.component.html',
  styleUrls: ['./duration-course.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DurationCourseComponent,
    },
  ],
})
export class DurationCourseComponent implements ControlValueAccessor {
  quantity = 0;

  touched = false;

  onChange = (_quantity: number) => {};

  onTouched = () => {};

  changeQuantity(event: number) {
    this.markAsTouched();
    this.onChange(event);
  }

  writeValue(quantity: number): void {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
