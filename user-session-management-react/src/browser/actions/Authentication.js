import {createAction, createReducer} from 'redux-act';
import AlfrescoApi from 'src/browser/services/AlfrescoApiBean';
import UserService from 'src/browser/services/ProfileService';
import {loadState, saveState} from 'src/browser/stores/LocalStorage';

const initialState = {
  firstName: 'Guest',
  lastName: 'Guest',
  fullName: 'Guest',
  isSigned: false,
  isAdmin: false,
  avatarUrl: '/assets/images/avatar-placeholder.png',
};

export const userLoggedIn = createAction('USER_LOGIN');
export const userLoggedOut = createAction('USER_LOGOUT');
export const userLoad = createAction('USER_LOAD');

export const loginUser = (username, password) => async dispatch => {
  await AlfrescoApi.login(username, password);
  const user = await UserService.getECMUser();
  if (user.isAdmin === true) {
    saveState('user', user);
    await dispatch(userLoggedIn(user));
  } else {
    AlfrescoApi.logout();
  }
};

export const logoutUser = () => async dispatch => {
  saveState('user', initialState);
  await AlfrescoApi.logout();
  await dispatch(userLoggedOut());
};

export const getUser = () => async dispatch => {
  const {user} = loadState('user');
  await dispatch(userLoad(user ? user : {}));
};

const authentication = createReducer(
  {
    [userLoggedIn]: (
      state,
      {firstName, lastName, fullName, isAdmin, avatarUrl},
    ) => ({
      ...state,
      firstName,
      lastName,
      fullName,
      isAdmin,
      isSigned: true,
      avatarUrl,
    }),
    [userLoggedOut]: () => initialState,
    [userLoad]: (
      state,
      {firstName, lastName, fullName, isAdmin, avatarUrl},
    ) => ({
      ...state,
      firstName,
      lastName,
      fullName,
      isAdmin,
      isSigned: true,
      avatarUrl,
    }),
  },
  initialState,
);

export default authentication;
