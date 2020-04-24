import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

   loadedPlaces:Place[];
   relevantPlaces:Place[];
   slicedLoadedPlace:Place[]
  constructor(private placeService:PlacesService,private router:Router,
     private authService:AuthService,
     private loadingController : LoadingController) { }
  sub:Subscription

  ngOnInit() {
    this.sub = this.placeService.getPlaces().subscribe(places=>{
      this.loadedPlaces = places
      this.relevantPlaces = this.loadedPlaces;
      this.slicedLoadedPlace = this.relevantPlaces.slice(1);

    })

  }

  ionViewWillEnter(){
    this.loadingController.create({message:"Loading places..."})
    .then(loadingBar=>{
      loadingBar.present()
      this.placeService.getPlacesFromServer().subscribe(()=>{
        loadingBar.dismiss()
      })
    })
  }
  onNavigate(id:string){
this.router.navigate(['places/tabs/discover/'+id])
  }

  onValueChange(eventChange:CustomEvent){
    if(eventChange.detail.value == 'all')
    {
      this.relevantPlaces = this.loadedPlaces;
      this.slicedLoadedPlace = this.relevantPlaces.slice(1);
    }
    else
    {
      this.authService.getUserId().pipe(take(1)).subscribe(userId=>{
        if(!userId)
        {
          return new Error('UserId does not exists')
        }
        this.relevantPlaces = this.loadedPlaces.filter(place=>{
          return place.userId != userId
        });
        console.log(' this.relevantPlaces', this.relevantPlaces)
        this.slicedLoadedPlace = this.relevantPlaces.slice(1);
      })
    }
  }
  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe()
    }
  }
}
