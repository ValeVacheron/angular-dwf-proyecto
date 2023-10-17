import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  public categories: Category[] = [];
  categoryUpdated: number = 0;

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;

  ngOnInit(): void {
    this.getCategories();
  }

  // CRUD category
  disableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 0;
        alert("¡Categoría desactivada exitosamente!");
        break;
      }
    }
    console.log("SALIR")
  }
  enableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 1;
        alert("¡Categoría activada exitosamente!");
        break;
      }
    }
  }

  getCategories():void {
    this.categories.push(new Category(1,'N','Norte',1));
    this.categories.push(new Category(2,'S','Sur',0));
    this.categories.push(new Category(3,'NE','Noroeste',1));
  }

  onSubmit(){
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    console.log(this.form.value);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("¡Categoría guardada exitosamente!");

  }

  onSubmitUpdate(){
    this.submitted = true;

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

    this.categoryUpdated = 0;

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
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}