import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((data: Product[]) => (this.products = data));
  }

  edit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  delete(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts(); // refresh after deletion
    });
  }
}
