import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css']
})
export class ProfileMenuComponent implements OnInit {

  //Data of the game
  percent = 50 ;
  user_rank = 0;
  user:any;
  
  total_achievement:number;
  contact_lenst_points:number;
  glasses_points:number;
  other_token:number;
  actual_points:number;

  constructor(public home$:HomeComponent) {
  //Filling data
  if (localStorage.getItem('LocalUser')){
    this.user = JSON.parse(localStorage.getItem('LocalUser'));
  
    this.total_achievement = this.user.achievement_board.length-1;
    this.contact_lenst_points = this.user.token1;
    this.glasses_points = this.user.token2;
    this.other_token = this.user.token3;
    this.actual_points = this.user.achievement_point;
  
    }
    
   }

  ngOnInit() {
  }

  logOut(){
    localStorage.removeItem("LocalUser");
    this.home$.logOut();
  }

  getPercent(){
    return this.percent+'%';
  }
}
