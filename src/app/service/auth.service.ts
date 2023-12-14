import { Injectable } from '@angular/core';
import { Auth , UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

currentUser = authState(this.auth);

  constructor(private auth: Auth ) { }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email:string , password: string){
    return from( signInWithEmailAndPassword(this.auth, email, password));
  }


  logout(){
    return from(this.auth.signOut());
  }


}
