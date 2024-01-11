import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FitnessNewsService {
  constructor(private http: HttpClient) {}

  public getNews(): Observable<any> {
    return this.http.get(config.API_URL + '/news');
  }
}
