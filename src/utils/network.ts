import axios, { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import http from 'http';

export class Network {
  baseUrl = '';
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  public async get(path: string, headers?: AxiosRequestHeaders, params?: any ,options?: any) {
    const response = await axios.get(this.baseUrl + path, {
      headers,
      params,
      ...options,
    });

    return response;
  }
}
