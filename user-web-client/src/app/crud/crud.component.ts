import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../services/home.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  userForm: FormGroup;
  user: any = [];
  users: any = [];
  submitted = false;
  closeResult = '';
  action = '';

  constructor(
    private homeService: HomeService,
    private modalService: NgbModal) {
    this.getUsers();
  }

  ngOnInit() {

    // this.userFormUpdate = new FormGroup({
    //     'id': new FormControl(null,),
    //     'username': new FormControl(null, [Validators.required]),
    //     'password': new FormControl(null, [Validators.required]),
    //     'per': new FormControl(null, [Validators.required]),
    //     'status': new FormControl(null, [Validators.required]),
    //   }
    // );
    this.userForm = new FormGroup({
        'id': new FormControl(null,),
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required]),
        'per': new FormControl(null, [Validators.required]),
        'status': new FormControl(null, [Validators.required]),
      }
    );
    this.userForm.get('id').disable({onlySelf: true});
  }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getUsers() {
    return this.homeService.getUsers().subscribe(value => {
      this.users = value['data']
    })
  }

  get formField() {
    return this.userForm.controls;
  }

  // showUser(id) {
  //   console.log('Get User ' + id);
  //   return this.http.get(this.baseServer + '/' + id).subscribe(user => {
  //     this.user = user['data'];
  //   });
  // }

  createForm(content){
    this.action = 'create';
    this.userForm.get('id').setValue(null);
    this.userForm.get('username').setValue(null);
    this.userForm.get('password').setValue(null);
    this.userForm.get('per').setValue(null);
    this.userForm.get('status').setValue(null);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  createUser() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    this.homeService.createUser(this.formField.username.value, this.formField.password.value, this.formField.per.value, this.formField.status.value).subscribe(value => {
      console.log(value);
      this.action = '';
      this.getUsers();
    })
    this.submitted = false;
    this.modalService.dismissAll();
  }

  updateForm(user: any, content) {
    this.action = 'update';
    this.userForm.get('id').setValue(user.id);
    this.userForm.get('username').setValue(user.username);
    this.userForm.get('password').setValue(user.password);
    this.userForm.get('per').setValue(user.per);
    this.userForm.get('status').setValue(user.status);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateUser(){
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    console.log(this.formField.id.value);
    this.homeService.updateUser(this.formField.id.value, this.formField.username.value, this.formField.password.value, this.formField.per.value, this.formField.status.value).subscribe(value => {
      console.log(value);
      this.getUsers();
    })
    this.action = '';
    this.submitted = false;
    this.modalService.dismissAll();
  }

  deleteConfirm(id, username, content) {
    this.user.id = id;
    this.user.username = username;
    this.modalService.open(content, {ariaLabelledBy: 'modal-title-delete'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteUser(id: number) {
    this.homeService.deleteUser(id).subscribe(value => {
      this.getUsers();
    });
    this.modalService.dismissAll();
  }
}
