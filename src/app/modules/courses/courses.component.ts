import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];

  editCourse(entity: ICourse): void {
    console.log('editCourse ==> ', entity);
  }

  deleteCourse(id: number): void {
    console.log('deleteCourse ==> ', id);
  }

  ngOnInit(): void {
    this.courses = [
      {
        id: 1,
        title: 'Reprehenderit est veniam elit',
        creationData: new Date(),
        duration: 223,
        description:
          'Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.',
      },
      {
        id: 2,
        title: 'Мagna Excepteur aute Deserunt',
        creationData: new Date(),
        duration: 223,
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: 3,
        title: 'Reprehenderit eiusmod nostrud amet',
        creationData: new Date(),
        duration: 223,
        description:
          'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
      },
      {
        id: 4,
        title: 'Sit voluptate eiusmod ea',
        creationData: new Date(),
        duration: 223,
        description:
          'Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.',
      },
      {
        id: 5,
        title: 'Duis mollit reprehenderit ad',
        creationData: new Date(),
        duration: 223,
        description:
          'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      },
    ];
  }

  loadMore(): void {
    console.log('loadMore');
  }
}
