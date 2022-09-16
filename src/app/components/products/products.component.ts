import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/model/product.model';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products$:Observable<AppDataState<Product[]>> |null=null;
   readonly DataStateEnum=DataStateEnum;

  //on a injecter le service
  constructor(private productsService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ =this.productsService.getAllProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSellectedProducts(){
    this.products$ =this.productsService.getSelectedProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
  
    );
  }

  onGetAvailableProducts(){
    this.products$ =this.productsService.getAvailableProducts().pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
  
    );
  }
  onSearch(dataForm:any){
    //recuperer exactement le champ qui saisir dans search 
    this.products$ =this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
  
    );
  }

  onSelect(p:any){
    this.productsService.select(p)
    .subscribe(data=>{
      p.selected=data.selected;
    })
  }

  onDelete(p:any){
    let v =confirm("are you sure to delete this product?");
    if(v){
        this.productsService.delete(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
    }
    
  }

  onNewProduct(){
    this.router.navigateByUrl("/newproduct")
  }

  onEdit(p:Product){
    this.router.navigateByUrl("/editproduct/"+p.id)
  }
  
}
