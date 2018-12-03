import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  private buy_array: any = [];

  constructor() {

    if (localStorage.getItem('LocalUser')) {
      let user = JSON.parse(localStorage.getItem('LocalUser'));
      let buy_board: any = [];

      if (user.buy_board) {
        buy_board = user.buy_board;
        for (let i = 0; i < Object.keys(buy_board).length; i++) {
          this.buy_array[i] = buy_board[Object.keys(buy_board)[i]];
        }
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
