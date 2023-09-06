import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';

@NgModule({
  imports: [CommonModule, TableModule, ButtonModule, AddEditProductModule],
})
export class ProductModule {}
