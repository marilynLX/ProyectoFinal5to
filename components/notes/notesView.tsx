// notesView.tsx
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import NotesCard from './notesCard';
import { NoteModal } from './notesModal';
import { notesApi, Note } from '@/lib/supabase';

export default function NotesView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddModal = () => {
    setSelected({
      id: 0,
      title: "",
      text: "",
      date: new Date().toISOString()
    });
  };

  const onSaveNote = async (note: Note) => {
    try {
      let result: Note;
      if (note.id === 0) {
        // Crear nueva nota
        result = await notesApi.createNote({
          title: note.title,
          text: note.text
        });
        setNotes([result, ...notes]);
      } else {
        // Actualizar nota existente
        result = await notesApi.updateNote(note.id, {
          title: note.title,
          text: note.text
        });
        setNotes(notes.map(item => item.id === note.id ? result : item));
      }
      setSelected(null);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar la nota");
    }
  };

  const onDeleteNote = async (id: number) => {
    try {
      await notesApi.deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la nota");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const results = await notesApi.getNotes();
        setNotes(results);
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar las notas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Cargando notas...</Text>
        </View>
      ) : notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text>No hay notas disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <NotesCard
              data={item}
              onDelete={() => onDeleteNote(item.id)}
              onEdit={() => setSelected(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selected && (
        <NoteModal
          open={!!selected}
          note={selected}
          onClose={() => setSelected(null)}
          onSaved={onSaveNote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});