import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {
  email: string = "";
  pass: string = "";
  uid:any = '';
  wrongData:boolean=true;

  constructor(public authService: AuthService) {
    if (localStorage.getItem('LocalUser')){
      localStorage.removeItem('LocalUser');
    }
  }
  
  ngOnInit() {}

  logIn(email: string, pass: string,) {
    this.authService.logIn(email, pass);

  }
  createUser(email: string, pass: string,) {
    this.authService.createUser(email, pass);
  }
}
