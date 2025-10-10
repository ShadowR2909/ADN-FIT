import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image,StatusBar,ScrollView,ActivityIndicator,FlatList,Dimensions,} from 'react-native';
import {FontAwesome5,MaterialIcons,MaterialCommunityIcons,Ionicons,} from '@expo/vector-icons';
import { useAuth } from '../src/hooks/useAuth';
import CustomAlertModal from '../components/CostomAlertModal';
import { COLORS, SPACING } from '../src/theme';

export default function Home({ navigation }) {
  const { user, loading } = useAuth();

  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('info');

  const showCustomAlert = (title, message, type = 'info') => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  const closeCustomAlert = () => setAlertVisible(false);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const userName = user?.displayName ?? user?.email?.split('@')[0] ?? '';

  const carouselData = [
    {
      title: 'Bienvenidos',
      content: 'Gracias por formar parte de nuestra comunidad fitness.',
    },
    {
      title: 'Misión',
      content: 'Fomentar el bienestar físico y mental de nuestros socios.',
    },
    {
      title: 'Visión',
      content: 'Ser el gimnasio líder en innovación y experiencia personalizada.',
    },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselSlide}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={28} color="#1cc741ff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {userName ? `Bienvenido ${userName}` : 'Bienvenido'}
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Image source={require('../assets/logo-gym.png')} style={styles.avatarCenter} />
        </TouchableOpacity>
      </View>

      {/* Carrusel horizontal */}
      <FlatList
        data={carouselData}
        renderItem={renderCarouselItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      />

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.quickAccessRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.quickCard}>
            <FontAwesome5 name="user-plus" size={32} color={COLORS.primary} />
            <Text style={styles.quickTitle}>Socios</Text>
            <Text style={styles.quickDesc}>Gestión de socios</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.quickCard}>
            <MaterialIcons name="event-available" size={32} color={COLORS.primary} />
            <Text style={styles.quickTitle}>Agregar un Turno</Text>
            <Text style={styles.quickDesc}>Asignación de clases</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quickAccessRow}>
          <TouchableOpacity activeOpacity={0.85} style={styles.quickCard}>
            <MaterialCommunityIcons name="emoticon-happy-outline" size={32} color={COLORS.primary} />
            <Text style={styles.quickTitle}>Nuestra Filosofía</Text>
            <Text style={styles.quickDesc}>Misión y visión</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.quickCard}>
            <MaterialCommunityIcons name="dumbbell" size={32} color={COLORS.primary} />
            <Text style={styles.quickTitle}>Gestionar Accesorios</Text>
            <Text style={styles.quickDesc}>Inventario de equipos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Estadística</Text>
            <TouchableOpacity style={styles.statsFilter}>
              <Text style={styles.statsFilterText}>Últimos 3 meses</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.muted} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
              <Text style={styles.legendText}>Membresías</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8be19c' }]} />
              <Text style={styles.legendText}>Socios</Text>
            </View>
          </View>

          <View style={styles.barChart}>
            <View style={[styles.bar, { height: 50, backgroundColor: COLORS.primary }]} />
            <View style={[styles.bar, { height: 28, backgroundColor: '#8be19c' }]} />
            <View style={[styles.bar, { height: 35, backgroundColor: COLORS.primary }]} />
            <View style={[styles.bar, { height: 18, backgroundColor: '#8be19c' }]} />
            <View style={[styles.bar, { height: 65, backgroundColor: COLORS.primary }]} />
            <View style={[styles.bar, { height: 40, backgroundColor: '#8be19c' }]} />
          </View>

          <View style={styles.barLabels}>
            <Text style={styles.barLabel}>Jun</Text>
            <Text style={styles.barLabel}>Jul</Text>
            <Text style={styles.barLabel}>Aug</Text>
          </View>
        </View>
      </ScrollView>

      <CustomAlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={closeCustomAlert}
        type={alertType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    marginTop:55,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.horizontal,
    paddingTop: 10, // +10 para compensar status bar
    paddingBottom: 16, // +6 para dar más aire visual
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    marginLeft: 8,
  },

  avatarCenter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
  },

  scrollContent: {
    paddingVertical: SPACING.vertical,
    paddingBottom: 60, // +20 para evitar solapamiento con elementos inferiores
  },

  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20, // +6 para mayor separación entre filas
    alignSelf: 'center',
  },

  quickCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, // +0.02 para mayor profundidad
    shadowRadius: 8,     // +2 para suavizar el borde
    elevation: 2,        // +1 para mejorar en Android
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  quickTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 10,
    textAlign: 'center',
  },

  quickDesc: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
    textAlign: 'center',
  },

  statsCard: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 18,
    marginTop: 20,       // +10 para separar de los botones
    marginBottom: 30,    // +12 para evitar que quede pegado al final
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // +4 para separar del gráfico
  },

  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  statsFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  statsFilterText: {
    color: COLORS.muted,
    fontSize: 13,
    marginRight: 2,
  },

  statsLegend: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },

  legendText: {
    fontSize: 13,
    color: COLORS.muted,
  },

  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80, // +10 para mejorar proporción visual
    marginBottom: 10,
    marginTop: 4,
    justifyContent: 'center',
  },

  bar: {
    width: 20,
    marginHorizontal: 5,
    borderRadius: 4,
  },

  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    marginTop: 4,
  },

  barLabel: {
    fontSize: 13,
    color: COLORS.muted,
    width: 40,
    textAlign: 'center',
  },

  carouselSlide: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 10,
  },

  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#23cc50ff',
    marginBottom: 10,
    textAlign: 'center',
  },

  carouselText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});