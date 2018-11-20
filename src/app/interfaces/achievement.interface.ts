export interface Achievement{
    //Default charge false
    id?:number;
    isCollapsed?:boolean;

    //Cost of the achievement
    cost:number;
    token?:number;
    type_token?:number;
    
    //Reward its going to be a new interface
    
    //Data of the achievement
    name:string;
    description:string;
    experience:number;
    
    //Default false
    unlock:boolean;
}