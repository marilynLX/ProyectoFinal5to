import { ScrollView, StyleSheet, Touchable, TouchableOpacity, View, Text, Alert, ActivityIndicator, FlatList} from "react-native";
import { CharacterCard } from "./characterCard";
import { Character } from "./characterType";
import { useEffect, useState } from "react";
import { CharactersResult } from "./characterResult";
import { DataSource } from "./dataSource";


export function CharactersView(){
    //estado para los datos
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<CharactersResult>({
        info:{
            pages:0,
            page:0,
            count:0,
            next:null,
            prev:null,
        },
        results: [],
    });

    const dataSource = new DataSource();

    //cada vez que cambie el numero de pagina, cargar los personajes
    useEffect(() => {
        setLoading(true);

        dataSource.getCharacters(page)
        .then((result) => {
            setData(result);
        })
        .catch((error) => {
            Alert.alert(`Error: ${error.message}`);
        })
        .finally(() => {
            setLoading(false);
        })
        //ToDo: catch
    }, [page]);

  

    return( 

       <View style={style.scrollview}>
        <View style={style.pagginator}>
            <TouchableOpacity 
            style={style.button}
            onPress={()=> {setPage(page - 1)}}
            disabled={data.info.page === null}
            >

<Text style={style.buttonText}>Anterior</Text>
                </TouchableOpacity>


<View style={style.pagina}>
    <Text>Página</Text>
    <Text>{page}</Text>
    <Text>de</Text>
    <Text>{data.info.pages}</Text>
</View>

<TouchableOpacity
                style={style.button}
                onPress={()=> {setPage(page + 1)}}
                disabled={data.info.page === null}
                >
    <Text style={style.buttonText}>Siguiente</Text>
                </TouchableOpacity>

                </View> 
                {loading ? (
                <ActivityIndicator size = "large"/>
            ) : null}

            <FlatList
            data={data.results}
            renderItem={({item}) => (
                <CharacterCard character={item}/>
                
            )}
            keyExtractor={item => item.id.toString()}/>
 
            {/*{loading ? null : data.results.map((item) => (
                <CharacterCard
                    key={item.id}
                    character={item}
                /> 
            ))*/}
           
        </View>
    )
}
const style = StyleSheet.create({
    scrollview:{
        width:"100%",
        marginTop:15,
        flex:1,
        padding:5,
        backgroundColor:'white',
    },
    pagginator:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        margin:12,
    },
    button:{
        backgroundColor:"#608a7e",
        paddingHorizontal:16,
        paddingVertical:8,
        borderRadius:12,
    },
    buttonText:{
        color:"#FFF",
        fontSize:16,
    },
    pagina:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:4,
    },
})