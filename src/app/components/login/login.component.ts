import { isPlatformBrowser, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


      // injection services here to use in class component
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Auth = inject(AuthService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID) ;
  private readonly _DestroyRef = inject(DestroyRef) ;



  successAudio!: HTMLAudioElement;
errorAudio!: HTMLAudioElement;

  constructor() {

      if (isPlatformBrowser(this._PLATFORM_ID)) {
     this.successAudio = new Audio('assets/sounds/notification-jump.wav');
     this.errorAudio = new Audio('assets/sounds/Failure_Alert.mp3');
    }

  }





  //  all sounds
  // successAudio = new Audio('assets/sounds/notification-jump.wav');
  // errorAudio = new Audio('assets/sounds/Failure_Alert.mp3');











  // login form group and controls

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['cityslicka', [Validators.required]],
  });




  // login Submit

  loginSubmit() {
    if (this.loginForm.valid) {
      this._Auth.login(this.loginForm.value).pipe(takeUntilDestroyed(this._DestroyRef)).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('App_Token', res.token);
            this.successAudio.play() ;
            this._ToastrService.success("SuccessLogin" , "BooksStore")
            this._Router.navigate(["/dashboard"]) ;
          }
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.errorAudio.play() ;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.errorAudio.play() ;
      this._ToastrService.error("please, validData to login" , "BooksStore")
    }
  }

}
