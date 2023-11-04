import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/_components/category/category.component';
import { ProductComponent } from './modules/products/_components/product/product.component';
import { ProductImageComponent } from './modules/products/_components/product-image/product-image.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path : 'product', component: ProductComponent },
  { path : 'product/:gtin', component: ProductImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
