
//crear la clase Datasource

import { EpisodesResult } from "./episodesResult";
import { Episodes } from "./episodesType";

export class EpisodeSource{

    constructor(){}

   async getCharacters(page:number): Promise<EpisodesResult> {
        const response = await fetch (`https://rickandmortyapi.com/api/episode?page=${page}`);
      
        return response.json();
    }
}