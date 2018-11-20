export interface User{
    uid?:string;

    email:string;
    pass:string;
    
    nick:string;
    name:string;
    surname:string;
    
    token1?:number; //Lentilla
    token2?:number; //Cristales
    token3?:number; //Otros

    achievement_point?:number; //Puntos
    achievement_point_total?:number; //Totales acumulados
    achievement_board?:string[]; //Lista de logros desbloqueados

    xp:number;
}