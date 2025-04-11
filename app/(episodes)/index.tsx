//creamos nuevo archivo index.tsx
import { StyleSheet, View } from "react-native";
import { CharactersView } from "@/components/ConsumoRickAndMorty/characters/charactersView";
import { EpisodesView } from "@/components/ConsumoRickAndMorty/episodes/episodesView";

//pantalla para los personajes
export default function Episodes(){

    return(
        <EpisodesView />
        
    );
}
