import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId: number
  productFormGroup?: FormGroup
  submitted: boolean = false

  constructor(private route:ActivatedRoute, private productService:ProductService, private formBuilder: FormBuilder) {
    this.productId = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.initProductForm(data)
    })
  }

  initProductForm(p: Product) {
    this.productFormGroup = this.formBuilder.group({
      id: [p.id, Validators.required],
      name: [p.name, Validators.required],
      price: [p.price, Validators.required],
      quantity: [p.quantity, Validators.required],
      selected: [p.selected, Validators.required],
      available: [p.available, Validators.required]
    })
  }

  onUpdate() {
    this.submitted = true
    if (this.productFormGroup?.valid)
      this.productService.updateProduct(this.productFormGroup.value).subscribe(data => {
        alert("Product updated successfully")
      })
  }

}
