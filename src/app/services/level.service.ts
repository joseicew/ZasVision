import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LevelService {

    constructor() {

    }

    user_lvl: number = 0;
    user_exp: number = 0;

    levelUp(exp:number, nv?: number){
        
        let level = 0;
        if (nv){
            level = nv;
        }

        do{
            //console.log((exp / (level+1)*100)+"Status:"+((exp / (level+1)*100)>= 1));
            
            //console.log("XP1 : "+exp+" LVL:"+level+" Status:"+((exp / ((level+1)*100))>= 1));
            if((exp / ((level+1)*100))>= 1){
                exp -= (level+1)*100;
                level++;
                //console.log("XP2 : "+exp+" LVL:"+level);
            } 

        }while ((exp / ((level+1)*100))>= 1);

        this.user_exp = exp;
        this.user_lvl = level;
        console.log(this.user_lvl);
        
        
    }

    getLvlUp(exp:number){
        //Check the var
        let lvl = this.user_lvl;
        //Add new Exp
        this.levelUp(exp,lvl);
        //If lvl up, return new values
        if (lvl < this.user_lvl){
            //this.home$.lvlUpAlert();
        }
    }

}