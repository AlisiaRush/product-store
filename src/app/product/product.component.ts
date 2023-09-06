import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct, IProductResponse } from './product';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

@Component({
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, AddEditProductComponent],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  displayAddModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe((response) => {
      // console.log(response);
      this.products = response;
    });
  }

  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
  }

  saveProductToList(newData: any) {
    this.products.unshift(newData);
  }
}
