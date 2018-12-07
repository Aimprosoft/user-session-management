import store from 'src/browser/stores/LocalStorage';
import {logoutUser} from 'src/browser/actions/Authentication';

export const handleRepositoryError = ({status}) => {
  if (status && status === 401) {
    store.dispatch(logoutUser());
  }
};
