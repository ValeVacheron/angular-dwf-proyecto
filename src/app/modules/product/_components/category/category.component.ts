import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category.service';

import Swal from'sweetalert2'; // sweetalert

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService // servicio category de API
  ) {}

  categories: Category[] = []; // lista de categorias
  categoryUpdated: number = 0; // id de la categoria a actualizar
  submitted = false; // indica si se envió el formulario

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  ngOnInit(): void {
    this.getCategories();
  }

  // CRUD category
  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido desactivada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta categorías con los cambios realizados
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
          timer: 2000
        });
      }
    );
    /*for(let category of this.categories){
      if(category.category_id == id){
        category.status = 0;
        alert("¡Categoría desactivada exitosamente!");
        break;
      }
    }
    console.log("SALIR")*/
  }
  
  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido activada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta regiones con los cambios realizados
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
          timer: 2000
        });
      }
    );
    /*for(let category of this.categories){
      if(category.category_id == id){
        category.status = 1;
        alert("¡Categoría activada exitosamente!");
        break;
      }
    }*/
  }

  getCategories():void {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de regiones
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
          timer: 2000
        });
      }
    );
    /*this.categories.push(new Category(1,'N','Norte',1));
    this.categories.push(new Category(2,'S','Sur',0));
    this.categories.push(new Category(3,'NE','Noroeste',1));*/
  }

  onSubmit(){

    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    // ejecuta la función crear o actualizar según corresponda
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La región ha sido registrada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta categorías con los cambios realizados
    
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
          timer: 2000
        });
      }
    );
    /*this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    console.log(this.form.value);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("¡Categoría guardada exitosamente!");*/

  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La categoría ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCategories(); // consulta categorías con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro

        this.categoryUpdated = 0; // resetea el id de la categoría que se actualiza a 0
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
          timer: 2000
        });
      }
    );
    /*this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    for(let category of this.categories){
      if(category.category_id == this.categoryUpdated){
        category.category = this.form.controls['category'].value!;
        category.code = this.form.controls['code'].value!;
        break;
      }
    }
    
    $("#modalForm").modal("hide");

    alert("Categoría actualizada exitosamente!");

    this.categoryUpdated = 0;*/

  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['code'].setValue(category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  showModalForm(){
    this.form.reset();
    this.categoryUpdated = 0;
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}