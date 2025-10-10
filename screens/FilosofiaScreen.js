import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../src/theme';
import BottomTabBar from '../components/BottomTabBar';

export default function FilosofiaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header con volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuestra Filosofía</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Contenido */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nuestra Filosofía</Text>

        <Text style={styles.text}>
          En ADN-FIT creemos que el bienestar físico y mental son la base de una vida plena.
          Nuestro objetivo es acompañarte en cada paso de tu transformación, brindándote
          herramientas, conocimiento y motivación para que alcances tu mejor versión.
        </Text>

        <Text style={styles.subtitle}>Misión</Text>
        <Text style={styles.text}>
          Fomentar el bienestar integral de nuestros socios a través de entrenamiento personalizado,
          nutrición balanceada y comunidad de apoyo.
        </Text>

        <Text style={styles.subtitle}>Visión</Text>
        <Text style={styles.text}>
          Ser el gimnasio líder en innovación, experiencia personalizada y resultados duraderos,
          transformando vidas y construyendo la comunidad fitness más comprometida.
        </Text>

        <Text style={styles.subtitle}>Valores</Text>
        <Text style={styles.text}>• Compromiso con cada socio</Text>
        <Text style={styles.text}>• Innovación constante</Text>
        <Text style={styles.text}>• Respeto y empatía</Text>
        <Text style={styles.text}>• Trabajo en equipo</Text>
        <Text style={styles.text}>• Pasión por el bienestar</Text>
      </ScrollView>

      {/* Barra inferior navegable */}
      <BottomTabBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  content: { padding: 24, paddingBottom: 80 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 20, marginBottom: 8 },
  text: { fontSize: 16, color: COLORS.text, lineHeight: 24, marginBottom: 10 },
});