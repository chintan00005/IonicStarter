import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyBookings } from './mybookings.model';
import { MybookingsService } from './mybookings.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.page.html',
  styleUrls: ['./mybookings.page.scss'],
})
export class MybookingsPage implements OnInit, OnDestroy {

  loadedBookings:MyBookings[];
  sub:Subscription;

  constructor(private bookingService:MybookingsService,
    private loadingCtrl : LoadingController) { }

  ngOnInit() {
    this.sub = this.bookingService.getAllBookings().subscribe(list=>{
      this.loadedBookings = list;
    })

    this.bookingService.getAllBookingsFromServer().subscribe(()=>{})
  }

  ngOnDestroy(){
      this.sub.unsubscribe()
  }

  onCanceledBooking(id:string, slidingItem:IonItemSliding){
    this.loadingCtrl.create({
      message:'Removing your item...'
    }).then(loadingBar=>{
      loadingBar.present()
      this.bookingService.cancelBooking(id).subscribe(()=>{
        loadingBar.dismiss();
        this.bookingService.getAllBookingsFromServer().subscribe(()=>{})
      })
    })
    slidingItem.close()
  }

}
