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

  addEditProduct(
    postData: IProductResponse,
    modalTitle: string
  ): Observable<IProductResponse> {
    if (modalTitle === 'Add') {
      return this.http.post<IProductResponse>(
        'https://fakestoreapi.com/products',
        postData
      );
    } else {
      return this.http.put<IProduct>(
        `https://fakestoreapi.com/products/${postData.id}`,
        postData
      );
    }
  }
}
