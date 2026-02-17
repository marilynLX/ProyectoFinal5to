import { ScrollView, StyleSheet, Touchable, TouchableOpacity, View, Text, Alert, ActivityIndicator, FlatList} from "react-native";
import { CharacterCard } from "./characterCard";
import { Character } from "./characterType";
import { useEffect, useRef, useState } from "react";
import { CharactersResult } from "./characterResult";
import { DataSource } from "./dataSource";

export function CharactersScrollView(){
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
    const FlatListRef  =  useRef(null);
    const dataSource = new DataSource();
    const hundleEndReached = () => {
    if(data.info.next && !loading){
        setPage(page + 1);
    }
}
    //cada vez que cambie el numero de pagina, cargar los personajes
    useEffect(() => {
        setLoading(true);
        dataSource.getCharacters(page)
        .then((result) => {
            //para hacer un scroll infinito es conservar los personajes(concervar el estado actual)
            setData((prevData)=>({
                results:[...prevData.results, ...result.results],
                info: result.info,
            }));
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
            onPress={()=> {setPage(page - 1)}}
            disabled={data.info.page === null}
            >
                </TouchableOpacity>
<View style={style.pagina}>
    <Text style={style.personaje}>Personajes</Text>
    <Text>{data.results.length}</Text>
    <Text>de</Text>
    <Text>{data.info.count}</Text>
</View>
<TouchableOpacity
                onPress={()=> {setPage(page + 1)}}
                disabled={data.info.page === null}
                >
                </TouchableOpacity>
                </View> 
                {loading ? (
                <ActivityIndicator size = "large"/>
            ) : null}
            <FlatList
            ref={FlatListRef}
            data={data.results}
            renderItem={({item}) => (
                <CharacterCard character={item}/>
            )}
            keyExtractor={item => item.id.toString()}
            //mandar a disparar una accion
            onEndReached={hundleEndReached}
            //CONTROLA EN QUE PORCENTAJE SE DISPARA EL LLAMADO DE LOS PERSNAEJS CUANDO EL USUARIO NAVEGE
            onEndReachedThreshold={0.5}
            refreshing={loading}
            //mandamos el spinner hasta el final
            ListFooterComponent={loading ? <ActivityIndicator size="large"/> 
                : undefined}
            />           
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
    personaje:{
        fontSize:25,
        fontFamily:"Hello Valentica",
    },

})