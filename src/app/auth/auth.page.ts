import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = false;
  constructor(private authService:AuthService, private router:Router, 
    private loadingController:LoadingController, private alertController:AlertController) { }

  ngOnInit() {
  }

  loginUser(email,password){

    this.loadingController.create({keyboardClose:true, message:'Loading...'}).then((data)=>{
      data.present()
      let obs : Observable<Object>;
      if(this.isLogin)
      {
          obs = this.authService.userLoginApi(email,password); 
      }
      else
      {
        obs = this.authService.userSignup(email,password);
      }
      
      obs.subscribe(resData=>{
        console.log('resData',resData)
        this.authService.userLogin();
        data.dismiss()
        this.router.navigate(['places/tabs/discover'])     
      },error=>{
        console.log('error',error)
        data.dismiss()
        this.alertController.create({
          message:'Something went wrong...',
          buttons:[
            {
              text:'Okay'
            }
          ]
        }).then(alert=>{
          alert.present()
        })
      })
      
    })

 
 
  }
  onSubmit(form:NgForm){
    if(form.invalid)
    {
        return;
    }

    const email = form.value.email
    const password = form.value.password
      this.loginUser(email,password);
      form.reset()
  

  }

  toSwitchAuthenticate(){
this.isLogin = !this.isLogin;
  }
}
