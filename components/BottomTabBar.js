import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../src/theme';

export default function BottomTabBar({ navigation }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.jumpTo('Inicio')}>
        <Ionicons name="home-outline" size={22} color={COLORS.primary} />
        <Text style={styles.tabLabel}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigation.jumpTo('Perfil')}>
        <Ionicons name="person-outline" size={22} color={COLORS.primary} />
        <Text style={styles.tabLabel}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 58,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderColor: '#ededed',
    paddingBottom: 4,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, marginTop: 2, color: COLORS.primary },
});