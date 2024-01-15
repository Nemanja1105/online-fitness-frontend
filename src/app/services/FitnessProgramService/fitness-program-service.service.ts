import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramServiceService {

  constructor(private http: HttpClient) { }

  public insert(id: any, request: any) {
    return this.http.post(config.API_URL + `/clients/${id}/fitness-program`, request);
  }
}
