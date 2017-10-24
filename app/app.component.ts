import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
  `<div class ="container">
    <h1>{{currentFocus}}</h1>
    <div *ngFor = "let recipe of recipes" (click)= "showRecipe(recipe)">
      <h3 [class]= "makeDone(recipe)" (click)="isDone(recipe)">{{recipe.name}}</h3>
    </div>

    <div *ngIf = "displayRecipe">
    <div class ="well" droppable (onDrop)="onItemDrop($event, displayRecipe)">
      <h3>DROP FOODS TO HERE</h3>
    </div>
    <div *ngFor="let ingredient of displayRecipe.ingredients" class="list-group-item">
      <p>{{ingredient}}</p>
    </div>
    <p>{{displayRecipe.steps}}</p>
    <input [(ngModel)]="displayRecipe.name">
    <button (click)= "eraseIngredients(displayRecipe)">Erase Ingredients</button>
    <button (click)= "hideRecipe(displayRecipe)">Hide</button>
    </div>

    <h3>You want ingredients? Drag 'em, drop 'em, eat 'em</h3>
    <div class="row">
      <div class="col-sm-3">
          <ul class="list-group">
            <li draggable *ngFor="let item of items" [dragData]="item" class="list-group-item">{{item}}</li>
          </ul>
      </div>
    </div>
  </div>
  `
})

export class AppComponent {
  currentFocus: string = 'Noah\'s Mad YumYums | Vol. 3'
  droppedItems = [];
  items = ['rice', 'beans', 'cheese', 'lunch missile stuff', 'torillas'];

  displayRecipe = null;


  onItemDrop(e, recipe) {
      // Get the dropped data here
      recipe.ingredients.push(e.dragData);

  }
  constructor() { }


  recipes: Recipe[] = [
    new Recipe('Noah\'s \'Down on his Luck Grits', "Make da grits and den eet 'em"),
    new Recipe('Noah\'s Sticky Finger Chicken Wangs', 'cook the dang chuk\'n')
  ]

  isDone(recipe){
    if(recipe.done === true){
      recipe.done = false;
    }else{
      recipe.done = true;
    }
  }

  showRecipe(clickedRecipe: Recipe) {
    this.displayRecipe = clickedRecipe;
  }

  hideRecipe(clickedRecipe: Recipe) {
    this.displayRecipe = null;
  }

  makeDone(clickedRecipe: Recipe){
    if(clickedRecipe.done === true){
      return "bg-success";
    }else{
      return "bg-danger";
    }
  }

  eraseIngredients(recipe){
    recipe.ingredients= [];
  }

}

export class Recipe {
  public done: boolean = false;
  public ingredients = [];

  constructor(public name: string, public steps: string) { }
}
