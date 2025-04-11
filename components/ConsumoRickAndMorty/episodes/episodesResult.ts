

//definimos el tipo de dato que envuelve el endpoint de characters

import { Episodes } from "./episodesType"

export type EpisodesResult={
 info:{
   pages:number,
    page:number,
    count:number,
    next: string | null,
    prev:string | null,
 }
 results: Episodes[],
}