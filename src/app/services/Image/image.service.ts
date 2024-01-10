import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  API_URL: string = 'http://localhost:9001/api/v1';
  constructor(private http: HttpClient) {}

  public uploadImage(url: any) {
    const formData = new FormData();
    formData.append('image', url);
    return this.http.post(this.API_URL + '/images', formData);
  }

  public downloadImage(id: any) {
    return `${this.API_URL}/images/${id}`;
  }
}
