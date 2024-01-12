import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  API_KEY = 'Mmpbolvmgmxr6/nVnZpPIg==9WhBJttWHJGmCeLJ';
  API_URL = 'https://api.api-ninjas.com/v1/exercises?';
  constructor(private http: HttpClient) {}

  public findExercises(muscle: any, dif: any) {
    let url = this.API_URL;
    if (dif != 'default') url = url + `difficulty=${dif}&`;
    if (muscle != 'default') url = url + `muscle=${muscle}&`;
    return this.http.get(url, { headers: { 'X-Api-Key': this.API_KEY } });
  }
}
