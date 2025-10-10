import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { db } from '../src/config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { COLORS } from '../src/theme';
import BottomTabBar from '../components/BottomTabBar';

export default function SociosScreen({ navigation }) {
  const [socios, setSocios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    const snap = await getDocs(collection(db, 'socios'));
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSocios(list);
  };

  const handleSave = async () => {
    if (!nombre || !apellido || !dni) {
      Alert.alert('Faltan campos', 'Nombre, apellido y DNI son obligatorios');
      return;
    }
    if (editingId) {
      await updateDoc(doc(db, 'socios', editingId), { nombre, apellido, dni, telefono });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'socios'), { nombre, apellido, dni, telefono });
    }
    clearForm();
    fetchSocios();
  };

  const handleDelete = async (id) => {
    Alert.alert('¿Eliminar?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: async () => { await deleteDoc(doc(db, 'socios', id)); fetchSocios(); } }
    ]);
  };

  const handleEdit = (item) => {
    setNombre(item.nombre);
    setApellido(item.apellido);
    setDni(item.dni);
    setTelefono(item.telefono);
    setEditingId(item.id);
  };

  const clearForm = () => {
    setNombre(''); setApellido(''); setDni(''); setTelefono(''); setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre} {item.apellido}</Text>
      <Text style={styles.itemSub}>DNI: {item.dni}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.btnEdit}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.btnDelete}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con volver */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Socios</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Formulario */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
          <TextInput style={styles.input} placeholder="DNI" value={dni} onChangeText={setDni} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
              <Text style={styles.btnText}>{editingId ? 'Actualizar' : 'Guardar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={clearForm}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Listado */}
        <FlatList
          data={socios}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No hay socios registrados</Text>}
        />
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
  content: { padding: 20, paddingBottom: 80 },
  form: { marginBottom: 20 },
  input: { backgroundColor: COLORS.card, borderRadius: 8, paddingHorizontal: 12, marginBottom: 10, borderWidth: 1, borderColor: '#ededed' },
  formButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  btnPrimary: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginRight: 8 },
  btnSecondary: { flex: 1, backgroundColor: '#bbb', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
})