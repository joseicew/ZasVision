import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";



@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  //Vars
  private buy_array: any = [];

  constructor() {

    // Taking data from the LocaStorage
    if (localStorage.getItem('LocalUser')) {

      let buy_board: any = [];
      let user = JSON.parse(localStorage.getItem('LocalUser'));

      buy_board = user.buy_board;
      
      //List of shoppings 
      for (let i = 0; i < Object.keys(buy_board).length; i++) {
        this.buy_array[i] = buy_board[Object.keys(buy_board)[i]];
      }

    }

    //Load the picture
    var storage = firebase.storage();
    var pathReference = storage.ref('ofertas/oferta.jpg');

    pathReference.getDownloadURL().then(function (url) {

      let img = document.getElementById('oferta') as HTMLImageElement;
      img.src = url;

    })
  }

  ngOnInit() {
  }

}
