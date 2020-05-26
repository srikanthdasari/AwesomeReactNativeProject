import {BASE_URL, SECRET_TOKEN, PUBLIC_TOKEN} from './../constants/Endpoint';
import buildUrl from 'build-url';
import _ from 'lodash';

export class ServiceEndpoint {
  constructor(builder) {
    this.baseUrl = builder.baseUrl;
    this.endpoint = builder.endpoint;
    this.token = builder.token;
    this.params = builder.params;
    // this.query = builder.query;
  }

  getUrl = () => {
    // console.log(_.fromPairs(_.map(this.params, (i) => [i.key, i.value])));
    return buildUrl(this.baseUrl, {
      path: this.endpoint,
      queryParams: _.fromPairs(_.map(this.params, (i) => [i.key, i.value])),
    });
  };
}

export class UrlBuilder {
  constructor() {}

  setBaseUrl = () => {
    this.baseUrl = BASE_URL;
    return this;
  };
  setEndpoint = (_endpoint) => {
    this.endpoint = _endpoint;
    return this;
  };
  setSecretToken = () => {
    // this.token = SECRET_TOKEN;
    if (this.params) {
      this.params.push({key: 'token', value: SECRET_TOKEN});
    } else {
      this.params = [{key: 'token', value: SECRET_TOKEN}];
    }
    return this;
  };

  setPublicToken = () => {
    if (this.params) {
      this.params.push({key: 'token', value: PUBLIC_TOKEN});
    } else {
      this.params = [{key: 'token', value: PUBLIC_TOKEN}];
    }
    return this;
  };
  setCustomQuery = (key, value) => {
    if (this.params) {
      this.params.push({key: key, value: value});
    } else {
      this.params = [{key: key, value: value}];
    }
    return this;
  };

  build = () => {
    return new ServiceEndpoint(this); // .URL();
  };
}
