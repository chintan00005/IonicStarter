import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipePageRoutingModule } from './recipe-routing.module';

import { RecipePage } from './recipe.page';
import { ReceipeItemComponent } from '../recipeItem reciepe/receipe-item/receipe-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipePageRoutingModule
  ],
  declarations: [RecipePage, ReceipeItemComponent]
})
export class RecipePageModule {}
