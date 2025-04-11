import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const socialLinks = [
  { name: 'facebook', url: 'https://facebook.com', icon: <Entypo name="facebook" size={24} color="white" /> },
  { name: 'twitter', url: 'https://twitter.com', icon: <Entypo name="twitter" size={24} color="white" /> },
  { name: 'github', url: 'https://github.com', icon: <Entypo name="github" size={24} color="white" /> },
];

const images = [
  'https://images.unsplash.com/photo-1480408144303-d874c5e46501', // Ubicación
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee', // React Native
  'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957'  // Permisos
];

const Index = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/location.jpg')}
      style={styles.background}
      blurRadius={6}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.95)', 'rgba(0,0,0,1)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>App Final</Text>
            <Text style={styles.subtitle}>Ubicación · Permisos · Notas · Galería . API</Text>
          </View>

          {/* Galería de imágenes */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {images.map((img, idx) => (
              <Image key={idx} source={{ uri: img }} style={styles.image} />
            ))}
          </ScrollView>

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('./auth/login')}>
              <MaterialIcons name="login" size={24} color="#00FFFF" />
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('./auth/register')}>
              <MaterialIcons name="person-add" size={24} color="#00FFFF" />
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>

          {/* Acerca de */}
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>¿Quiénes somos?</Text>
            <Text style={styles.aboutText}>
              Somos una aplicación que te permite gestionar permisos, ubicar lugares,
              guardar notas importantes y capturar momentos en una galería moderna.
            </Text>
          </View>

          {/* Redes sociales */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Síguenos en:</Text>
            <View style={styles.socialIcons}>
              {socialLinks.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
                  {item.icon}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Frase final */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Explora el multiverso de posibilidades 🚀</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#00FFFF',
    letterSpacing: 3,
    textShadowColor: 'rgba(0,255,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#DDD',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 1,
  },
  carousel: {
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 140,
    borderRadius: 12,
    marginRight: 15,
  },
  buttonContainer: {
    gap: 15,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00FFFF',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  about: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFFF',
  },
  aboutTitle: {
    fontSize: 20,
    color: '#00FFFF',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
  },
  socialContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  socialText: {
    fontSize: 16,
    color: '#DDD',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default Index;
