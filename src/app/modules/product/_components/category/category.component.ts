import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  constructor() {}

  public categories: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories():void {
    this.categories.push(new Category(1,'N','Norte',true));
    this.categories.push(new Category(1,'S','Sur',false));
    this.categories.push(new Category(1,'NE','Noroeste',true));
  }
}