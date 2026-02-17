import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Alert, FlatList, Image } from "react-native";
import { CameraComponent } from "./cameraView";
import { PhotoPreview } from "./photoReview";
import * as PhotoPicker from 'expo-image-picker';

export function ImagePicker() {
    const [open, setOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [image, setImage] = useState<string | undefined | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onPictureTaked = (uri?: string) => {
        setCameraOpen(false);
        setImage(uri);
    };
    const onNewPicture = () => {
        setImage(undefined);
        setCameraOpen(true);
    };
    const onSavePhoto = (uri: string) => {
        setImages([...images, uri]);
        Alert.alert("Foto guardada.");
        setOpen(false);
        setImage(undefined);
    };
    const pickImage = async () => {
        let result = await PhotoPicker.launchImageLibraryAsync({
            mediaTypes: PhotoPicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Guardar la imagen seleccionada para previsualizarla
            setOpen(false); // Cerrar el modal principal
        }
    };
    const saveSelectedImage = () => {
        if (selectedImage) {
            setImages([...images, selectedImage]);
            Alert.alert("Imagen guardada.");
            setSelectedImage(null);
        }
    };
    const renderMenu = (
        <Modal visible={open} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setCameraOpen(true)}>
                        <Text style={styles.optionText}>Cámara</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
                        <Text style={styles.optionText}>Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={() => setOpen(false)}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Ionicons name="camera-outline" size={36} color="blue" />
            </TouchableOpacity>

            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
            />

            <Modal visible={open} transparent={true} animationType="slide">
                {!cameraOpen && !image ? renderMenu : null}
                {cameraOpen ? (
                    <CameraComponent onCancel={() => setCameraOpen(false)} onTakePicture={onPictureTaked} />
                ) : null}
                {image ? (
                    <PhotoPreview uri={image} onCancel={() => setImage(undefined)} newPhoto={onNewPicture} onSave={onSavePhoto} />
                ) : null}
            </Modal>

            {/* Modal de previsualización de imagen desde galería */}
            <Modal visible={!!selectedImage} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
                        <TouchableOpacity style={styles.optionButton} onPress={saveSelectedImage}>
                            <Text style={styles.optionText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedImage(null)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    optionButton: {
        width: "100%",
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 18,
        color: "#333",
    },
    cancelButton: {
        width: "100%",
        padding: 15,
        alignItems: "center",
        marginTop: 10,
    },
    cancelText: {
        fontSize: 18,
        color: "red",
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
    },
    previewImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
});