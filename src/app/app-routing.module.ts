import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"newproduct", component:ProductAddComponent},
  {path:"editproduct/:id", component:EditProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
