import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
    icon: "camera" | "images" | "mic" | "location" |  "user" | "calendar"; 
    title: string;
    granted: boolean;
    requestPermission: () => void;
};

export function PermissionLayout({ icon, title, granted, requestPermission }: Props) {
    return (
        <View>
        <View style={styles.container}>
            <Entypo name={icon} size={32} color="black" style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {granted ? (
                <Entypo name="check" size={24} color="green" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Autorizar</Text>
                </TouchableOpacity>
            )}
              </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    button: {
        backgroundColor: '#1771b2',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: "bold",
    },
});
