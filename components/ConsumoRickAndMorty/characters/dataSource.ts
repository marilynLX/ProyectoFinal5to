


//crear la clase Datasource

import { CharactersResult } from "./characterResult";
import { Character } from "./characterType";

export class DataSource{

    constructor(){}

   async getCharacters(page:number): Promise<CharactersResult> {
        const response = await fetch (`https://rickandmortyapi.com/api/character?page=${page}`);
      
        return response.json();
    }
}