import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Capacitor, Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import  '@ionic/pwa-elements'
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @Output() imagePick = new EventEmitter<string>()
  constructor(private alertCtrl:AlertController) { }

  ngOnInit() {}

  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera'))
    {
      this.showError()
      return;
    }

    Plugins.Camera.getPhoto({
      quality:50,
      source:CameraSource.Prompt,
      correctOrientation:true,
      resultType:CameraResultType.Uri
    }).then(image=>{
      console.log('image',image)
      this.imagePick.emit('')

    }).catch(error=>{
      this.showError()
    })
  }
    



  showError(){
    this.alertCtrl.create({header:'Cannot fetch your image',buttons:[
      {text:'Cancel',role:'cancel'}
    ]}).then(alert=>{
      alert.dismiss()
    })
  }
}
