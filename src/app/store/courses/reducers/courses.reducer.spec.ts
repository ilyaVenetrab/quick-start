import { reducer, initialState } from './courses.reducer';
import * as courseActions from '../actions/courses.actions';
import { ICourse } from '../../../models/course';

describe('Courses Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  it('should update state on getCourses | deleteCourse | updateCourse', () => {
    const expected = { ...initialState, isLoading: true };
    const getCourses = courseActions.getCourses({});
    const deleteCourse = courseActions.deleteCourse({ id: 1 });
    const updateCourse = courseActions.updateCourse({
      course: {
        id: 6,
        title: 'Lorem ipsum dolor sit.',
        description:
          'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
        creationData: new Date('2023-06-30T21:00:00.000Z'),
        duration: 82,
        authors: [
          {
            fullName: 'David Morrison',
          },
        ],
        topRated: false,
      },
    });

    expect(reducer(initialState, getCourses)).toEqual(expected);
    expect(reducer(initialState, deleteCourse)).toEqual(expected);
    expect(reducer(initialState, updateCourse)).toEqual(expected);
  });

  it('should update state on getCoursesSuccess', () => {
    const courses: ICourse[] = [
      {
        id: 6,
        title: 'Lorem ipsum dolor sit.',
        description:
          'Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.',
        creationData: new Date('2023-06-30T21:00:00.000Z'),
        duration: 82,
        authors: [
          {
            fullName: 'David Morrison',
          },
        ],
        topRated: false,
      },
    ];
    const prevState = { ...initialState, isLoading: true };
    const expected = { ...initialState, isLoading: false, courses };
    expect(reducer(prevState, courseActions.getCoursesSuccess({ data: courses }))).toEqual(
      expected,
    );
  });
});
