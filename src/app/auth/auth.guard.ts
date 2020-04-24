import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService:AuthService, private router:Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
     return  this.authService.userIsAuthenticated.pipe(take(1),switchMap(user=>{
         if(!user)
         {
          return this.authService.checkAuthLogin()
         }
         return of(user)
       }),
       tap(userId=>{
        console.log('userId',userId)
       if(!userId){
         this.router.navigate(['auth']);
       }
     }))
   
  }
}
