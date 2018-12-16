import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LevelService {

    constructor() {

    }

    user_lvl: number = 0;
    user_exp: number = 0;

    lvl_status:boolean = false;

    levelUp(exp:number, nv?: number){
        
        let level = 0;
        if (nv){
            level = nv;
        }

        do{
            if((exp / ((level+1)*100))>= 1){
                exp -= (level+1)*100;
                level++;
            } 

        }while ((exp / ((level+1)*100))>= 1);

        this.user_exp = exp;
        this.user_lvl = level;
    }

    getLvlUp(exp:number){
        //Check the var
        let lvl = this.user_lvl;
        //Add new Exp
        this.levelUp(exp,lvl);
        //If lvl up, return new values
        if (lvl < this.user_lvl){
            this.lvl_status = true;
        }
    }

}