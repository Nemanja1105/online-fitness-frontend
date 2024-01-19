import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramServiceService {

  constructor(private http: HttpClient) { }

  public insert(id: any, request: any) {
    return this.http.post(config.API_URL + `/clients/${id}/fitness-program`, request);
  }

  public findById(id: any) {
    return this.http.get(config.API_URL + `/fitness-programs/${id}`);
  }

  public participateToFitnessProgram(cliendId: any, fpId: any) {
    return this.http.get(config.API_URL + `/clients/${cliendId}/fitness-program/${fpId}/subscribe`);
  }

  public isParticipating(cliendId: any, fpId: any) {
    return this.http.get(config.API_URL + `/clients/${cliendId}/fitness-program/${fpId}/participating`);
  }

  public commentFitnessProgram(id: any, request: any): Observable<any> {
    return this.http.post(config.API_URL + `/fitness-programs/${id}/comments`, request);
  }

  public getCommentsForFitnessProgram(id: any) {
    return this.http.get(config.API_URL + `/fitness-programs/${id}/comments`);
  }
}
