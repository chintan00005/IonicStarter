import { Injectable } from '@angular/core';
import { MyBookings } from './mybookings.model';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, switchMap, map } from 'rxjs/operators';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MybookingsService {

private myBookingList = new BehaviorSubject<MyBookings[]>([

])

  constructor(public httpClient:HttpClient) { }

  getAllBookings(){
    return this.myBookingList.asObservable()
  }

  getAllBookingsFromServer(){
    return this.httpClient.get('https://fir-init-2f849.firebaseio.com/booking_list.json')
    .pipe(map((listBookings)=>{
      const allBookings=[];
      for(let key in listBookings)
      {
        if(listBookings.hasOwnProperty(key))
        {
        
            const booking =   new MyBookings(key.toString(),
            listBookings[key].userId.toString(),
            listBookings[key].placeId.toString(),
            listBookings[key].placeTitle.toString(),
            parseInt(listBookings[key].guest.toString()),
            listBookings[key].firstName.toString(),
            listBookings[key].lastName.toString(),
            new Date(listBookings[key].startDate.toString()),
            new Date(listBookings[key].endDate.toString())
            );

          allBookings.push(
          booking
          )
          // allBookings.push(
          //   new MyBookings(key.toString(),
          //   listBookings[key].userId.toString(),
          //   listBookings[key].pla.toString(),
          //   listBookings[key].image.toString(),
          //   parseFloat( listBookings[key].price.toString()),
          //  new Date( listBookings[key].dateFrom.toString()),
          //  new Date( listBookings[key].dateTo.toString()),
          //  listBookings[key].userId.toString(),
          //   )
          // )
        }
      }
      return allBookings;
    }),tap(allBookings=>{
      this.myBookingList.next(allBookings)
    }))
  }

  addBooking(booking:MyBookings)
  {
  //  return this.myBookingList.pipe(take(1),delay(1000),tap((mybookings)=>{
  //    this.myBookingList.next( mybookings.concat(booking))
  //    console.log('this.myBookingList',this.myBookingList)
  //   }))


  let generateId=''
  return  this.httpClient.post<{name:string}>('https://fir-init-2f849.firebaseio.com/booking_list.json',{
     ...booking
   }).pipe(
     switchMap(resData=>{
     
       generateId = resData.name;
       return this.myBookingList
     })
     ,take(1)
     ,tap((res=>{
      booking.id = generateId;
     this.myBookingList.next(res.concat(booking))
   
   })))



  }
  cancelBooking(bookingId:string)
  {
   return this.httpClient.delete(`https://fir-init-2f849.firebaseio.com/booking_list/${bookingId}.json`)
    .pipe(
      tap(()=>{})
    )
    // return this.myBookingList.pipe(take(1),delay(1000),tap((mybookings)=>{
    //   this.myBookingList.next(mybookings.filter(myBookings=>{return myBookings.id!=bookingId}))
    // }))
  }
}
