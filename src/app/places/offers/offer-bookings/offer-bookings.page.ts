import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

place:Place;
sub:Subscription

  constructor(private activatedRouter:ActivatedRoute, 
    private navController:NavController,
    private placeService:PlacesService,
    private router:Router) { }

  ngOnInit() {
  this.activatedRouter.paramMap.subscribe(data=>{
    console.log('data',data)
    if(!data.has('offerId'))
    {
      this.navController.navigateBack('places/tabs/offers')
      return;
    }
    this.sub = this.placeService.getItem(data.get('offerId')).subscribe(place=>{
      this.place = place
    });
  })
  }

  onNavigateEdit(){
    this.router.navigate(['places/tabs/offers/edit/'+this.place.id])
  }

  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe()
    }
  }
}
