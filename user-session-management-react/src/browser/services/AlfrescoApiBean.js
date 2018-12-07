import AlfrescoApi from 'alfresco-js-api';
import {handleRepositoryError} from 'src/browser/utils/ErrorHandler';

const alfrescoApi = new AlfrescoApi({hostEcm: 'http://localhost:8080'});
alfrescoApi.ecmClient.on('error', handleRepositoryError);
alfrescoApi.discoveryClient.on('error', handleRepositoryError);

export default alfrescoApi;
