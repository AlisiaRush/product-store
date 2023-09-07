import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe((response) => {
      // console.log(response);
      this.products = response;
      this.cdr.detectChanges();
    });
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveorUpdateProductList(newData: any) {
    // Check if this.selectedProduct is not null
    if (this.selectedProduct && newData.id === this.selectedProduct.id) {
      const productIndex = this.products.findIndex(
        (data) => data.id === newData.id
      );
      if (productIndex !== -1) {
        this.products[productIndex] = newData;
      }
    } else {
      this.products.unshift(newData);
    }

    // this.getProductList(); // use this if you have a backend database.
  }

  showEditModal(product: IProduct) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
}
