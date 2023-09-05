import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProductComponent } from './product/product.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, ProductComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-crud';
}
