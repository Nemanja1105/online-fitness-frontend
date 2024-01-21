import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdvisorQuestionService {

  constructor(private http: HttpClient) { }

  public askQuestion(request: any) {
    return this.http.post(config.API_URL + '/advisor-questions', request);
  }
}
