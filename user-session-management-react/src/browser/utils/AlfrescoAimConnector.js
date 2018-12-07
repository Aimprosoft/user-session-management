/* eslint-disable no-console */
import AlfrescoApi from 'src/browser/services/AlfrescoApiBean';

export default class AlfrescoAimConnector {
  static callGet(uri, pathParams, queryParams) {
    return this.call(uri, 'GET', {}, pathParams, queryParams);
  }

  static callDelete(uri, pathParams, queryParams) {
    return this.call(uri, 'DELETE', {}, pathParams, queryParams);
  }

  static call(
    uri,
    method,
    postBody = {},
    pathParams = {},
    queryParams = {},
    formParams = {},
    headerParams = {},
    authNames = {},
  ) {
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    return AlfrescoApi.discoveryClient
      .callCustomApi(
        uri,
        method,
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        {},
      )
      .then(response => response);
  }
}
