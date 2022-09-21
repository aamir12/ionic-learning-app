import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.modal';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.page.html',
  styleUrls: ['./recipes-detail.page.scss'],
})
export class RecipesDetailPage implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private alertController: AlertController,
    private recipesService:RecipesService) { }

  recipe:Recipe;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(!params.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = params.get('recipeId');
      this.recipe = this.recipesService.getRecipe(recipeId);
    })
  }

  async  onDeleteRecipe() {
    const alert = await this.alertController.create({
      header: 'Alert you sure?',
      message: 'Do you really want to delete the recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'no'
        },
        {
          text: 'Delete',
          role: 'yes'
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log(role);
    if(role === 'yes') {
      this.recipesService.deleteRecipe(this.recipe.id);
      this.router.navigate(['/recipes']);
    }

  }

}
