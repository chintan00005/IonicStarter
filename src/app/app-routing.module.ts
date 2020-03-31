import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    children:[
      {
      path: '',
      loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule),
    }]
  },
  {
    path: 'detail/:recipeId',
    loadChildren: () => import('./recipe/recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule) 
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
