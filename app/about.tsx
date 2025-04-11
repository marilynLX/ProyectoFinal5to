import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';



export default function aboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Text style={styles.about}>About</Text>

<View style={styles.cont}>
  <Image style={styles.image2} source={require('../assets/images/rick.jpg')} />
      <Text style={styles.Date}>Universidad Tecnológica De Izucar De Matamoros</Text>
      <Text style={styles.Date}>TSU.Desarrollo De Software Multiplataforma</Text>
      <Text style={styles.Date}>Marilyn Isabel Lucero</Text>
      <Text style={styles.Date}>5to "A"</Text>
</View>

<View style={styles.flooter}>
</View>
</View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cont:{
    width:320,
    height:450,
    backgroundColor:'black',
    marginTop:160,
    marginStart:45,
    borderRadius:20,
    shadowColor: 'cyan',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 8, height: 8 },
    elevation: 15,
    borderWidth:2,

  },
  header: {
    paddingVertical: 30,
    borderColor: '#000000',
    borderWidth: 1,
    boxShadow: "1px 1px 100px aqua",
    shadowColor: 'white', 
    shadowRadius: 20, 
    elevation: 15, 
    backgroundColor: '#000000',
    width: '100%',
    position: 'absolute',
    top: 0, 
  },
  about:{
    color:"white",
    fontSize:30,
    marginTop:10,
    textAlign:'center',
    fontFamily:"Hello Valentica",
  },
  Date:{
    fontSize:16,
    color:'white',
    fontWeight:'700',
    fontFamily:"Century Gothic",
    marginTop:30,
    textAlign:'center',
  },
  image2:{
    height:120,
    width:120,
    borderRadius:100,
    marginTop:10,
    marginStart:"32%",
    borderWidth:4,
    borderColor:'white',
  },
  flooter: {
    paddingVertical: 30,
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: 'white', 
    shadowRadius: 20,
    boxShadow: "1px 1px 100px aqua",
    elevation: 15, 
    backgroundColor: '#00000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});

