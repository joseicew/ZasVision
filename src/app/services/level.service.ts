import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LevelService {

    constructor() {

    }

    levelUp(exp:number, nv?: number){
        
        let level = 0;
        let  more = true; // Can lvl up more times
        if (nv){
            level = nv;
        }

        do{
            //console.log((exp / (level+1)*100)+"Status:"+((exp / (level+1)*100)>= 1));
            
            console.log("XP1 : "+exp+" LVL:"+level+" Status:"+((exp / ((level+1)*100))>= 1));
            if((exp / ((level+1)*100))>= 1){
                exp -= (level+1)*100;
                level++;
                //console.log("XP2 : "+exp+" LVL:"+level);
            } 

        }while ((exp / ((level+1)*100))>= 1);
        return [level,exp];
    }

}