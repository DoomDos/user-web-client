import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../services/home.service";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../services/auth.service";

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
  currentUser = parseInt(localStorage.getItem('currentUser'));
  currentPer = parseInt(localStorage.getItem('currentPer'));

  constructor(
    private authService: AuthService,
    private homeService: HomeService,
    private modalService: NgbModal) {
    this.getUsers();
  }

  ngOnInit() {


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
      this.users = [];
      for (let tmp of value['data']){
        if (parseInt(tmp.per) >= this.currentPer){
          this.users.push(tmp);
        }
      }
    });
  }

  get formField() {
    return this.userForm.controls;
  }



  createForm(content) {
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
    this.homeService.createUser(this.currentPer, this.formField.username.value, this.formField.password.value, this.formField.per.value, this.formField.status.value).subscribe(value => {
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

  updateUser() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
    if (this.currentPer >= 3 && localStorage.getItem('currentUser') != this.formField.id.value){
      console.log("Forbidden");
      return;
    }
    this.homeService.updateUser(this.currentUser, this.formField.id.value, this.formField.username.value, this.formField.password.value, this.formField.per.value, this.formField.status.value).subscribe(value => {
      console.log(value);
      this.getUsers();
    })
    this.action = '';
    this.submitted = false;
    this.modalService.dismissAll();
  }

  deleteConfirm(id, username, per, content) {
    this.user.id = id;
    this.user.username = username;
    this.user.per = per;
    this.modalService.open(content, {ariaLabelledBy: 'modal-title-delete'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteUser(id: number, per: number) {
    if (this.currentPer == per && this.currentPer != 1) {
      this.modalService.dismissAll();
      return;
    }
    if (this.currentPer >= 3){
      this.modalService.dismissAll();
      return;
    }
    if (this.currentPer <= 2 && this.currentUser == id){
      this.modalService.dismissAll();
      return;
    }
    this.homeService.deleteUser(id).subscribe(value => {
      this.getUsers();
    });
    this.modalService.dismissAll();
  }
}
