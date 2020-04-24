import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  loadedPlacesList:Place[] = [];
  sub:Subscription
  constructor(private router:Router, private placesService:PlacesService,
    private loadingController:LoadingController
    ) { }

  ngOnInit() {
    this.sub = this.placesService.getPlaces().subscribe(places=>{
      this.loadedPlacesList = places;
    })
  }

  ionViewWillEnter(){
    this.loadingController.create({message:"Loading places..."})
    .then(loadingBar=>{
      loadingBar.present()
      this.placesService.getPlacesFromServer().subscribe(()=>{
        loadingBar.dismiss()
      })
    })
  }
 
  onNavigateNewOffer(){
    this.router.navigate(['places/tabs/offers/new-offer'])
  }

  onNavigateEditScreen(id:string, slidingItem:IonItemSliding){
    slidingItem.close()
    this.router.navigate(['places/tabs/offers/edit/'+id])
  }

  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe()
    }
  }
}
