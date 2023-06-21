import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../../models/course';

type Order = 'id' | 'title' | 'creationData' | 'duration' | 'description' | 'topRated';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(courses: ICourse[], order: Order): ICourse[] {
    return courses.sort((a, b) => {
      if (a[order] < b[order]) {
        return 1;
      }
      if (a[order] > b[order]) {
        return -1;
      }
      return 0;
    });
  }
}
