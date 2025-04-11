
//tipo character
//donde especificamos
//las propiedades de un 
//personaje
export type Character = {
 id: number;
 name: string;
 status:"Alive" | "Dead" | "unknown";
 gender:"Male" | "Female";
 origin:{
   name:string;
};
 species: string;
 location:{
    name:string;
 };
 image:string;
 episodes: string[]; 
}



 