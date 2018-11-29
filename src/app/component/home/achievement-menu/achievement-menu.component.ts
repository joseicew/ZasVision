import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { LevelService } from "src/app/services/level.service";
import { HomeComponent } from "../home.component";
import { Achievement } from "../../../interfaces/achievement.interface";
import { stringify } from "@angular/core/src/render3/util";

@Component({
  selector: "app-achievement-menu",
  templateUrl: "./achievement-menu.component.html",
  styleUrls: ["./achievement-menu.component.css"]
})
export class AchievementMenuComponent implements OnInit {
  public ach_list: any = [];
  private ach_board: any = [];

  constructor(public authService: AuthService, public home$: HomeComponent, public level$:LevelService) {
    this.ach_list = this.home$.getAch();

    if (localStorage.getItem('LocalUser')){
      let user = JSON.parse(localStorage.getItem('LocalUser'));
      //console.log("carga de datos: "+user);
      this.ach_board = user.achievement_board; 
    }
    

    if (this.ach_list.length == 0) {
      this.authService.getAchievements().subscribe(data => {
        if (data) {
          for (let i = 0; i < Object.keys(data).length; i++) {
            this.ach_list[i] = data[Object.keys(data)[i]];
            this.ach_list[i].id = Object.keys(data)[i];
            let exist = this.ach_board.filter(
              achi => achi === this.ach_list[i].id
            );
            if (exist.length > 0) {

              this.ach_list[i].unlock = true;
            } else {
            }
          }
        }
      });
    } else {
      for (let i = 0; i < this.ach_list.length; i++) {
        let exist = this.ach_board.filter(achi => achi === this.ach_list[i].id);
        
        if (exist.length > 0) {
          this.ach_list[i].unlock = true;
        } else {
        }
      }
    }
  }

  buy(unlock: boolean, ach: Achievement) {
    if (!unlock) {
      if (this.canBuyToken(ach) && this.canBuyPoints(ach)) {
        this.updatePoints(ach);
        return true;
      }
    }
    return false;
  }

  canBuyPoints(ach: Achievement) {
    if (ach.cost <= this.home$.getUser().achievement_point) {
      return true;
    } else return false;
  }

  canBuyToken(ach: Achievement) {
    let token_used: number = ach.type_token;
    if (token_used == 0) {
      //No hay token especiales
      return true;
    } else {
      //Tiene de esos tokens??
      switch (token_used.toString()) {
        case "1":
          if (ach.token <= this.home$.getUser().token1) {
            return true;
            break;
          } else return false;
        case "2":
          if (ach.token <= this.home$.getUser().token2) {
            return true;
            break;
          } else return false;
        case "3":
          if (ach.token <= this.home$.getUser().token3) {
            return true;
            break;
          } else return false;
        default:
          return false;
      }
    }
  }

  updatePoints(ach: Achievement) {
    //Cost
    this.home$.getUser().achievement_point -= ach.cost;

    //Special Tokens
    let token_used: number = ach.type_token;
    console.log("Token type: "+token_used);
    if (token_used != 0)
      switch (token_used.toString()) {
        case "1":
          this.home$.getUser().token1 -= ach.token;
          //console.log(this.home$.getUser().token1 - ach.token);
          break;
          case "2":
          this.home$.getUser().token2 -= ach.token;
          //console.log(this.home$.getUser().token2- ach.token);
          break;
          case "3":
          this.home$.getUser().token3 -= ach.token;
          //console.log(this.home$.getUser().token3 - ach.token);
          break;
        default:
          break;
      }

    //Add the achievmenet to the board
    this.ach_board.push(ach.id);
    //console.log(this.ach_board);
    
    let key = this.home$.key;
    
    //Load the new board
    this.home$.getUser().achievement_board=this.ach_board;
    
    //Check a Level Up
    console.log();
    this.home$.getUser().xp = Number(this.home$.getUser().xp)+Number(ach.experience);
    this.level$.getLvlUp( this.home$.getUser().xp);

    if (this.level$.lvl_status){
      this.home$.levelAlert();
    }

    localStorage.setItem("LocalUser", JSON.stringify(this.home$.getUser()));

    this.authService
      .actualizarUser(this.home$.getUser(), key)
      .subscribe(updateUser => {
        console.log(updateUser);
      });
  }

  ngOnInit() {}
}
