import React from 'react';
import { View } from 'react-native';
import NotesView from '@/components/notes/notesView';

export default function NotesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <NotesView />
    </View>
  );
} 