import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AboutUsScreen = () => {
  const currentYear = new Date().getFullYear();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#48c6ef', '#6f86d6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}>
        <Image
          source={require('./assets/att.Fr_9jx6reYE_J213nNP70xO5ko-eXzdnnHv8v7NMcgo-removebg-preview-removebg-preview.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>About BarberFactory</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          BarberFactory is designed to revolutionize the barbershop experience.
          We connect skilled barbers with clients seeking top-notch grooming
          services, making booking and managing appointments effortless for
          everyone involved.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>For Barbershops</Text>
        <View style={styles.featureItem}>
          <Ionicons name="business-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>
            Create your unique shop profile
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="calendar-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>Manage appointments with ease</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="images-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>Showcase your best work</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="star-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>
            Build your reputation with reviews
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>For Clients</Text>
        <View style={styles.featureItem}>
          <Ionicons name="search-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>
            Discover top-rated barbershops nearby
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="book-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>
            Book appointments with a few taps
          </Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="cut-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>Browse styles and services</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="chatbubbles-outline" size={24} color="#0B192C" />
          <Text style={styles.featureText}>
            Communicate directly with your barber
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.text}>
          1. Create an account as a barbershop owner or client. 2. Barbershops:
          Set up your profile, add services, and manage availability. 3.
          Clients: Browse nearby barbershops, view portfolios, and book
          appointments. 4. Enjoy a seamless, professional grooming experience!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Join the BarberFactory Community
        </Text>
        <Text style={styles.text}>
          Whether you're a skilled barber looking to grow your business or a
          client seeking the perfect cut, BarberFactory is here to elevate your
          grooming experience. Join us in redefining the world of barbershop
          services!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developed By</Text>
        <View style={styles.developerContainer}>
          <Image
            source={require('./assets/462540768_1055800269661705_3344249653562002506_n.jpg')}
            style={styles.developerImage}
          />
          <Text style={styles.developerName}>Khaled Jallouli</Text>
        </View>
        <View style={styles.developerContainer}>
          <Image
            source={require('./assets/462542215_1202849944347324_7763318962920917059_n.jpg')}
            style={styles.developerImage}
          />
          <Text style={styles.developerName}>Khairi Taboubi</Text>
        </View>
      </View>

      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © {currentYear} BarberFactory. All rights reserved.
        </Text>
        <Text style={styles.copyrightText}>Version 1.0.0</Text>
        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL('https://www.barberfactory.com/terms')
          }>
          Terms of Service
        </Text>
        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL('https://www.barberfactory.com/privacy')
          }>
          Privacy Policy
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9A826',
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginBottom: 10,
    color: '#0B192C',
    fontFamily: 'Poppins-Bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  developerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  developerName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  copyrightSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  copyrightText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    color: '#F9A826',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});

export default AboutUsScreen;
