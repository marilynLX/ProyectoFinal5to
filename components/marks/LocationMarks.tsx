import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from "expo-router";
import { fetchHistoryLocations } from "../history/historiSource";

export function LocationMarkersView() {
    const [permission, requestPermission] = Location.useForegroundPermissions();
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [locations, setLocations] = useState<{ latitude: number, longitude: number }[]>([]);
    const mapRef = useRef(null);

    useEffect(() => {
        async function fetchLocations() {
            if (!permission?.granted) {
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
            
            try {
                const storedLocations = await fetchHistoryLocations(); 
                setLocations(storedLocations);
            } catch (error) {
                console.error("Error al obtener ubicaciones:", error);
            }
        }

        fetchLocations();
    }, [permission]);

    useEffect(() => {
        if (userLocation) {
            (mapRef?.current as any)?.animateCamera({
                center: {
                    longitude: userLocation.coords.longitude,
                    latitude: userLocation.coords.latitude,
                },
                duration: 1000,
            });
        }
    }, [userLocation]);

    if (!permission?.granted) {
        return (
            <View>
                <Text>Para ver las ubicaciones, debes conceder permisos al GPS.</Text>
                <Button onPress={requestPermission} title="Permitir acceso" />
            </View>
        );
    }

return (
<View style={styles.container}>
       <MapView
         ref={mapRef}
         style={styles.map}
         initialRegion={{
          latitude: userLocation?.coords.latitude || 0,
          longitude: userLocation?.coords.longitude || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05, 
    }} >
        {userLocation && (
        <Marker
            coordinate={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude
            }}
            title="Tu ubicación"
            pinColor="aqua" />
    )}
        {locations.map((loc, index) => (
        <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={`Ubicación ${index + 1}`}
            pinColor="gray"/>
    ))}
</MapView>
            <View style={styles.button}>
                <Button title="Regresar" onPress={() => router.push("/ubication/index")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
