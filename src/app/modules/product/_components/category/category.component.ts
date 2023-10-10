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

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void {
    this.categories.push(new Category(1,'N','Norte',1));
    this.categories.push(new Category(2,'S','Sur',0));
    this.categories.push(new Category(3,'NE','Noroeste',1));
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("¡Categoría guardada exitosamente!");

  }

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}