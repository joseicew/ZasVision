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
  pass_test:string;

  constructor(private authService:AuthService, public router: Router) { }

  guardar(){
    if (this.pass_test!= this.user.pass){
      console.log("Las contraseñas no son iguales");
    }else{
      this.authService.guardar(this.user).subscribe(
        data => {
          this.router.navigate(["/home"]);
        },
        error => console.error(error)
      );
    }
  }

  ngOnInit() {
  }

}
