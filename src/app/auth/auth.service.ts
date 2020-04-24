import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {UserModal} from './auth.model'
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModal>(null);

  get userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.getToken();
        } else {
          return false;
        }
      })
    );
  }

  private isLoggedIn=false

  constructor(private httpClient:HttpClient) { }

  checkAuthLogin(){
    return from(Plugins.Storage.get({key:'user'})).pipe(map(userValue=>{

      if(!userValue || !userValue.value)
      {
        return null;
      }

      const user = JSON.parse(userValue.value);

      const expTime = new Date(user.expDate)
      if(expTime<=new Date())
      {
        return null
      }

      return user
    }),tap(userValue=>{

      this.user.next(userValue)
    }),map(user=>{
      return !!user
    }))
  }

  getLogin(){
    return this.isLoggedIn;
  }

  userLogin(){
    this.isLoggedIn=true;
   // this.user.next(new User())
  }

  userLogout(){
    this.isLoggedIn=false;
    this.user.next(null)
    Plugins.Storage.remove({key:'user'})
  }

  getUserId(){
    return this.user.asObservable().pipe(map((user)=>{
      if(user)
      {
        return user.id
      }
      else
      {
        return null
      }
    }))
  }

  getUserToken(){
    return this.user.asObservable().pipe(map((user)=>{
      if(user)
      {
        return !!user.getToken()
      }
      else
      {
        return null
      }
    }))
  }

  userSignup(valueEmail,valuePassword){
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVZnrDSqrgxx_930X2OQrmkX9OOIvrLEU`,
    {
      email:valueEmail,
      password:valuePassword,
      returnSecureToken:true
    }).pipe(tap(resData=>{
      this.setUserObject(resData);
  }))
  }
  userLoginApi(valueEmail,valuePassword){
    return this.httpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVZnrDSqrgxx_930X2OQrmkX9OOIvrLEU`,
    {
      email:valueEmail,
      password:valuePassword,
      returnSecureToken:true
    }).pipe(tap(resData=>{
        this.setUserObject(resData);
    }))
  }

  setUserObject(resData){
    let expirationTime = new Date(new Date().getTime() + (resData.expiresIn * 1000))
   let user =  new UserModal(resData.localId,resData.email,expirationTime,resData.idToken);
    this.user.next(user)
    this.storeObjectInDevice(resData.localId,resData.idToken,expirationTime.toISOString(),resData.email)
  }


  storeObjectInDevice(id:string,token:string,expDate:string, email:string){
    const user = JSON.stringify({id,token,expDate,email})
    Plugins.Storage.set({
      key:'user',value:user
    })
  }
}
