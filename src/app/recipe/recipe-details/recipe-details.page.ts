import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  recipeDetail:Recipe
  constructor(
    private router:Router,
    private recipeService:RecipeService,
    private activatedRouting: ActivatedRoute,
    private alertController:AlertController
  ) { }

  ngOnInit() {
this.activatedRouting.paramMap.subscribe((obser)=>{
  if(!obser.has('recipeId'))
  {
    this.router.navigate(['/recipe'])
      return;
  }
  const recipeId = obser.get('recipeId');
  this.recipeDetail = this.recipeService.getRecipeById(recipeId);
})
   
  }

  deleteReceipe(){
    this.alertController.create({header:'Sure??',message:'Really??',buttons:[
      {
        text:'Cancel'
      },
      {
        text:'Delete',
        handler:()=>{
          this.recipeService.deleteRecipeById(this.recipeDetail.id)
          this.router.navigate(['/recipe'])
        }
      }
    ]}).then(el=>{
      el.present()
    })

  }

}
