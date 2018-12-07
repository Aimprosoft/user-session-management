import AlfrescoAimConnector from 'src/browser/utils/AlfrescoAimConnector';
import {
  GET_ACTIVITY_BY_DEVICES,
  GET_ACTIVITY_BY_DAY,
} from 'src/browser/constants/ApiURI';

class ReportService {
  getActivityByDevices() {
    return AlfrescoAimConnector.callGet(GET_ACTIVITY_BY_DEVICES, {});
  }

  getActivityByDay() {
    return AlfrescoAimConnector.callGet(GET_ACTIVITY_BY_DAY, {});
  }
}

export default new ReportService();
