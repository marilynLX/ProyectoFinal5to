
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from "expo-router";
import { saveLocation } from "./locations";

export function LocationView() {
    const [permission, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const mapRef = useRef(null);

    useEffect(() => {
        async function getCurrentLocation() {
            if (!permission?.granted) {
                return; 
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return; 
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if (location) {
                try {
                    await saveLocation(location.coords.latitude, location.coords.longitude);
                } catch (error) {
                    console.error("Error al guardar la ubicación:", error);
                }
            }
        }
        getCurrentLocation();
    }, [permission]);

    useEffect(() => {
        async function showLocation() {
            if(location){
                const camera = await (mapRef?.current as any)?.getCamera();
                camera.center = {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                };
                (mapRef?.current as any).animateCamera(camera, {duration: 1000});
            }
        }
        showLocation();
    }, [location]);

    if(!permission?.granted){
        return(
            <View>
                <Text>Para poder registrar tus ubicaciones debes conceder el permiso al GPS primero</Text>
                <Button
                    onPress={requestPermission}
                    title="Permitir acceso"
                />
            </View>
        );
    }
    return(
        <View style={styles.container}>
            <View style={styles.locationContainer}>
                <Text>Ubicación:</Text>
                {location && (
                    <Text>
                        Latitud: {location.coords.latitude.toFixed(6)}, 
                        Longitud: {location.coords.longitude.toFixed(6)}
                    </Text>
                )}
            </View>
            <MapView 
            style={styles.map}
            ref={mapRef}
            zoomEnabled
            initialRegion={{
                latitude: 18.5955558,
                longitude: -98.4907685,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            >
                {location ? (
                    <Marker
                        coordinate={location.coords}
                        pinColor="red"
                    />
                ) : null}
            </MapView>
            <View style={styles.button}>
                <Button
                    title="Historial"	
                    onPress={() => router.push("./history")}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(224, 218, 240, 0.84)',
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute', 
        bottom: 20,
        right: 20,
    }
});