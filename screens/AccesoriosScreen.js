import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { db } from '../src/config/firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { COLORS } from '../src/theme';
import BottomTabBar from '../components/BottomTabBar';

export default function AccesoriosScreen({ navigation }) {
  const [accesorios, setAccesorios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAccesorios();
  }, []);

  const fetchAccesorios = async () => {
    const snap = await getDocs(collection(db, 'accesorios'));
    const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccesorios(list);
  };

  const handleSave = async () => {
    if (!nombre || !cantidad) {
      Alert.alert('Faltan campos', 'Nombre y cantidad son obligatorios');
      return;
    }
    if (editingId) {
      await updateDoc(doc(db, 'accesorios', editingId), { nombre, cantidad: Number(cantidad) });
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'accesorios'), { nombre, cantidad: Number(cantidad) });
    }
    clearForm();
    fetchAccesorios();
  };

  const handleDelete = async (id) => {
    Alert.alert('¿Eliminar accesorio?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: async () => { await deleteDoc(doc(db, 'accesorios', id)); fetchAccesorios(); } }
    ]);
  };

  const handleEdit = (item) => {
    setNombre(item.nombre);
    setCantidad(String(item.cantidad));
    setEditingId(item.id);
  };

  const clearForm = () => {
    setNombre(''); setCantidad(''); setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.itemSub}>Cantidad: {item.cantidad}</Text>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accesorios</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nombre del accesorio" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Cantidad" value={cantidad} onChangeText={setCantidad} keyboardType="numeric" />

          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.btnPrimary} onPress={handleSave}>
              <Text style={styles.btnText}>{editingId ? 'Actualizar' : 'Guardar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary} onPress={clearForm}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={accesorios}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No hay accesorios registrados</Text>}
        />
      </ScrollView>

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
  list: { paddingBottom: 20 },
  item: { backgroundColor: COLORS.card, borderRadius: 8, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: '#ededed' },
  itemText: { fontSize: 16, fontWeight: 'bold' },
  itemSub: { fontSize: 14, color: '#888' },
  itemActions: { flexDirection: 'row', marginTop: 10 },
  btnEdit: { backgroundColor: '#19d44c', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 },
  btnDelete: { backgroundColor: '#FF6347', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
});