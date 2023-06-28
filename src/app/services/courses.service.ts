import { Injectable } from '@angular/core';
import { ICourse } from '../models/course';

@Injectable()
export class CoursesService {
  list: ICourse[] = [
    {
      id: 1,
      title: 'Reprehenderit est veniam elit',
      creationData: new Date(2023, 3, 28),
      duration: 360,
      description:
        'Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.',
      topRated: true,
    },
    {
      id: 2,
      title: 'Мagna Excepteur aute Deserunt',
      creationData: new Date(2023, 1, 22),
      duration: 223,
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      topRated: false,
    },
    {
      id: 3,
      title: 'Reprehenderit eiusmod nostrud amet',
      creationData: new Date(2023, 6, 3),
      duration: 82,
      description:
        'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      topRated: false,
    },
    {
      id: 4,
      title: 'Sit voluptate eiusmod ea',
      creationData: new Date(2023, 5, 10),
      duration: 35,
      description:
        'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
      topRated: true,
    },
    {
      id: 5,
      title: 'Duis mollit reprehenderit ad',
      creationData: new Date(2023, 5, 12),
      duration: 223,
      description:
        'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      topRated: false,
    },
  ];

  getList(): ICourse[] {
    return this.list;
  }

  createCourse() {}

  getItemById(id: number): ICourse | null {
    const entity = this.list.filter((i) => i.id === id);
    return entity.length ? entity[0] : null;
  }

  saveItem(entity: ICourse) {
    const indexOf = this.list.findIndex((q) => q.id === entity.id);

    if (indexOf > -1) {
      this.list[indexOf] = entity;
    } else {
      this.list.push(entity);
    }
  }

  removeItem(id: number): ICourse[] {
    this.list = this.list.filter((i) => i.id !== id);
    return this.list;
  }
}
