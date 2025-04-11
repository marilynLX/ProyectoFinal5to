import { StyleSheet, Text, View } from "react-native";

export default function LocationCard({ location }: { location: { latitude: number; longitude: number; timestamp: string } }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>📍 Latitud: {location.latitude}</Text>
            <Text style={styles.cardText}>📍 Longitud: {location.longitude}</Text>
            <Text style={styles.cardText}>🕒 Fecha: {new Date(location.timestamp).toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 4,
    },
});
