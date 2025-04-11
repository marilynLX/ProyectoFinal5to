import { useEffect, useRef, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { router } from "expo-router";
import { getLocations } from "../marks/markers";

export function HistoryView() {
    const [permission, requestPermission] = Location.useForegroundPermissions();
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [locations, setLocations] = useState<{ latitude: number, longitude: number }[]>([]);
    const mapRef = useRef(null);

    useEffect(() => {
        async function fetchLocations() {
            if (!permission?.granted) return;

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
            
            try {
                const storedLocations = await getLocations();
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
            <View style={styles.permissionContainer}>
                <Text>Para ver las ubicaciones, debes conceder permisos al GPS.</Text>
                <Button onPress={requestPermission} title="Permitir acceso" />
            </View>
        );
    }
    const focusOnLocation = (latitude: number, longitude: number) => {
        (mapRef?.current as any)?.animateCamera({
            center: { latitude, longitude },
            duration: 1000,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.historyContainer}>
                <Text style={styles.title}>Historial de Ubicaciones</Text>
                <FlatList
                    data={locations}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.locationItem} onPress={() => focusOnLocation(item.latitude, item.longitude)}>
                            <Text>📍 Lat: {item.latitude.toFixed(6)}, Lng: {item.longitude.toFixed(6)}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
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
    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    historyContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    locationItem: {
        backgroundColor: "#ffffff",
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
    },
    button: {
        position: 'absolute',
        bottom: 20, 
        right: 20,
    }
});
