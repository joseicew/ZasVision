import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { User } from "../../interfaces/user.interface";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //Interface User Empity
   user: User = {
    email:'',
    pass:'',
    nick:'',
    name:'',
    surname:'',
    token1:0, 
    token2:0,
    token3:0,
    xp:0,
    achievement_point:0,
    achievement_board:[""],
}
  // Check of the Alters of the Password
  pass_test:string;
  pass_different = false;
  pass_short = false; 
  
  constructor(private authService:AuthService, public router: Router) { }

  setFalse(){
    this.pass_short=false;
    this.pass_different = false;
  }

  //If all data its correct it saves in the DataBase and create the user, then it goes to the home page
  guardar(){
    if(this.user.pass.length < 6) {
      this.pass_short=true;
      if(this.pass_test!= this.user.pass) {this.pass_different = true;}
    }else if (this.pass_test!= this.user.pass){
      this.pass_different = true;
    }else{
      this.authService.guardar(this.user).subscribe(
        data => {
          this.router.navigate(["/home"]);
          debugger
        },
        error => console.error(error)
      );
    }
  }

  ngOnInit() {
  }

}
