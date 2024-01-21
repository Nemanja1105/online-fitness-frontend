import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public sendMessage(request: any): Observable<any> {
    return this.http.post(config.API_URL + "/messages", request);
  }

  public getClientMessage(id: any, page: any, size: any): Observable<any> {
    return this.http.get(config.API_URL + `/clients/${id}/messages?page=${page}&size=${size}`);
  }

  public markAsRead(id: any) {
    return this.http.get(config.API_URL + `/messages/${id}/seen`);
  }
}
