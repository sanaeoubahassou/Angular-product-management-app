import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  productId!:number;
  productFormGroup?:FormGroup;
  submitted: boolean =false;
  constructor(private activatedRoute:ActivatedRoute,
    private productsService: ProductsService,
    private fb:FormBuilder) {
    this.productId=activatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId)
    .subscribe(product=>{
      this.productFormGroup=this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
        price:[product.price,Validators.required],
        quantity:[product.quantity,Validators.required],
        available:[product.available,Validators.required],
        selected:[product.selected,Validators.required],
      })
    });
  }
  onUpdateProduct(){
    this.productsService.updateProduct(this.productFormGroup?.value)
    .subscribe(data=>{
      alert("Success updating product")
    });
  }

  
  
}
