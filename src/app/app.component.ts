import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {Capacitor, Plugins} from '@capacitor/core'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {

  sub :Subscription
  previousStatus:boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private authService:AuthService
  ) {
    this.initializeApp();
  }

  ngOnInit(){

    this.sub = this.authService.userIsAuthenticated.pipe(take(1)).subscribe((user)=>{
      if(!user && this.previousStatus!=user)
      {
        this.router.navigate(['auth']);
      }

      this.previousStatus = user
    })

  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }
  initializeApp() {
    this.splashScreen.hide()
    this.statusBar.hide()
    this.onNavigateToDiscover();
    // this.platform.ready().then(() => {
    // if(Capacitor.isPluginAvailable('SplashScreen'))
    // {
    //   Plugins.SplashScreen.hide()
    // }
    // });
  }

  onLogout(){
    this.authService.userLogout()
    this.router.navigate(['auth'])
  }

  onNavigateToBookings(){
    this.router.navigate(['mybookings'])
  }

  onNavigateToDiscover(){
    this.router.navigate(['places/tabs/discover'])
  }
}
