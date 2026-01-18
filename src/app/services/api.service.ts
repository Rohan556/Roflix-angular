import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH, API } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  header!: HttpHeaders;
  endpoint!: string;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${AUTH.TOKEN}`,
    });

    this.endpoint = API.ENDPOINT;
  }

  get<T>(url: string, params?: any) {
    return this.http.get<T>(`${this.endpoint}${url}`, {
      headers: this.header,
      params,
    });
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.endpoint}${url}`, body, {
      headers: this.header,
    });
  }

  put<T>(url: string, body: any) {
    return this.http.put<T>(`${this.endpoint}${url}`, body, {
      headers: this.header,
    });
  }

  delete<T>(url: string, params?: any) {
    return this.http.delete<T>(`${this.endpoint}${url}`, {
      headers: this.header,
      params,
    });
  }
}
