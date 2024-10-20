import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Animated,
} from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import BottomNavBar from './BottomNavBar';

const HomeScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const barbershops = [
    {
      id: '1',
      name: 'City Barbershop',
      distance: '0.3 miles away',
      rating: 4.9,
      reviews: '2k',
      image: require('./assets/barberWorkingImages/1a8ad8a81299dd60695edcd51aa0e592.jpg'),
    },
    {
      id: '2',
      name: 'The Art of Shaving',
      distance: '0.4 miles away',
      rating: 4.8,
      reviews: '1.5k',
      image: require('./assets/barberWorkingImages/BSV_5058.jpg'),
    },
    {
      id: '3',
      name: 'Soho House',
      distance: '0.4 miles away',
      rating: 4.6,
      reviews: '1.2k',
      image: require('./assets/b3-bespoke-round-barber-shop-sign-window-sticker-high-quality-vinyl-sticky-back-plastic-commercial-window-glass-stickers.jpg'),
    },
    {
      id: '4',
      name: "Gentlemen's Club",
      distance: '0.6 miles away',
      rating: 4.7,
      reviews: '1.3k',
      image: require('./assets/barberWork.jpeg'),
    },
    {
      id: '5',
      name: 'Sharp & Dapper',
      distance: '0.5 miles away',
      rating: 4.5,
      reviews: '900',
      image: require('./assets/b3-bespoke-round-barber-shop-sign-window-sticker-high-quality-vinyl-sticky-back-plastic-commercial-window-glass-stickers.jpg'),
    },
  ];

  const renderBarbershopCard = ({ item, index }) => {
    const inputRange = [-1, 0, (200 + 20) * index, (200 + 20) * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[styles.barbershopCard, { transform: [{ scale }], opacity }]}>
        <Image source={item.image} style={styles.barbershopImage} />
        <View style={styles.barbershopInfo}>
          <Text style={styles.barbershopName}>{item.name}</Text>
          <Text style={styles.barbershopDetails}>
            Barbershop · {item.distance}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews})</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubbles-outline" size={20} color="#F9A826" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Feather name="menu" size={24} />
        </TouchableOpacity>
        <Image
          source={require('./assets/att.Fr_9jx6reYE_J213nNP70xO5ko-eXzdnnHv8v7NMcgo-removebg-preview.png')}
          style={styles.logo}
        />
      </View>

      <Animated.FlatList
        data={barbershops}
        renderItem={renderBarbershopCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.carouselContent}
        showsVerticalScrollIndicator={false}
        snapToInterval={200 + 20}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />

      <BottomNavBar />
      <Modal
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
        animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}>
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              style={styles.specialMenuItem}
              onPress={() => {
                setIsMenuVisible(false);
                navigation.navigate('CreateShop');
              }}>
              <FontAwesome name="user-plus" size={20} color="#0B192C" />
              <Text style={styles.specialMenuText}>Become a BARBER</Text>
            </TouchableOpacity>
            >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuVisible(false);
                navigation.navigate('Settings');
              }}>
              <Ionicons name="settings-outline" size={20} color="#fff" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuVisible(false);
                navigation.navigate('UserProfile');
              }}>
              <Feather name="user" size={20} color="#fff" />
              <Text style={styles.menuText}>Your Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuVisible(false); // Close the menu
                navigation.navigate('AboutUs'); // Navigate to AboutUs screen
              }}>
              <Feather name="info" size={20} color="#fff" />
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 6,
    backgroundColor: '#F9A826',
    borderRadius: 8,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  carouselContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  barbershopCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 170,
  },
  barbershopImage: {
    width: 120,
    height: '100%',
  },
  barbershopInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  barbershopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B192C',
  },
  barbershopDetails: {
    fontSize: 14,
    color: '#0B192C',
    opacity: 0.7,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#F9A826',
  },
  reviews: {
    color: '#0B192C',
    opacity: 0.7,
  },
  chatButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(249, 168, 38, 0.1)',
    borderRadius: 20,
    padding: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 60, // Adjust this value based on your header height
    left: 15,
    backgroundColor: '#F9A826', // Changed to your desired color
    borderRadius: 10,
    padding: 20, // Increased padding
    width: 250, // Increased width
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  specialMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  specialMenuText: {
    marginLeft: 10,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Increased spacing between items
    paddingVertical: 10, // Added vertical padding
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18, // Increased font size
    color: '#FFFFFF', // Changed to white for contrast
    fontFamily: 'Poppins-Regular',
  },
});

export default HomeScreen;
