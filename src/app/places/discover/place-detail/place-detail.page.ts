import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../places.model';
import { CreateBookingComponent } from 'src/app/mybookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { MybookingsService } from 'src/app/mybookings/mybookings.service';
import { MyBookings } from 'src/app/mybookings/mybookings.model';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place:Place
  bookingEnable:boolean;
  isLoading:boolean;

  constructor(private navController:NavController,
    private placeService:PlacesService,
    private activatedRouter:ActivatedRoute,
    private modalController:ModalController,
    private actionController:ActionSheetController,
    private myBookingService:MybookingsService,
    private authService:AuthService,
    public loadingController:LoadingController) { }
    private sub:Subscription;
  

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(data=>{
      if(!data.has('placeId'))
      {
        this.navController.navigateBack('places/tabs/discover')
        return;
      }
      this.isLoading = true;
      this.loadingController.create({
        message:'Getting data...'
      }).then(loading=>{
        loading.present()
        this.authService.getUserId().pipe(take(1)).subscribe(userId=>{
          if(!userId)
          {
            return new Error('UserId does not exist')
          }

          this.sub =  this.placeService.getItem(data.get('placeId')).subscribe(place=>{
            loading.dismiss();
            this.isLoading = false;
            this.place = place;
            this.bookingEnable = this.place.userId!=userId
       
        })
         });
      })
   

    })
  }

  ngOnDestroy(){
    if(this.sub)
    {
      this.sub.unsubscribe()
    }
  }


  onGoingBack(){
    this.actionController.create({
      header:'Select anyone',
      buttons:[{
        text:'Choose a date',
        handler:()=>{
          this.onSelectingOption('select');
        }
      },
      {
        text:'Random date',
        handler:()=>{
          this.onSelectingOption('random');
        }
      },
      {
        text:'Cancel',
        role:'cancel'
      }]
    }).then(data=>{
      data.present()
    })
  }

  onSelectingOption(value: 'select'|'random'){
  //this.navController.navigateBack('places/tabs/discover')
  this.modalController.create({component:CreateBookingComponent,
    componentProps:{"placeData":this.place, "selectMode":value}}).
    then(modal=>{
      modal.present()
      modal.onDidDismiss().then(data=>{
        if(data.role == "confirm")
        {
          this.loadingController.create({
      message:'Creating booking...'
          }).then(loading=>{
           
            this.authService.getUserId().pipe(take(1000)).subscribe(userId=>{
              if(!userId)
              {
                return new Error('UserId does not exist')
              }
              loading.present()
              const myBooking = new MyBookings(null,userId,
              this.place.id,this.place.title,+data.data.bookindData['number-person'],
              data.data.bookindData['first-name'],data.data.bookindData['last-name'],
              data.data.bookindData['date-from'],data.data.bookindData['date-to'] )
             
              this.myBookingService.addBooking(myBooking).subscribe(()=>{
                loading.dismiss()
              }); 
            })
            
          })
  
      }
 
    
      })
    })
  }
}
