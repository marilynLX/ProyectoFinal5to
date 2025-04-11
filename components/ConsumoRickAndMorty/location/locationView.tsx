import { ScrollView, StyleSheet, Touchable, TouchableOpacity, View, Text, Alert, ActivityIndicator, FlatList} from "react-native";
import { LocationCard } from "./locationCard";
import { Location } from "./locationType";
import { useEffect, useState } from "react";
import { LocationResult } from "./locationResult";
import {LocationSource } from "./locationSource";


export function LocationView(){
    //estado para los datos
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<LocationResult>({
        info:{
            pages:0,
            page:0,
            count:0,
            next:null,
            prev:null,
        },
        results: [],
    });

    const dataSource = new LocationSource();

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
                <LocationCard location={item}/>
            )}
            keyExtractor={item => item.id.toString()}/>
        </View>
    )
}
const style = StyleSheet.create({
    scrollview:{
        width:"100%",
        marginTop:15,
        flex:1,
        padding:5,
        backgroundColor:"white",
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