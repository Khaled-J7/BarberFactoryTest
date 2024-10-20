import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}>
        <Feather name="home" size={24} color="#F9A826" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Explore')}>
        <Feather name="search" size={24} color="#F9A826" />
        <Text style={styles.navText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Appointments')}>
        <Ionicons name="calendar" size={24} color="#F9A826" />
        <Text style={styles.navText}>Appointments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Chat')}>
        <Feather name="message-circle" size={24} color="#F9A826" />
        <Text style={styles.navText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}>
        <Feather name="user" size={20} color="#F9A826" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0B192C',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1E2D3D',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#F9A826',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BottomNavBar;
