import { View, StyleSheet } from "react-native";
import { ImagePicker } from "../imagePicker/imagePicker";

export function ImagesGallery(){
    return(
        <View
        style={styles.container}>
            <ImagePicker
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:45,
        paddingHorizontal:24,
    }
})
