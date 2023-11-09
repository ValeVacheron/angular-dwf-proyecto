import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';

import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/modules/product/_models/category';
import { CategoryService } from 'src/app/modules/product/_services/category.service';
import { ProductImage } from '../../_models/product-image';
import { ProductImageService } from '../../_services/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  product: any | Product = new Product(); // producto consultado
  gtin: any | string = ""; // gtin del producto consultado
  product_images: ProductImage[] = []; // imagen del producto

  categories: Category[] = []; // lista de categorías
  category: any | Category = new Category(0,"","",0); // datos de la categoría del producto

  // formulario de actualización
  form = this.formBuilder.group({
    product_id: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    product: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern("^([0-9]*[.])?[0-9]+")]],
    stock: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
    category_id: ["", [Validators.required]]
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private productService: ProductService, // servicio product de API
    private productImageService: ProductImageService, // servicio product image de API
    private categoryService: CategoryService, // servicio category de API
    private formBuilder: FormBuilder, // formulario
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.getProduct();
      this.getImage();
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'gtin del producto inválido',
        background: '#F8E8F8',
        timer: 5000
      });
    }
  }

  // CRUD product

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe(
      res => {
        this.product = res; // asigna la respuesta de la API a la variable de producto
        this.getCategory(this.product.category_id);
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'producto no encontrado',
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  getImage(){
    this.productImageService.getProductImages(this.product.product_id).subscribe(
      (product_images: ProductImage[]) => {
        product_images.forEach(product_image => {
          product_image.image = 'assets/img/${product_image.image}'; // URL completa de la imagen
        });
        this.product_images = product_images;
      },
      // res => {
      //   this.product_images = res; // asigna la respuesta de la API a la variable de imagen de producto
      // },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'imágenes no encontradas',
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El producto ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 5000
        });

        if(this.form.controls['gtin'].value != this.gtin){
          this.gtin = this.form.controls['gtin'].value!; // actualizamos el gtin

          // sustituimos en la url el nuevo gtin
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.gtin);
          
          // actualizamos la url con el nuevo gtin
          this.redirect(currentUrl);
        }

        this.getProduct(); // consulta el producto con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  updateProduct(){
    this.form.reset();
    this.submitted = false;
    this.getCategories();

    this.form.controls['product_id'].setValue(this.product.product_id);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);

    $("#modalForm").modal("show");
  }

  // product image

  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.image = image;
    productImage.product_id = this.product.product_id
    let numimages = this.product_images.length
    productImage.product_image_id = numimages + 1;
    this.productImageService.uploadProductImage(productImage).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido añadida',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 5000
        });

        this.getProduct(); // consulta el producto con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  // categories

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categorías
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  // auxiliary functions

  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res; // asigna la respuesta de la API a la lista de categorías
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 5000
        });
      }
    );
  }

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateProductImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

}
