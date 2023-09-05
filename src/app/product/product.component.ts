import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  imports: [CommonModule, TableModule],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }
}
