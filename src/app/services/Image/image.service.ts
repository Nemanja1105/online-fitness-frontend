import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(url: any) {
    const formData = new FormData();
    formData.append('image', url);
    return this.http.post(config.API_URL + '/images', formData);
  }

  public downloadImage(id: any) {
    return `${config.API_URL}/images/${id}`;
  }
}
