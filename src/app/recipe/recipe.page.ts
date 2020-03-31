import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model'
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage {

   recipeData : Recipe[];

  constructor(private recipeService:RecipeService) { }

ionViewWillEnter(){
  this.recipeData = this.recipeService.getAllData()
}
}
