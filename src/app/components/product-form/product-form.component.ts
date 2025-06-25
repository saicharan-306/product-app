import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: 0, name: '', category: '', price: undefined as any};
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.isEdit = true;
      this.productService.get(id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  save(): void {
  console.log("Save button clicked", this.product);
  if (this.isEdit) {
    this.productService.update(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.productService.create(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

}


