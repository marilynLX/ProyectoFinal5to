import { useState } from "react";
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Character } from "./characterType";
import React from "react";

type Props = {
    character: Character;
};

export function CharacterCard({ character }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const getStatusColor = () => {
        switch (character.status) {
            case "Alive":
                return style.alive;
            case "Dead":
                return style.dead;
            case "unknown":
                return style.unknown;
            default:
                return;
        }
    };

    return (
    <View style={style.Principal}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={style.card}>
            <Image style={style.image} source={{ uri: character.image }} />
                <View style={style.content}>
                    <Text style={style.name}>{character.name}</Text>
                <View>
                    <Text style={style.status1}>Estatus-Especie</Text>
                        <View style={style.row}>
                            <View style={[style.statusCirculo, getStatusColor()]}></View>
                            <Text style={style.status}>{character.status} - {character.species}</Text>
                        </View>
                </View>
                    <Text style={style.origin1}>Origen</Text>
                    <Text style={style.origin}>{character.origin.name}</Text>
                </View>
            </TouchableOpacity>

            <Modal  transparent={true} visible={modalVisible}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.name2}>{character.name}</Text>
                        <Image style={style.modalImage} source={{ uri: character.image }} />
                        <Text style={style.modalText}>Status: {character.status}
                        <View style={[style.statusCirculo, getStatusColor()]}></View></Text>
                        <Text style={style.modalText}>Species: {character.species}</Text>
                        <Text style={style.modalText}>Origin: {character.origin.name}</Text>
                        <Text style={style.modalText}>Gender: {character.gender}</Text>
                        <Text style={style.modalText}>Location: {character.location.name}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={style.closeButton}>
                            <Text style={style.closeButtonText}> X </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </View>
    );
}

const style = StyleSheet.create({
    card: {
        borderRadius: 8,
        flexDirection: "row",
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#a5e0cc",
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
    },
    Principal:{
        flex:1,
    },
    image: {
        width: "40%",
        height: "100%",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        objectFit: "cover",
    },
    content: {
        padding: 6,
        flexDirection: "column",
        gap: 4,
    },
    name: {
        fontSize: 30,
        fontFamily: "Hello Valentica",
    },
    status1: {
        fontSize: 9,
        fontWeight: "700",
    },
    status: {
        fontSize: 10,
    },
    origin: {
        fontSize: 10,
        color: "#bbbbb",
    },
    origin1: {
        fontSize: 9,
        fontWeight: "700",
        color: "black",
    },
    statusCirculo: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: "gray",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    alive: {
        backgroundColor: "green",
    },
    dead: {
        backgroundColor: "red",
    },
    unknown: {
        backgroundColor: "black",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "rgba(0, 0, 0, 0.59)",
        padding: 20,
        borderRadius: 250,
        alignItems: "center",
        shadowColor: 'cyan',
        shadowOpacity: 1,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 8 },

    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight:'700',
        color:'white',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        shadowColor: 'cyan',
        shadowOpacity: 2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    name2: {
        fontSize: 30,
        fontFamily: "Hello Valentica",
        color:'white',
    },
});
