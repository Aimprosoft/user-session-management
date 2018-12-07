/* eslint-disable no-console */
import AlfrescoApi from 'src/browser/services/AlfrescoApiBean';
import AlfrescoAimConnector from 'src/browser/utils/AlfrescoAimConnector';
import {
  DELETE_USER_SESSION,
  GET_ACTIVE_USERS,
} from 'src/browser/constants/ApiURI';

class ProfileService {
  getECMUser() {
    return AlfrescoApi.core.peopleApi.getPerson('-me-').then(({entry}) => {
      const isAdmin = entry.capabilities
        ? entry.capabilities.isAdmin
        : entry.id === 'admin';
      return {
        userName: entry.id,
        firstName: entry.firstName || '',
        lastName: entry.lastName || '',
        fullName: (entry.firstName || '') + ' ' + (entry.lastName || ''),
        isAdmin: isAdmin,
        isSigned: true,
        avatarUrl: this.getUserAvatar(entry.avatarId),
      };
    });
  }

  getUsers(status) {
    let result;
    switch (status) {
      case 'active':
        result = this.getActiveUsers();
        break;
      case 'all':
      default:
        result = AlfrescoApi.core.peopleApi
          .getPersons()
          .then(({list}) =>
            list.entries
              .filter(({entry}) => entry.enabled)
              .map(({entry}) => entry),
          );
        break;
    }
    return result;
  }

  getUserAvatar(avatarId) {
    return avatarId
      ? AlfrescoApi.content.getContentUrl(avatarId)
      : '/assets/images/avatar-placeholder.png';
  }

  getActiveUsers() {
    return AlfrescoAimConnector.callGet(GET_ACTIVE_USERS).then(
      ({users}) => users,
    );
  }

  closeSession(userId) {
    return AlfrescoAimConnector.callDelete(DELETE_USER_SESSION, {id: userId});
  }
}

export default new ProfileService();
