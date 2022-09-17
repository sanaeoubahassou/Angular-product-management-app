import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, ProductActionsTypes } from 'src/app/state/product.state';
import { DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  p?:Product;

  //the parent pass the data product$ to child productList
  @Input() productsInput$:Observable<AppDataState<Product[]>> |null=null;
  //the child will pass the events to the parent 
  @Output() productsEventEmitter:EventEmitter<ActionEvent> = new EventEmitter();
  
  readonly DataStateEnum=DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }
  onSelect(p:Product){
    this.productsEventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:p});
  }
  onDelete(p:Product){
    this.productsEventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:p});
  }
  onEdit(p:Product){
    this.productsEventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT, payload:p});
  }

  onActionEvent($event:ActionEvent){
    this.productsEventEmitter.emit($event);
  }

}
