import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/model/product.model';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //si bien de terminer la variable par $ si on a un objet de type Observable
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
  // onActionEvent($event:any){
  //   if($event=="ALL_PRODUCTS"){ //veut mieux utiliser des variables on doit declerer un eenum dans state
  //     this.onGetAllProducts();
 //}}

  onActionEvent($event:ActionEvent){
    switch ($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSellectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct();break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
    }
    }


}
