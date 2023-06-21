import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = '';

    if (hours > 0) {
      result += `${hours} h `;
    }

    if (minutes > 0) {
      result += `${minutes} min`;
    }

    return result;
  }
}
