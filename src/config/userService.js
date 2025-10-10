import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// Guardar o actualizar perfil
export async function saveUserProfile(data) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No hay usuario logueado');
  await setDoc(doc(db, 'users', uid), data, { merge: true });
}

// Obtener perfil
export async function getUserProfile() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No hay usuario logueado');
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}