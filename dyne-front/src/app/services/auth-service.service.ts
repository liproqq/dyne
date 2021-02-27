import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
     
    constructor(private http: HttpClient) {
      interface User {
        label: string;
      }
    }
      
    login(email:string, password:string ) {
        return this.http.post('/api/login', {email, password})
    }
}