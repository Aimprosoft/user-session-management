import {loadState} from 'src/browser/stores/LocalStorage';

export const isSigned = () => {
  const {user} = loadState('user');
  return user && user.isSigned;
};
