import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseServer = 'http://localhost:8000/api';
  private userForm: FormGroup;
  user: any;
  users: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getUsers() {
    return this.http.get(this.baseServer+'/users');
  }

  createUser(username: string, password: string, per: number, status: number){
    return this.http.post(this.baseServer+'/users', { username: username, password: password, per: per, status: status });

  }

  updateUser(id:number, username: string, password: string, per: number, status: number){
    return this.http.post(this.baseServer+'/updateuser', { id: id, username: username, password: password, per: per, status: status });

  }

  deleteUser(id: number){
    return this.http.delete(this.baseServer+'/users/'+id);
  }
}
