import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup ;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ){
    this.signUpForm =this.fb.group ({
      name: ['', [Validators.required ]],
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required ]],
      confirmPassword: ['', [Validators.required]],
    },{ validators: passwordsMatchValidator() })
  }
  submit() {
    const { name, email, password } = this.signUpForm.value;
    this.authService.signUp(email, password)
    .subscribe(() =>{
      this. router.navigate(['/login'])
    })
  }

}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
