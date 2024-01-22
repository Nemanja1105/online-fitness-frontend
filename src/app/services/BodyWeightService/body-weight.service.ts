import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyWeightService {

  constructor(private http: HttpClient) { }

  public insertBodyWeightForClient(clientId: any, request: any) {
    return this.http.post(config.API_URL + `/clients/${clientId}/bodyweights`, request);
  }

  public getStatisticsForClient(clientId: any, request: any): Observable<any> {
    return this.http.post(config.API_URL + `/clients/${clientId}/bodyweights/statistic`, request);
  }

  public downloadPdf(clientId: any) {
    return config.API_URL + `/clients/${clientId}/pdf`;
  }
}
