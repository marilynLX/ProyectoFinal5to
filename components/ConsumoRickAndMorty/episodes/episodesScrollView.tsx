import { ScrollView, StyleSheet, Touchable, TouchableOpacity, View, Text, Alert, ActivityIndicator, FlatList} from "react-native";
import { EpisodesCard } from "./episodesCard";
import { Episodes } from "./episodesType";
import { useEffect, useRef, useState } from "react";
import { EpisodesResult } from "./episodesResult";
import { EpisodeSource } from "./episodesSource";


export function EpisodesScrollView(){
    //estado para los datos
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<EpisodesResult>({
        info:{
            page: 0,
            count: 0,
            next: null,
            prev: null,
            pages: 0
        },
        results: [],
    });

    const FlatListRef  =  useRef(null);

    const dataSource = new EpisodeSource();

const hundleEndReached = () => {
    if(data.info.next && !loading){
        setPage(page + 1);
    }
    
}

    useEffect(() => {
        setLoading(true);

        dataSource.getCharacters(page)
        .then((result) => {

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
    <Text style={style.personaje}>Episodes</Text>
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
                <EpisodesCard episodes={item}/>
                
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={hundleEndReached}
            onEndReachedThreshold={0.5}
            refreshing={loading}
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
    personaje:{
        fontSize:25,
        fontFamily:"Hello Valentica",
    }
})