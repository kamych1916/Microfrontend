import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
  
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
     
    postData(user: User){
        const body = {name: user.Name, surname: user.Surname, patronymic: user.Patronymic};
        return this.http.post('http://localhost:8000/search/user', body); 
    }
}