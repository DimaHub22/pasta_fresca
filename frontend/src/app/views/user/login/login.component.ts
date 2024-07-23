import {Component, OnDestroy, OnInit} from '@angular/core';
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {ServiceAuthService} from "../../../shared/services/service-auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  aSub: Subscription = new Subscription()

  constructor(private fb: NonNullableFormBuilder,
              private serviceAuth: ServiceAuthService,
              private router: Router, private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params['accessDenied']) {
          // this._snackBar.open('Авторизуйтесь в системе')
        } else if (params['sessionFailed']) {
          // this._snackBar.open('Войдите в систему заного')
        }
      })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmint() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.loginForm.disable()
      this.aSub = this.serviceAuth.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard'])
          },
          error: (e) => {
            this._snackBar.open(e.error.message)
            this.loginForm.enable()
          }
        })
    }


  }
}
