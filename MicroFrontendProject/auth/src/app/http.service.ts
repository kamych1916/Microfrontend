import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postData(user: User){
        const body = {email: user.Login, password: user.Password};
        return this.http.post('http://localhost:8000/auth/login/', body); 
    }
}