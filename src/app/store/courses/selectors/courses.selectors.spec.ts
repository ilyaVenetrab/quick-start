import { IState } from '../../index';
import * as courseSelectors from './courses.selectors';

describe('Courses Selectors', () => {
  const state: IState = {
    auth: {
      userInfo: {
        token: '442738TC23',
        fullName: 'Бильбо Бэггинс',
      },
      isLoading: false,
    },
    courses: {
      isLoading: false,
      courses: [
        {
          id: 1,
          title: 'Test Course',
          creationData: new Date(),
          duration: 100,
          description: 'Test description',
          topRated: true,
        },
      ],
    },
    router: {} as any,
  } as unknown as IState;

  it('should select the feature state', () => {
    expect(courseSelectors.selectCourses(state)).toEqual(state.courses.courses);
  });
});
