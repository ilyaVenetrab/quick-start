import { IState } from '../../index';
import * as authSelectors from './auth.selectors';

describe('Auth Selectors', () => {
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
    expect(authSelectors.selectAuth(state)).toEqual(state.auth.userInfo);
  });
});
