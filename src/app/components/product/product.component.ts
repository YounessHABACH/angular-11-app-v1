import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { AppDataState, DataStatesEnum } from 'src/app/models/product.state';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products$!: Observable<AppDataState<Product[]>>
  readonly dataState = DataStatesEnum

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.onGetAllProducts()
  }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({dataState: DataStatesEnum.LOADED, data: data})),
      startWith({dataState: DataStatesEnum.LOADING}),
      catchError(err => of({dataState: DataStatesEnum.ERROR, errorMessage: err.message}))
    )
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data => ({dataState: DataStatesEnum.LOADED, data: data})),
      startWith({dataState: DataStatesEnum.LOADING}),
      catchError(err => of({dataState: DataStatesEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data => ({dataState: DataStatesEnum.LOADED, data: data})),
      startWith({dataState: DataStatesEnum.LOADING}),
      catchError(err => of({dataState: DataStatesEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onSearchProduct(form: any) {
    this.products$ = this.productService.searchProdycts(form.keyword).pipe(
      map(data => ({dataState: DataStatesEnum.LOADED, data: data})),
      startWith({dataState: DataStatesEnum.LOADING}),
      catchError(err => of({dataState: DataStatesEnum.ERROR, errorMessage: err.errorMessage}))
    )
  }

  onSubmit(form: any){
    console.log("Hello");
    console.log(form);    
  }

  onSelect(p: Product) {
    this.productService.selectProduct(p).subscribe(data => {
      p.selected = data.selected
    })
  }

  onDeleteProduct(p: Product) {
    let v = confirm("Do you want to proceed with this action ?")
    if (v)
      this.productService.deleteProduct(p).subscribe(data => {
        this.onGetAllProducts()
      })
  }

  onNewProducts(){
    this.router.navigateByUrl("/product-add")
  }

  onEditProduct(p: Product){
    this.router.navigateByUrl("/product-edit/"+p.id)
  }

}
