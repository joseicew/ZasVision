import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LevelService } from "../../services/level.service";
import { Router, RouteConfigLoadEnd } from "@angular/router";
import { User } from "../../interfaces/user.interface";
import * as firebase from "firebase";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public user: any;
  public ach_list: any = [];
  public key:string;

  constructor(public authService: AuthService, private router: Router, private level$:LevelService) {
    //Al inicializar el programa cogeremos los datos del usuario para guardarlos en la Variable User.
    this.authService.getUsers().subscribe(data => {
      console.log("All users" + data);

      //Al entrar un usuario lo restacamos para poder cargar sus datos
      firebase.auth().onAuthStateChanged(getuser => {
        if (getuser) {
          console.log(getuser.email);

          for (let user in data) {
            
            if (data[user].email == getuser.email) {
              console.log("Usuario encontrado");
              this.user = data[user];
              this.user.pass='';
              
              //Local Storage
              localStorage.setItem("LocalUser", JSON.stringify(this.user));

              //Lvl up the user in local vars
              level$.levelUp(this.user.xp);
              
            }
          }

          this.key = this.authService.getKey(data,this.user.email);
        }
      });
    });
  }

  getUser() {
    return this.user;
  }
  getAch() {
    return this.ach_list;
  }

  lvlUpAlert(){
    //Call a set value of the inner HTML to show the Alert
    console.log("Level UP");
  }

  ngOnInit() {}

  logOut() {
    this.authService.logOut();
  }
}
