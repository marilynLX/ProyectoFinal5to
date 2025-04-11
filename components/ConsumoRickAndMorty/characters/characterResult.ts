

//definimos el tipo de dato que envuelve el endpoint de characters

import { Character } from "./characterType"

export type CharactersResult={
 info:{
   pages:number,
    page:number,
    count:number,
    next: string | null,
    prev:string | null,
 }
 results: Character[],
}