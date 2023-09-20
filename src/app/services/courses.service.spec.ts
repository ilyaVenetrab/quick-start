import { CoursesService } from './courses.service';
import { autoSpy, SpyOf } from '../utils/auto-spy';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { ICourse } from '../models/course';

function setup<T>(): {
  default: () => any;
  build: () => T;
  httpClient: SpyOf<HttpClient>;
  [key: string]: any;
} {
  const httpClient: SpyOf<HttpClient> = autoSpy(HttpClient);
  const builder = {
    httpClient,
    default(): any {
      return builder;
    },
    build(): any {
      return new CoursesService(httpClient);
    },
  };
  return builder;
}

describe('CoursesService', () => {
  let service: CoursesService;
  const { build, httpClient } = setup<CoursesService>();

  beforeEach(() => {
    service = build();
  });

  afterEach(() => {
    httpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses', () => {
    const expected: ICourse[] = [
      {
        id: 74,
        title: 'Sit voluptate eiusmod ea',
        creationData: new Date('Sat Jun 10 2023 00:00:00 GMT+0300'),
        duration: 135,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores.',
        topRated: true,
        authors: [
          {
            fullName: 'John Doe',
          },
          {
            fullName: 'Don Romer',
          },
        ],
      },
      {
        id: 83,
        title: 'Duis mollit reprehenderit ad11',
        creationData: new Date('2023-06-11T21:00:00.000Z'),
        duration: 23,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        topRated: false,
        authors: [
          {
            fullName: 'David Morrison',
          },
        ],
      },
    ];
    httpClient.get.and.returnValue(cold('-a', { a: expected }));

    expect(service.getList()).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.get).toHaveBeenCalledOnceWith(`/allCourses?_start=0&_limit=10&q=`);
  });

  it('should get course by id', () => {
    const expected: ICourse = {
      id: 74,
      title: 'Sit voluptate eiusmod ea',
      creationData: new Date('Sat Jun 10 2023 00:00:00 GMT+0300'),
      duration: 135,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores.',
      topRated: true,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
    };
    httpClient.get.and.returnValue(cold('-a', { a: expected }));

    expect(service.getItemById(expected.id)).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.get).toHaveBeenCalledOnceWith(`/allCourses/${expected.id}`);
  });

  it('should save new course', () => {
    const expected: ICourse = {
      id: 74,
      title: 'Sit voluptate eiusmod ea',
      creationData: new Date('Sat Jun 10 2023 00:00:00 GMT+0300'),
      duration: 135,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores.',
      topRated: true,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
    };
    httpClient.post.and.returnValue(cold('-a', { a: expected }));

    expect(service.saveItem(expected)).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.post).toHaveBeenCalledOnceWith(`/allCourses`, expected);
  });

  it('should update course', () => {
    const expected: ICourse = {
      id: 74,
      title: 'Sit voluptate eiusmod ea',
      creationData: new Date('Sat Jun 10 2023 00:00:00 GMT+0300'),
      duration: 135,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores.',
      topRated: true,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
    };
    httpClient.put.and.returnValue(cold('-a', { a: expected }));

    expect(service.updateItem(expected)).toBeObservable(cold('-a', { a: expected }));
    expect(httpClient.put).toHaveBeenCalledOnceWith(`/allCourses/${expected.id}`, expected);
  });

  it('should delete course', () => {
    const expected: ICourse = {
      id: 74,
      title: 'Sit voluptate eiusmod ea',
      creationData: new Date('Sat Jun 10 2023 00:00:00 GMT+0300'),
      duration: 135,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores.',
      topRated: true,
      authors: [
        {
          fullName: 'John Doe',
        },
        {
          fullName: 'Don Romer',
        },
      ],
    };
    httpClient.delete.and.returnValue(cold('-a', { a: null }));

    expect(service.removeItem(expected.id)).toBeObservable(cold('-a', { a: null }));
    expect(httpClient.delete).toHaveBeenCalledOnceWith(`/allCourses/${expected.id}`);
  });
});
