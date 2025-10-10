// 1. CORE
import { initializeApp } from 'firebase/app';

// 2. AUTH (versión estable)
import { getAuth } from 'firebase/auth';

// 3. FIRESTORE + STORAGE
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 4. Variables .env
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env';

// 5. Configuración
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// 6. Inicializar
const app = initializeApp(firebaseConfig);

// 7. Servicios (sin persistencia avanzada)
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);