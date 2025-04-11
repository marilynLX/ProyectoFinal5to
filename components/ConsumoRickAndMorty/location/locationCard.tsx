import { View, Text, Image } from "react-native"
import { Location } from "./locationType"
import { StyleSheet } from "react-native"

type Props = {
    location: Location;
}

export function LocationCard({location}: Props){

    return(
        <View style={style.card}>
               <Image
                    style={style.image}
                    source={require('../../../assets/images/location.jpg')} 
                  />
          <View style={style.content}>
           <View>
            <Text style={style.status1}>Name:</Text>
            <Text>{location.name}</Text>
            <Text style={style.status1}>Type::</Text>
            <Text>{location.type}</Text>
            <Text style={style.status1}>Dimension:</Text>
            <Text>{location.dimension}</Text>
            <Text style={style.status1}>Residents:</Text>
            <Text>{location.residents.length}</Text>

            <View style={style.row}>
            </View>
            </View>
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
        width:"40%",
        height:"100%",
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
        fontSize:30,
        fontFamily:"Hello Valentica",
    },
    status1:{
     fontSize:9,
     fontWeight:"700",
    },
    status:{
        fontSize:10,
       },
    origin:{
        fontSize:10,
        color:"bbbb",
    },
    origin1:{
        fontSize:9,
        fontWeight:"700",
        color:"black",
    },
   statusCirculo:{
    width:10,
    height:10,
    borderRadius:"50%",
    backgroundColor:"gray",
   },
   row:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:4,
   },
   alive:{
    backgroundColor:"green",
   },
   dead:{
    backgroundColor:"red",
   },
   unknown:{
    backgroundColor:"black",
   }
})