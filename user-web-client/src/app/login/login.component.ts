import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required]),
    })
    this.route.data.subscribe(value => {
      if (value['action'] == 'logout'){
        this.authService.logout();
        this.router.navigate(['login']);
      }
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formField() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }

      this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(
        (response) => {
          this.router.navigate(['/dashboard/user-list']);
        },
        (error) => {
          this.alertService.error(error);
          console.log(this.alertService.error(error));
        }
      );
    // this.authService.login(this.formField.username.value, this.formField.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //     });
  }
}
