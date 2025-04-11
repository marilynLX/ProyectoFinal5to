import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
    uri: string;
    onSave: (uri : string) => void;
    onCancel: () => void;
    newPhoto: () => void;
}
export function PhotoPreview({
  uri,
  onSave,
  onCancel,
  newPhoto,
} : Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "contain",
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
    onPress={() => onCancel()}
        >
          <Ionicons 
            name="close"
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => onSave(uri)}>
          <Ionicons 
            name="camera"
            size={64}
            color="white" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={newPhoto}>
            <Ionicons 
              name="camera-reverse-outline" 
              size={32} 
              color="white" 
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: 'transparent',
  position: 'absolute', // Posiciona el contenedor en la parte inferior
  bottom: 30, // Distancia desde la parte inferior
  left: 0,
  right: 0,
  paddingHorizontal: 20,
},
container: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'black',
},
});