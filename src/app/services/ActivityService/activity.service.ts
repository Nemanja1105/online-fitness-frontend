import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  public findAllActivitiesForClient(id: any) {
    return this.http.get(config.API_URL + `/clients/${id}/activities`);
  }

  public insertActivityForClient(id: any, request: any) {
    return this.http.post(config.API_URL + `/clients/${id}/activities`, request);
  }

  public deleteActivityForClient(clientId: any, activityId: any) {
    return this.http.delete(config.API_URL + `/clients/${clientId}/activities/${activityId}`);
  }
}
