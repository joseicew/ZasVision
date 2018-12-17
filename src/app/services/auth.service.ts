import { Injectable, RootRenderer } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { User } from '../interfaces/user.interface';

import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { error } from "@angular/compiler/src/util";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Generic Route of all users
  ZV_usersURL: string =
    "https://zasvision-86b04.firebaseio.com/User.json";
  
  //Route of a single user, need to add user+.json
  ZV_userURL: string =
    "https://zasvision-86b04.firebaseio.com/User";

  //Route of all the achievements
  ZV_achievementsURL: string =
    "https://zasvision-86b04.firebaseio.com/achievements.json";

  public logInError:boolean=false;
  public createError:boolean=false;
  public createError_alert:boolean=false;

  constructor( 
    public router: Router, 
    public afAuth: AngularFireAuth,
    private http: Http) {
      this.logInError = false;
  }

  logIn(email: string, pass: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        if (error) {
          this.logInError = true;        
        }
      });

    }

  logOut() {
    this.afAuth.auth
      .signOut()
      .then(() =>  {
        this.router.navigate(["/login"]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  createUser(email: string, pass: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, pass)
      .catch((error) => {
        if (error) {
          this.createError=true;
          this.router.navigate(["/login"]);
        } else {
          this.router.navigate(["/home"]);
        }
      });
  }

  guardar(user: User) {
    this.createUser(user.email ,user.pass);
    if (!this.createError){
      console.log("Error");
      this.logIn(user.email ,user.pass);

      let body = JSON.stringify(user);
      let headers = new Headers({
        "Content-Type": "application/json"
      });
      
      return this.http.post(this.ZV_usersURL, body, { headers }).pipe(
          map(res => {
            console.log(res.json);
            return res.json();
          })
        );
    }else{
      this.createError=false;
      this.createError_alert=true;
    }
  }

  getUser(key$: string) {
    let url = `${this.ZV_userURL}/${key$}.json`;
    return this.http.get(url).pipe(map(res => res.json()));
  }

  actualizarUser(user: User, key$: string) {
    let body = JSON.stringify(user);
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    localStorage.setItem('LocalUser', JSON.stringify(user));
    let url = `${this.ZV_userURL}/${key$}.json`;
    
    return this.http.patch(url, body, { headers })
    .pipe(
      map(res => {
        console.log(res.json);
        return res.json();
      })
    );
  }

  borrarUser(key$:string){
    let url = `${this.ZV_userURL}/${key$}.json`;

    return this.http.delete(url).pipe(
      map(res=> res.json())
    )
  }

  getKey(users:any,email:string){
    
    for(let i = 0 ; i< Object.keys(users).length ; i++ ){
      if(users[Object.keys(users)[i]].email == email){
        return Object.keys(users)[i];
      }
    }

  return "false";
  }

  getUsers() {
    return this.http.get(this.ZV_usersURL).pipe(map(res => res.json()));
  }

  getAchievements() {
    return this.http.get(this.ZV_achievementsURL).pipe(map(res => res.json()));
  }
}

