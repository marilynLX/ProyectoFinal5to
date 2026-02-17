import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Note } from "@/lib/supabase";
import { useState, useEffect } from "react";

type Props = {
    note: Note,
    open: boolean,
    onSaved: (note : Note) => void;
    onClose: () => void;
}

export function NoteModal({
    note,
    open,
    onSaved,
    onClose,
} : Props) {
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text);

    useEffect(() => {
        setTitle(note.title);
        setText(note.text);
    }, [note]);

    const handleSave = () => {
        if(!note) return;
        onSaved({
            ...note,
            title,
            text,
        });
    }
    return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
          onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {note.id === 0 ? 'Nueva Nota' : 'Editar Nota'}
                    </Text>
                    <TextInput
                        placeholder="Título de la nota"
                        placeholderTextColor="#666"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        placeholder="Contenido de la nota"
                        placeholderTextColor="#666"
                        style={[styles.input, styles.textArea]}
                        multiline
                        numberOfLines={4}
                        value={text}
                        onChangeText={setText}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'aqua',
        shadowColor: 'aqua',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'aqua',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3a3a3a',
        color: 'white',
        fontSize: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: 'aqua',
    },
    cancelButton: {
        backgroundColor: '#FF4444',
    },
    buttonText: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: 'bold',
    },
});