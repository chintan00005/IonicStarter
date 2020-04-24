import { Injectable } from "@angular/core";
import { Place } from "./places.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map, delay, tap, switchMap } from "rxjs/operators";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    // new Place(
    //   "1",
    //   "Viman Nagar",
    //   "Costly to rent",
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg",
    //   25000,
    //   new Date("2019-01-01"),
    //   new Date("2020-12-31"),
    //   this.authService.getUserId()
    // ),
    // new Place(
    //   "2",
    //   "Andheri",
    //   "One of the best area",
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg",
    //   35000,
    //   new Date("2019-01-01"),
    //   new Date("2020-12-31"),
    //   this.authService.getUserId()
    // ),
    // new Place(
    //   "3",
    //   "Chandani Chowk",
    //   "Most famous area of the town",
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg",
    //   25000,
    //   new Date("2019-01-01"),
    //   new Date("2020-12-31"),
    //   this.authService.getUserId()
    // ),
  ]);

  constructor(public authService: AuthService, private httpClient: HttpClient) {}

  getPlaces() {
    return this.places.asObservable();
  }

  getPlacesFromServer() {
    return this.httpClient.get('https://fir-init-2f849.firebaseio.com/places_list.json')
    .pipe(map((listPlaces)=>{
      const allPlaces=[];
      for(let key in listPlaces)
      {
        if(listPlaces.hasOwnProperty(key))
        {
          allPlaces.push(
            new Place(key.toString(),
            listPlaces[key].title.toString(),
            listPlaces[key].description.toString(),
            listPlaces[key].image.toString(),
            parseFloat( listPlaces[key].price.toString()),
           new Date( listPlaces[key].dateFrom.toString()),
           new Date( listPlaces[key].dateTo.toString()),
            listPlaces[key].userId.toString(),
            )
          )
        }
      }
      return allPlaces;
    }),tap(allPlaces=>{
      this.places.next(allPlaces)
    }))
  }

  getItem(id: string) {
    return this.httpClient.get<Place>(`https://fir-init-2f849.firebaseio.com/places_list/${id}.json`)
    .pipe(tap(resData=>{
      if(resData)
      {
        resData.id = id;
      }
     
      return resData;
    }))
    // return this.places.pipe(take(1),
    //   map((places) => {
    //     return places.find((data) => {
    //       return data.id === id;
    //     });
    //   })
    // );
  }

  editItem(item:Place, id:string)
  {            
             return this.httpClient.put(`https://fir-init-2f849.firebaseio.com/places_list/${id}.json`,{
                ...item, id:null
              }).pipe(tap(()=>{
              }))
  }

  addPlace(
    title: string,
    des: string,
    price: number,
    fromDate: Date,
    toDate: Date
  ) {
    let newPlace;
    let generateId;
   return  this.authService.getUserId().pipe(take(1),switchMap(userId=>{
      newPlace = new Place(
        null,
        title,
        des,
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1200px-Above_Gotham.jpg",
        price,
        fromDate,
        toDate,
        userId
      );
      return  this.httpClient.post<{name:string}>('https://fir-init-2f849.firebaseio.com/places_list.json',{
         ...newPlace
       })

    }),
    switchMap(resData=>{
      generateId = resData.name;
      return this.places
    })
    ,take(1)
    ,tap((res=>{
      newPlace.id = generateId;
    this.places.next(res.concat(newPlace))
  }))
    
    )
  
 

  
 
  }
}
