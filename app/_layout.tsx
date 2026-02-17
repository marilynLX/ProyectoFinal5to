import { Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    checkStoredSession();
  
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('userSession', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
        setIsLoggedIn(true);
      } else {
        await AsyncStorage.removeItem('userSession');
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkStoredSession = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        const userData = JSON.parse(session);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error al verificar la sesión guardada:', error);
    }
  };

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          {!isLoggedIn ? (
            <Stack>
              <Stack.Screen 
                name="index" 
                options={{ 
                  headerShown: false 
                }} 
              />
              <Stack.Screen 
                name="auth/index" 
                options={{ 
                  headerShown: false 
                }} 
              />
              <Stack.Screen 
                name="auth/register" 
                options={{ 
                  headerShown: false 
                }} 
              />
            </Stack>
          ) : (
            <Drawer>
            <Drawer.Screen
                name="explore" 
                options={{
                  drawerLabel: 'Home',
                  title: 'Home',
                  drawerIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                  ),
                }}
              />
             
              <Drawer.Screen
                name="permissions" 
                options={{
                  drawerLabel: 'Permisos',
                  title: 'Permisos',
                  drawerIcon: ({ color }) => (
                    <MaterialIcons name="security" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="ubication" 
                options={{
                  drawerLabel: 'Ubicación',
                  title: 'Ubicación',
                  drawerIcon: ({ color }) => (
                    <AntDesign name="enviroment" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="notes" 
                options={{
                  drawerLabel: 'Notas',
                  title: 'Notas',
                  drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name="notebook-edit-outline" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="gallery" 
                options={{
                  drawerLabel: 'Galería',
                  title: 'Galería',
                  drawerIcon: ({ color }) => (
                    <FontAwesome name="photo" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="about" 
                options={{
                  drawerLabel: 'Acerca de',
                  title: 'Acerca de',
                  drawerIcon: ({ color }) => (
                    <MaterialIcons name="info" size={24} color={color} />
                  ),
                }}
              />
                <Drawer.Screen
                name="auth/profile" 
                options={{
                  drawerLabel: 'Perfil',
                  title: 'Perfil',
                  drawerIcon: ({ color }) => (
                    <MaterialIcons name="face-3" size={24} color={color} />
                  ),
                }}
              />
                <Drawer.Screen
                name="+not-found"
                options={{
                  drawerItemStyle: { display: "none" },
                }}
              />
              <Drawer.Screen name="(characters)" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="(episodes)" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="(location)" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="auth" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="auth/login" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="auth/register" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="auth/layout" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="index" options={{ drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="(ubication)" options={{ drawerItemStyle: { display: 'none' } }} />

    </Drawer>
          )}
        </AuthProvider>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
