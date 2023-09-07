import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    ToastModule,
  ],
  providers: [MessageService],
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnChanges {
  @Input() displayAddEditModal = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<IProductResponse> =
    new EventEmitter<IProductResponse>();

  modalTitle = 'Add';

  productForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    price: ['', Validators.required],
    description: [''],
    image: ['', Validators.required],
    category: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addEditProduct() {
    const formData = this.productForm.value;
    const { id, title, price, description, image, category } = formData;

    const postData: IProductResponse = {
      id: typeof id === 'number' ? id : 0,
      title: title || '',
      price: typeof price === 'number' ? price : 0,
      description: description || '',
      image: image || '',
      category: category || '',
    };

    this.productService.addEditProduct(postData, this.modalTitle).subscribe(
      (response: IProductResponse) => {
        this.closeModal();
        const msg = this.modalTitle === 'Add' ? 'Added' : ' Updated';
        this.clickAddEdit.emit(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `You're product has been successfully ${msg}!`,
        });
      },
      (error) => {
        this.showError();
      }
    );
    this.productForm.reset();
    this.clickClose.emit(false);
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Sorry, we were unable to add a product',
    });
  }

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalTitle = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
      this.modalTitle = 'Add';
    }
  }
}
