import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() placeData:Place
  @Input() selectMode:'select'|'random'
  @ViewChild('form',{static:true}) form : NgForm

  startDate : string
  endDate : string
  dateFrom : Date
  dateTo : Date

  constructor(private modalController:ModalController) { }

  ngOnInit() {
    
     this.dateFrom = new Date(this.placeData.dateFrom)
     this.dateTo = new Date(this.placeData.dateTo)

  


    if(this.selectMode === 'random')
    {
        this.startDate = new Date(
          this.dateFrom.getTime() + Math.random() * (this.dateTo.getTime() 
          - 7 * 24 * 3600 *1000 - this.dateFrom.getTime())

        ).toISOString();
        this.endDate = new Date(
          new Date(this.startDate).getTime() + Math.random() * (
            new Date(this.startDate).getTime() + 6 * 24 * 3600 * 1000 - 
            new Date(this.startDate).getTime()
          )
        ).toISOString()
    }
  }

  onClose(){
    this.modalController.dismiss(null,"cancel")
  }

  onBook(){
    if(this.form.invalid && !this.onDateValidate())
    {
      return ;
    }

    const dataTosend = {
      'first-name':this.form.value['first-name'],
      'last-name':this.form.value['last-name'],
      'number-person':this.form.value['number-person'],
      'date-from': this.form.value['date-from'],
      'date-to':this.form.value['date-to']
    }
    this.modalController.dismiss({
      bookindData : dataTosend
    },"confirm")
  }

  onDateValidate(){
//  const selectedFrom = new Date(this.form.value['date-from'])
  //const selectedTo = new Date(this.form.value['date-to'])

  //return selectedTo>selectedFrom
  return true;
  }

}
