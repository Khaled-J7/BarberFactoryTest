import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BottomNavBar from './BottomNavBar';

const { width, height } = Dimensions.get('window');

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({
    latitude: 33.8869,
    longitude: 9.5375,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Assume search and geocoding logic will be handled in the backend
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      {!isFullScreen && (
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="#fff" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for barbershops..."
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      <View style={isFullScreen ? styles.mapFullScreenContainer : styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        />
      </View>

      <TouchableOpacity style={styles.fullScreenButton} onPress={toggleFullScreen}>
        <Feather name={isFullScreen ? 'minimize' : 'maximize'} size={24} color="#fff" />
      </TouchableOpacity>

      {!isFullScreen && <BottomNavBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B192C',
    borderRadius: 25,
    marginTop: 55, // Safe distance from the top
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 1, // Keeps the search bar on top of the map
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 20, // Styled border radius for the map
    overflow: 'hidden', // Ensures the map respects the border radius
  },
  mapFullScreenContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#0B192C',
    borderRadius: 50,
    padding: 10,
  },
});

export default ExploreScreen;
