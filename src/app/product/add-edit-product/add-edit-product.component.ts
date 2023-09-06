import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductService } from '../product.service';
import { IProductResponse } from '../product';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
  ],
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent {
  @Input() displayAddModal = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<IProductResponse> =
    new EventEmitter<IProductResponse>();

  productForm = this.fb.group({
    title: ['title', Validators.required],
    price: ['20', Validators.required],
    description: ['description'],
    image: [
      'https://cdn.britannica.com/08/58808-050-32096AD5/Justinian-I-Christ-gifts-Constantine-the-Great.jpg',
      Validators.required,
    ],
    category: ['category', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  closeModal() {
    this.clickClose.emit(true);
  }

  addProduct() {
    const formData = this.productForm.value;
    const { title, price, description, image, category } = formData;

    const postData: IProductResponse = {
      title: title || '',
      price: typeof price === 'number' ? price : 0,
      description: description || '',
      image: image || '',
      category: category || '',
    };

    this.productService
      .saveProducts(postData)
      .subscribe((response: IProductResponse) => {
        this.closeModal();
        this.clickAdd.emit(response);
      });
    this.productForm.reset();
    this.clickClose.emit(false);
  }
}
