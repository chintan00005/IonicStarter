import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form:FormGroup;
  constructor(public placesService:PlacesService, public router:Router, private loadingCtrl:LoadingController) {

   }

  ngOnInit() {
    this.form = new FormGroup({
      title:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.maxLength(180)]
      }),
      price:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      dateFrom:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateTo:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
    })
  }
  onImagePick(data:string){

  }
  onSubmit(){
    if(this.form.invalid)
    {
      return;
    }
    console.log('Formm',this.form)
    this.loadingCtrl.create({
      message:"Creating new booking..."
    }).then((loading)=>{
      loading.present()
      this.placesService.addPlace(this.form.get('title').value,this.form.get('description').value,
      this.form.get('price').value,this.form.get('dateFrom').value,this.form.get('dateTo').value).subscribe(
        ()=>{
          loading.dismiss()
          this.form.reset()
          this.router.navigate(['places/tabs/offers'])
        }
      )

    })

  }
}
