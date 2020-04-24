import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { MapModuleComponent } from '../../map-module/map-module.component';
import {Capacitor, Plugins} from '@capacitor/core'

@Component({
  selector: 'app-location-component',
  templateUrl: './location-component.component.html',
  styleUrls: ['./location-component.component.scss'],
})
export class LocationComponentComponent implements OnInit {

  constructor(private modalController:ModalController,
    private alertCtrl : AlertController,
    private actionCtrl : ActionSheetController) { }

  ngOnInit() {}
  onPickLocation(){
  this.actionCtrl.create({header:'Select any option',buttons:[
    {text:'Pick Location',handler:()=>{
      this.getLocation()
    }},
    {text:'Open Map',handler:()=>{
      this.showMap()
    }},
    {
      text:'Cancel',role:'cancel'
    }
  ]}).then(dialog=>{
    dialog.present()
  })
  }

  getLocation(){
    if(!Capacitor.isPluginAvailable('Geolocation'))
    {
      this.showError()
      return;
    }

    Plugins.Geolocation.getCurrentPosition().then(
      (currentLocation)=>{
        console.log('currentLocation',currentLocation)
      }
    ).catch(()=>{
      this.showError()
    })
  }
    

  showMap(){
    this.modalController.create({component:MapModuleComponent}).then((modal)=>{
      modal.present()
      modal.onDidDismiss().then(data=>{
        console.log('modalData',data)
      })
    })
  }

  showError(){
    this.alertCtrl.create({header:'Cannot fetch your location',buttons:[
      {text:'Cancel',role:'cancel'}
    ]}).then(alert=>{
      alert.dismiss()
    })
  }

}
