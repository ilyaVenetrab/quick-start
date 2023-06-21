import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../../models/course';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: ICourse[], text: string): ICourse[] {
    return courses.filter((i) => {
      return i.title.toLowerCase().indexOf(text.trim().toLowerCase()) >= 0;
    });
  }
}
