import { View, Text, Image } from "react-native"
import { Episodes } from "./episodesType"
import { StyleSheet } from "react-native"

type Props = {
    episodes: Episodes;
}

export function EpisodesCard({episodes}: Props){

    return(
        
        <View style={style.card}>
             <Image
        style={style.image}
        source={require('../../../assets/images/episode.jpg')} 
      />
          <View style={style.content}>
            <View style={style.row}>
            <Text style={style.name}>{episodes.name}</Text>
            </View>
            <Text style={style.date1}>Fecha de emision:</Text>
            <Text style={style.date}>{episodes.air_date}</Text>
            <Text style={style.date1}>Episode:</Text>
            <Text style={style.episode}>{episodes.episode}</Text>
            <Text style={style.date1}>Characters: </Text>
            <Text style={style.episode}>{episodes.characters.length}</Text>
            <Text style={style.date1}>Creación:</Text>
            <Text style={style.episode}>{episodes.created}</Text>
          </View>
          </View>
    
    );
}
const style = StyleSheet.create({
    card:{
        borderRadius:8,
        display: "flex",
        flexDirection:"row",
        width:"100%",
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"#a5e0cc",
        marginVertical:6,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    image:{
        width: 120, 
        height: 193,
        borderTopLeftRadius:8,
        borderEndStartRadius:8,
        objectFit:"cover",
    },
    content:{
        padding:6,
        display:"flex",
        flexDirection:"column",
        gap:4,
    },
    name:{
        fontSize:20,
        fontFamily:"Hello Valentica",
        textAlign:"justify",
    },
    date:{
        fontSize:11,
        fontFamily:"Century Gothic",
        textAlign:"justify",
    },
    episode:{
        fontSize:11,
        fontFamily:"Century Gothic",
        textAlign:"justify",
    },
   row:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:4,
   },
   date1:{
    fontWeight:"700",
    fontSize:11,
   }
})