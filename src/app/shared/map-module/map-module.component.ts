import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-map-module',
  templateUrl: './map-module.component.html',
  styleUrls: ['./map-module.component.scss'],
})
export class MapModuleComponent implements OnInit, AfterViewInit {

  @ViewChild('mapComp',{static:false}) mapElementRef:ElementRef;

  constructor(private modalController:ModalController, private renderer:Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.onMapLoading().then((moduleMap)=>{
      const element = this.mapElementRef.nativeElement;
      const googleMap = new moduleMap.Map(element,{
        center:{lat:73.26,lng:54.00},
        zoom:10
      })

      moduleMap.event.addListenerOnce(googleMap,'idle',()=>{
        this.renderer.addClass(element,'visible')
      })


      moduleMap.addListner('click',(event)=>{
        const selectedCorrd = {
          lat : event.latLng.lat(),lng:event.latLng.lng()
        }
        this.modalController.dismiss(selectedCorrd)
      })

    }).catch((e)=>{
      console.log('Error',e)
    })
  }

  onMapLoading():Promise<any>{
    const win = window as any;
    const google = win.google

    if(google && google.maps)
    {
      return new Promise((resolve,reject)=>{
        resolve(google.maps)
      })
    }
    else
    {
      return new Promise((resolve,reject)=>{
        const script = document.createElement('script')
        script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCm5YhLzTTUkHAjF2jogU5uszk-IVkxh_0";
        script.defer=true;
        script.async=true;
        document.body.appendChild(script);
        script.onload = ()=>{
          const googleMod = win.google
          if(googleMod && googleMod.maps)
          {
            resolve(googleMod.maps)
          }
          else
          {
            reject('Error')
          }
        }
        
      })
    }
  }

  onCancel(){
      this.modalController.dismiss()
  }

}
