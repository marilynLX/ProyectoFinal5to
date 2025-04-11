import { Stack } from 'expo-router';

export default function GalleryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Galería',
        }}
      />
    </Stack>
  );
} 