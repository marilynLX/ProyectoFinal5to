import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { router } from 'expo-router';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
    </View>

      <Image style={styles.image} source={require('../../assets/images/logotipo.jpg')} />

      <View style={styles.detalles}> 
      <TouchableOpacity style={styles.button} onPress={()=> router.push("/(characters)")}> 
      <Text style={styles.details}>Characters</Text></TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> router.push("/(episodes)") }>
      <Text style={styles.details}>Episode</Text></TouchableOpacity>
        
      <TouchableOpacity style={styles.button} onPress={()=>router.push("/(location)")}>
      <Text style={styles.details}>Location</Text></TouchableOpacity> 
      </View>

      <View style={styles.contentImg}>
      <Image style={styles.image2} source={require('../../assets/images/rick.jpg')} />
      <Image style={styles.image2} source={require('../../assets/images/morty.jpg')} />
      <Image style={styles.image2} source={require('../../assets/images/beth.jpg')} />
      </View>

      <View style={styles.contentText}>
      <Text style={styles.text}>Rick</Text>
      <Text style={styles.text}>Morty</Text>
      <Text style={styles.text}>Beth</Text>
      </View>
  <View style={styles.flooter}>
   <Text style={styles.netflix}><Fontisto name="netflix" size={24} color="red" />   Netflix </Text>
   <Text style={styles.frase}> "I turned myself into a pickle, Morty! I’m Pickle Rick!"</Text>
</View>
</View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingVertical: 30,
    borderColor: '#000000',
    borderWidth: 1,
    boxShadow: "1px 1px 100px aqua",
    shadowColor: 'white', 
    shadowRadius: 10, 
    elevation: 15, 
    backgroundColor: '#000000',
    width: '100%',
    position: 'absolute',
    top: 0, 
  },
  image:{
    height:100,
    width:350,
    marginStart:25,
    marginVertical:160,
  },
  image2:{
    height:120,
    width:120,
    borderRadius:100,
    marginStart:10,
    borderWidth:4,
    borderColor:'aqua',
  },
  contentImg:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:50,
  },
  contentText:{
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  text:{
    color:"white",
    fontSize:25,
    fontFamily:"Hello Valentica",
    flexDirection: 'row',
  },
  netflix:{
    color:'white',
    marginStart:20,
  },
  frase:{
    color:'white',
    marginStart:20,
    textAlign:'center',
  },
  detalles:{
    flexDirection:'column',
    position:'absolute',
    marginStart:140,
    marginTop:250,
  },
  details:{
    color:'black',
    fontFamily:'Broadway',
    fontSize:20,
    borderRadius:10,
    marginStart:10,
    textAlign:'center',
  },
  button:{
  backgroundColor:'aqua',
  borderRadius:10,
  marginStart:10,
  height:25,
  width:150,
  margin:15,
  },
  flooter: {
    paddingVertical: 30,
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: 'white', 
    shadowRadius: 10,
    boxShadow: "1px 1px 100px aqua",
    elevation: 15, 
    backgroundColor: '#00000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

