import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { CameraPermissions } from "./cameraPermission";
import { GalleryPermissions } from "./galleryPermission";
import { MicrophonePermissions } from "./microPermission";
import { LocationPermissions } from "./locationPermission";
import { ContactsPermissions } from "./contactsPermission";
import { CalendarPermissions } from "./calendarPermission";

export function PermissionsView(){
    return(
     <View style={style.container}>
        <Text style={style.title}>Permission</Text>
        <View>
        <CameraPermissions/>
        <GalleryPermissions/>
        <MicrophonePermissions/>
        <LocationPermissions/>
        <ContactsPermissions/>
        <CalendarPermissions/>
        </View>
     </View>
    );
}
const style= StyleSheet.create({
    container:{
        paddingTop:30, 

    },
    title:{
        fontSize:24,
        fontWeight:700,
    }
})