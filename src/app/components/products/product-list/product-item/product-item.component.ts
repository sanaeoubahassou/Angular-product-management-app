import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product?:Product;
  @Output() eventEmiter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product){
    this.eventEmiter.emit({type:ProductActionsTypes.SELECT_PRODUCT, payload:product});
  }
  onDelete(product: Product){
    this.eventEmiter.emit({type:ProductActionsTypes.DELETE_PRODUCT, payload:product});

  }
  onEdit(product: Product){
    this.eventEmiter.emit({type:ProductActionsTypes.EDIT_PRODUCT, payload:product});

  }

}
