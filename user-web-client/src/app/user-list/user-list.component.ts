import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  constructor(
    private http:HttpClient,
    private homeService: HomeService
  ) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    return this.homeService.getUsers().subscribe(value => {
      this.users = value['data']
    })
  }

}
