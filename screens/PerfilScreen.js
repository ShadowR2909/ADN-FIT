import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { saveUserProfile, getUserProfile } from '../src/config/userService';
import { pickImage, uploadProfileImage } from '../src/config/imagePicker';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { COLORS } from '../src/theme';

export default function PerfilScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    puesto: '',
    direccion: '',
    rol: 'empleado', // por defecto
    photo: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserProfile();
        if (data) setForm(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      await saveUserProfile(form);
      Alert.alert('✅ Perfil actualizado');
    } catch (e) {
      Alert.alert('❌ Error al guardar');
    }
  };

  const changePhoto = async () => {
    const uri = await pickImage();
    if (!uri) return;
    setLoading(true);
    try {
      const url = await uploadProfileImage(uri);
      setForm({ ...form, photo: url });
      await saveUserProfile({ ...form, photo: url });
      Alert.alert('✅ Foto actualizada');
    } catch (e) {
      Alert.alert('❌ Error al subir imagen');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      Alert.alert('📧 Correo de restablecimiento enviado');
    } catch {
      Alert.alert('❌ Error al enviar correo');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/fondo-gymdos.png')}
      style={styles.bg}
      imageStyle={styles.bgImg}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Perfil Empleado</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Foto de perfil */}
        <TouchableOpacity style={styles.avatarWrap} onPress={changePhoto}>
          {form.photo ? (
            <Image source={{ uri: form.photo }} style={styles.profilePic} />
          ) : (
            <Ionicons name="person-circle" size={90} color={COLORS.primary} />
          )}
          <Text style={styles.changeTxt}>Cambiar foto</Text>
        </TouchableOpacity>

        {/* Campos editables */}
        {[
          { label: 'Nombre', key: 'nombre' },
          { label: 'Apellido', key: 'apellido' },
          { label: 'Correo Electrónico', key: 'email', keyboard: 'email-address' },
          { label: 'Teléfono', key: 'telefono', keyboard: 'phone-pad' },
          { label: 'D.N.I', key: 'dni', keyboard: 'numeric' },
          { label: 'Puesto', key: 'puesto' },
          { label: 'Dirección', key: 'direccion', multiline: true },
        ].map((item) => (
          <View key={item.key} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              value={form[item.key]}
              onChangeText={(txt) => setForm({ ...form, [item.key]: txt })}
              keyboardType={item.keyboard || 'default'}
              multiline={item.multiline}
              editable={item.editable !== false}
            />
          </View>
        ))}

        {/* Botones */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
            <Text style={styles.btnText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.goBack()}>
            <Text style={styles.btnTextSec}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Cambiar contraseña */}
        <TouchableOpacity style={styles.linkBtn} onPress={changePassword}>
          <Text style={styles.linkTxt}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  bgImg: { opacity: 0.9 },
  container: { paddingHorizontal: 24, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 44,
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  avatarWrap: { alignItems: 'center', marginBottom: 24 },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  changeTxt: { fontSize: 12, color: COLORS.primary, marginTop: 4 },
  row: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ededed',
  },
  label: { fontSize: 12, color: '#888' },
  input: {
    fontSize: 16,
    marginTop: 4,
    color: COLORS.text,
  },
  btnRow: { flexDirection: 'row', marginTop: 24, justifyContent: 'space-between' },
  btnPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginLeft: 8,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  btnTextSec: { color: COLORS.primary, fontWeight: 'bold' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkTxt: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold' },
});