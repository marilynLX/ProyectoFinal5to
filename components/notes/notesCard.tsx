// notesCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Note } from "@/lib/supabase";

type NotesCardProps = {
  data: Note;
  onDelete: () => void;
  onEdit: () => void;
};

export default function NotesCard({ data, onDelete, onEdit }: NotesCardProps) {
  return (
    <View style={styles.notesCard}>
      {/* Ícono */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="note-text-outline" size={36} color="#00FFFF" />
      </View>

      {/* Contenido de la nota */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.text}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <MaterialCommunityIcons name="note-edit-outline" size={28} color="#00e6e6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <MaterialCommunityIcons name="trash-can-outline" size={28} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101010',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#001f1f',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 10,
  },
});
