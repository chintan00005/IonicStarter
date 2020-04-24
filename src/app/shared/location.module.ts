import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LocationComponentComponent } from './pickers/location-component/location-component.component';
import { MapModuleComponent } from './map-module/map-module.component';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

@NgModule({
  declarations: [LocationComponentComponent, MapModuleComponent, ImagePickerComponent],
  exports:[LocationComponentComponent,MapModuleComponent, ImagePickerComponent],
  entryComponents: [MapModuleComponent],
  imports: [CommonModule, IonicModule],

})
export class SharedModule {}
