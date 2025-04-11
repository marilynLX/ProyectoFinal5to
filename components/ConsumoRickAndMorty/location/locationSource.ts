


//crear la clase Datasource

import { LocationResult } from "./locationResult";
import { Location } from "./locationType";

export class LocationSource{

    constructor(){}

   async getCharacters(page:number): Promise<LocationResult> {
        const response = await fetch (`https://rickandmortyapi.com/api/location?page=${page}`);
      
        return response.json();
    }
}  