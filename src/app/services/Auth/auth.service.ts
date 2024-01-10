import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = 'http://localhost:9001/api/v1';
  constructor(private http: HttpClient) {}

  public register(request: any) {
    return this.http.post(this.API_URL + '/auth/register', request);
  }

  public checkDetail(request: any) {
    return this.http.post(this.API_URL + '/auth/check-details', request);
  }
}
