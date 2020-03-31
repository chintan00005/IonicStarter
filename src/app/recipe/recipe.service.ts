import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model'
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 private recipeData : Recipe[]=[
    {
      id:'1',
      title:'Shak',
      image:'https://2.bp.blogspot.com/-JVmJaxCp29M/ULUT15VDxYI/AAAAAAAAF7A/oIq8H2joLTA/s1600/Lal+Shak.01.jpg',
      ingre:['salt','masala','capsicum']
    },
    {
      id:'2',
      title:'Dal',
      image:'https://2.bp.blogspot.com/-JVmJaxCp29M/ULUT15VDxYI/AAAAAAAAF7A/oIq8H2joLTA/s1600/Lal+Shak.01.jpg',
      ingre:['salt','masala','capsicum']
    },
    {
      id:'3',
      title:'Khichdi',
      image:'https://2.bp.blogspot.com/-JVmJaxCp29M/ULUT15VDxYI/AAAAAAAAF7A/oIq8H2joLTA/s1600/Lal+Shak.01.jpg',
      ingre:['salt','vegs','capsicum']
    }
  ]
  constructor() { }

  getAllData=()=>{
    return [...this.recipeData]
  }

  getRecipeById = (id:string) =>{
    return {...this.recipeData.find(r=>{
      return id===r.id
    })}
  }

  deleteRecipeById = (id:string) =>{
   this.recipeData = this.recipeData.filter(data=>{
     return id!==data.id
   })
  }
}
