import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from './firebaseConfig';

const storage = getStorage();

export async function pickImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Se necesitan permisos de galería');
    return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.6,
  });
  if (!result.canceled) return result.assets[0].uri;
  return null;
}

export async function uploadProfileImage(localUri) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('No hay usuario');
  const response = await fetch(localUri);
  const blob = await response.blob();
  const storageRef = ref(storage, `profiles/${uid}.jpg`);
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
}