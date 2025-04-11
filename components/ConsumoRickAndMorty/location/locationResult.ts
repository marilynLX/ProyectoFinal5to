

//definimos el tipo de dato que envuelve el endpoint de characters

import { Location } from "./locationType"

export type LocationResult={
 info:{
    page:number,
    pages:number,
    count:number,
    next: string | null,
    prev:string | null,
 }
 results: Location[],
}