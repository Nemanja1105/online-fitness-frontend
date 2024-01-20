import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) { }

  public updateClient(request: any, id: any): Observable<any> {
    return this.http.post(config.API_URL + '/clients/' + id, request);
  }

  public findAll(): Observable<any> {
    return this.http.get(config.API_URL + '/clients');
  }
}
