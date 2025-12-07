import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


   // injection service http client to use method get, post, and to use endpoints
   private readonly _HttpClient = inject(HttpClient) ;





   // login funcation

   login(loginForm:object):Observable<any> {
     return this._HttpClient.post(`${environment.baseUrlForLogin}/api/login` , loginForm ,

       {headers:{'x-api-key': 'reqres_bfaa313a6a084fcea53706198f84e0b7'}}
      )
   }







}
