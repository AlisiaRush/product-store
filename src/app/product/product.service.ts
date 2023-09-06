import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductResponse } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'https://fakestoreapi.com/products?sort=desc'
    );
  }

  saveProducts(postData: IProductResponse): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(
      'https://fakestoreapi.com/products',
      postData
    );
  }
}
