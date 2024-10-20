import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFonts } from 'expo-font';

const ChatScreen = () => {
  // State for managing messages
  const [messages, setMessages] = useState([]);
  // State for managing input text
  const [inputText, setInputText] = useState('');
  // State for controlling date picker visibility
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // State for tracking the current appointment being modified
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  // State for managing user type (client or barber)
  const [userType, setUserType] = useState('client');

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  // Return null if fonts are not loaded yet
  if (!fontsLoaded) {
    return null;
  }

  // Function to send a new message
  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: userType,
        isAppointment: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  // Function to show the date picker
  const showDatePicker = (appointmentId = null) => {
    setCurrentAppointmentId(appointmentId);
    setDatePickerVisibility(true);
  };

  // Function to hide the date picker
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Function to handle date confirmation
  const handleConfirm = (date) => {
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString(
      [],
      { hour: '2-digit', minute: '2-digit' }
    )}`;
    if (currentAppointmentId) {
      // Rescheduling an existing appointment
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === currentAppointmentId
            ? {
                ...msg,
                text: formattedDate,
                status: 'rescheduled',
                sender: userType,
              }
            : msg
        )
      );
    } else {
      // Creating a new appointment
      const newAppointment = {
        id: Date.now().toString(),
        text: formattedDate,
        sender: userType,
        isAppointment: true,
        status: 'pending',
      };
      setMessages((prevMessages) => [...prevMessages, newAppointment]);
    }
    hideDatePicker();
    setCurrentAppointmentId(null);
  };

  // Function to confirm an appointment
  const confirmAppointment = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, status: 'confirmed' } : msg
      )
    );
  };

  // Function to render individual messages
  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'client' ? styles.clientMessage : styles.barberMessage,
      ]}>
      {item.sender === 'barber' && (
        <FontAwesome5
          name="store"
          size={30}
          color="#FFD700"
          style={styles.icon}
        />
      )}
      {item.isAppointment ? (
        <View style={styles.appointmentContainer}>
          <Text style={styles.appointmentText}>
            {item.status === 'confirmed'
              ? 'Confirmed Appointment: '
              : item.status === 'rescheduled'
              ? 'Rescheduled Appointment: '
              : 'Proposed Appointment:'}
          </Text>
          <Text style={styles.appointmentDate}>{item.text}</Text>
          {item.status === 'pending' && item.sender !== userType && (
            <View style={styles.appointmentActions}>
              <TouchableOpacity
                onPress={() => confirmAppointment(item.id)}
                style={[styles.actionButton, styles.confirmButton]}>
                <Text
                  style={[styles.actionButtonText, styles.confirmButtonText]}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showDatePicker(item.id)}
                style={[styles.actionButton, styles.rescheduleButton]}>
                <Text
                  style={[
                    styles.actionButtonText,
                    styles.rescheduleButtonText,
                  ]}>
                  Reschedule
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.messageBubble,
            item.sender === 'client'
              ? styles.clientMessageBubble
              : styles.barberMessageBubble,
          ]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      )}
      {item.sender === 'client' && (
        <Ionicons name="person" size={30} color="#4A90E2" style={styles.icon} />
      )}
    </View>
  );

  // Function to toggle between client and barber user types
  const toggleUserType = () => {
    setUserType((prevType) => (prevType === 'client' ? 'barber' : 'client'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat</Text>
          <TouchableOpacity
            onPress={toggleUserType}
            style={styles.userTypeToggle}>
            <Text style={styles.userTypeText}>
              {userType === 'client' ? 'Switch to Barber' : 'Switch to Client'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => showDatePicker()}
            style={styles.calendarButton}>
            <Ionicons name="calendar" size={24} color="#FFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
            placeholderTextColor="#A0A0A0"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  // SafeArea style
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  // Main container style
  container: {
    flex: 1,
  },
  // Header style
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2C2C2C',
  },
  // Header title style
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  // User type toggle button style
  userTypeToggle: {
    backgroundColor: '#4A4A4A',
    padding: 8,
    borderRadius: 8,
  },
  // User type toggle text style
  userTypeText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  // Message list style
  messageList: {
    padding: 16,
  },
  // Individual message container style
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  // Client message alignment
  clientMessage: {
    justifyContent: 'flex-end',
  },
  // Barber message alignment
  barberMessage: {
    justifyContent: 'flex-start',
  },
  // Message bubble style
  messageBubble: {
    maxWidth: '80%', 
    padding: 10,
    borderRadius: 20,
  },
  // Client message bubble style
  clientMessageBubble: {
    backgroundColor: '#3498DB',
  },
  // Barber message bubble style
  barberMessageBubble: {
    backgroundColor: '#F9A826',
  },
  // Confirm button style
  confirmButton: {
    backgroundColor: '#006400',
  },
  // Reschedule button style
  rescheduleButton: {
    backgroundColor: '#FFD700',
  },
  // Confirm button text style
  confirmButtonText: {
    color: '#FFFFFF',
  },
  // Reschedule button text style
  rescheduleButtonText: {
    color: '#000000',
  },
  // Message text style
  messageText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  // Appointment container style
  appointmentContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#90EE90',
  },
  // Appointment text style
  appointmentText: {
    color: '#0B192C',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  // Appointment date style
  appointmentDate: {
    color: '#0B192C',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  // Appointment actions container style
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  // Action button style
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  // Action button text style
  actionButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  // Icon style
  icon: {
    marginHorizontal: 6,
  },
  // Input container style
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
  },
  // Input field style
  input: {
    flex: 1,
    backgroundColor: '#4A4A4A',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFF',
    marginHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  // Calendar button style
  calendarButton: {
    padding: 8,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  // Send button style
  sendButton: {
    padding: 8,
    backgroundColor: '#50C878',
    borderRadius: 20,
  },
});

export default ChatScreen;
