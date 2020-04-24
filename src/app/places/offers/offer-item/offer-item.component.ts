import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../places.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input() i:Place;

  constructor(private router:Router) { }

  ngOnInit() {}
  onNavigateDetails(id:string){
    this.router.navigate(['places/tabs/offers/'+id])
  }

  getDummyDate(){
    return new Date();
  }
}
