import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get(config.API_URL + "/categories");
  }

  public findAllForClient(id: any) {
    return this.http.get(config.API_URL + `/categories/subscriptions/${id}`);
  }

  public changeSubForClient(categoryId: any, clientId: any) {
    return this.http.put(config.API_URL + `/categories/${categoryId}/subscriptions/${clientId}`, null);
  }
}
