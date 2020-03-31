import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.scss'],
})
export class ReceipeItemComponent implements OnInit {

@Input()  receipe:Recipe
  constructor(private route:Router) { }

  ngOnInit() {
  }

  navigate(id:string){
    this.route.navigate(['/detail/'+id]);
      }
}
