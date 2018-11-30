import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  private buy_array:any=[];
  
  constructor() {

    if (localStorage.getItem('LocalUser')) {
      let user = JSON.parse(localStorage.getItem('LocalUser'));
      let buy_board: any = [];
      buy_board = user.buy_board;
      
      for (let i = 0; i < Object.keys(buy_board).length; i++) 
      {
        this.buy_array[i] = buy_board[Object.keys(buy_board)[i]];
      }
    }

    //Load the picture
    var storage = firebase.storage();
    var pathReference = storage.ref('oferta/oferta.jpg');  

  }

  ngOnInit() {
  }

}
