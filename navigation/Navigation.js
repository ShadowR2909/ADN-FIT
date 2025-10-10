import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import DrawerNavigator from './DrawerNavigator'; // 👈 ahora usamos el Drawer
import SociosScreen from '../screens/SociosScreen';
import TurnosScreen from '../screens/TurnosScreen';
import FilosofiaScreen from '../screens/FilosofiaScreen';
import AccesoriosScreen from '../screens/AccesoriosScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Login'}
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#30e33ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Socios" component={SociosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Turnos" component={TurnosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Filosofia" component={FilosofiaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Accesorios" component={AccesoriosScreen} options={{ headerShown: false }} />
        {/* 👇 Aquí va el Drawer en lugar del TabNavigator */}
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
