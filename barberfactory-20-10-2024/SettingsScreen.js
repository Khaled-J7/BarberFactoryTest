import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomNavBar from './BottomNavBar';

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => setIsDarkMode(previousState => !previousState);

  const renderSettingItem = (icon, title, onPress, showArrow = true, extraComponent = null) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        {icon}
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      <View style={styles.settingItemRight}>
        {extraComponent}
        {showArrow && <Feather name="chevron-right" size={24} color="#0B192C" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B192C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        {renderSettingItem(
          <Feather name="sun" size={24} color="#0B192C" />,
          "Dark Mode",
          toggleTheme,
          false,
          <Switch
            trackColor={{ false: "#767577", true: "#F9A826" }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        )}

        {renderSettingItem(
          <Feather name="refresh-cw" size={24} color="#0B192C" />,
          "Search For Updates",
          () => {/* Handle search for updates */}
        )}

        {renderSettingItem(
          <Feather name="log-out" size={24} color="#0B192C" />,
          "Log Out",
          () => {/* Handle log out */}
        )}

        {renderSettingItem(
          <Feather name="trash-2" size={24} color="#FF3B30" />,
          "Delete Account",
          () => {/* Handle delete account */},
          true,
          <Text style={styles.deleteAccountText}>Delete</Text>
        )}
      </ScrollView>

      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0B192C',
    fontFamily: 'Poppins-Bold',
  },
  container: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#0B192C',
    fontFamily: 'Poppins-Regular',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteAccountText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default SettingsScreen;