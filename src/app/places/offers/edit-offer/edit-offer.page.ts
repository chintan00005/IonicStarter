import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../places.model';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  place:Place
  form:FormGroup;
  isLoading:boolean

  constructor(private activetedRouter:ActivatedRoute,
    private navController:NavController,
    private placeService:PlacesService,
    private router: Router,
    private loadingCtrl : LoadingController) { }
    sub:Subscription

  ngOnInit() {
  
    this.activetedRouter.paramMap.subscribe(data=>{
      if(!data.has('offerId'))
      {
        this.navController.navigateBack('places/tabs/offers')
        return;
      }
      this.isLoading=true;
      this.loadingCtrl.create({
        message:'Loading data...'
      }).then(loading=>{
        loading.present()
        this.sub =  this.placeService.getItem(data.get('offerId')).subscribe(place=>{
          this.place = place;
      if(!place)
      {
        this.navController.navigateBack('places/tabs/offers')
        loading.dismiss()
        this.isLoading=false;

        return;
      }
  
          this.form= new FormGroup({
            title:new FormControl(this.place.title,{
              updateOn:'blur',
              validators:[Validators.required]
            }),
            description:new FormControl(this.place.description,{
              updateOn:'blur',
              validators:[Validators.required,Validators.maxLength(180)]
            })
            //,
            // price:new FormControl(this.place.price,{
            //   updateOn:'blur',
            //   validators:[Validators.required,Validators.min(1)]
            // }),
            // dateFrom:new FormControl(null,{
            //   updateOn:'blur',
            //   validators:[Validators.required]
            // }),
            // dateTo:new FormControl(null,{
            //   updateOn:'blur',
            //   validators:[Validators.required]
            // })
          })
          loading.dismiss()
          this.isLoading=false;
        })  
      })
    
     
    })
  }

  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe()
    }
  }

  onSubmit(){

    if(this.form.invalid)
    {
      return;
    }
    this.loadingCtrl.create({
      message:"Applying changes..."
    }).then((loading)=>{
      loading.present()
      const placeToSend= new Place(this.place.id,
        this.form.get('title').value,
        this.form.get('description').value,
        this.place.image,this.place.price,this.place.dateFrom
        ,this.place.dateTo,this.place.userId);
      this.placeService.editItem(placeToSend,this.place.id).subscribe(()=>{
        loading.dismiss()
        this.form.reset()
        this.router.navigate(['places/tabs/offers'])
      })
    })

   
  }

}
