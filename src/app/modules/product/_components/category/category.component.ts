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
    this.categories.push(new Category(1,'N','Norte',1));
    this.categories.push(new Category(2,'S','Sur',0));
    this.categories.push(new Category(3,'NE','Noroeste',1));
  }
}