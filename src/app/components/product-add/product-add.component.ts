import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup?: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
    this.initProductForm()
  }

  initProductForm() {
    this.productFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    })
  }

  onSave() {
    this.submitted = true
    if (this.productFormGroup?.valid)
      this.productService.saveProduct(this.productFormGroup?.value).subscribe(data => {
        alert("Product added successfully")
      })
  }

}
