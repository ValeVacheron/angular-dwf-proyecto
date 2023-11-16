import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module';
import { CategoryService } from './modules/product/_services/category.service';
import { ProductsModule } from './modules/products/products.module';
import { ProductService } from './modules/products/_services/product.service';
import { LayoutModule } from './modules/layout/layout.module';
import { NgxPhotoEditorModule } from "ngx-photo-editor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    ProductsModule,
    LayoutModule,
    NgxPhotoEditorModule
  ],
  providers: [
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
