import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import BottomNavBar from './BottomNavBar';
import { Calendar } from 'react-native-calendars';

const AppointmentsScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    clientName: '',
    comment: '',
  });

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setNewAppointment({ ...newAppointment, date });
    hideDatePicker();
  };

  const addAppointment = () => {
    if (newAppointment.clientName.trim() === '') {
      alert('Please enter a client name');
      return;
    }
    setAppointments([
      ...appointments,
      { ...newAppointment, id: Date.now().toString() },
    ]);
    setModalVisible(false);
    setNewAppointment({ date: new Date(), clientName: '', comment: '' });
  };

  const deleteAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const renderAppointmentItem = ({ item }) => (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.appointmentItem}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentDate}>
          {item.date.toLocaleDateString()} at{' '}
          {item.date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <TouchableOpacity onPress={() => deleteAppointment(item.id)}>
          <Ionicons name="close-circle" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <Text style={styles.clientName}>{item.clientName}</Text>
      {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#141E30', '#243B55']} style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleCalendar}
            style={styles.calendarIconContainer}>
            <FontAwesome5 name="calendar-alt" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={appointments}
          renderItem={renderAppointmentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.appointmentList}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>No appointments scheduled</Text>
          }
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}>
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.addButtonGradient}>
            <Ionicons name="add" size={32} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#2c3e50', '#3498db']}
              style={styles.modalContent}>
              <Text style={styles.modalTitle}>New Appointment</Text>
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.datePickerButton}>
                <FontAwesome5
                  name="calendar-alt"
                  size={20}
                  color="#FFF"
                  style={styles.dateIcon}
                />
                <Text style={styles.datePickerButtonText}>
                  {newAppointment.date.toLocaleDateString()} at{' '}
                  {newAppointment.date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Client Name"
                placeholderTextColor="#A0A0A0"
                value={newAppointment.clientName}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, clientName: text })
                }
              />
              <TextInput
                style={[styles.input, styles.commentInput]}
                placeholder="Add a note (optional)"
                placeholderTextColor="#A0A0A0"
                value={newAppointment.comment}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, comment: text })
                }
                multiline
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={addAppointment}
                  style={[styles.modalButton, styles.addAppointmentButton]}>
                  <Text style={styles.modalButtonText}>Schedule</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={toggleCalendar}>
          <TouchableOpacity
            style={styles.calendarModalContainer}
            activeOpacity={1}
            onPress={toggleCalendar}>
            <View style={styles.calendarModalContent}>
              <Calendar
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: 'orange',
                  monthTextColor: 'blue',
                  indicatorColor: 'blue',
                  textDayFontFamily: 'Poppins-Regular',
                  textMonthFontFamily: 'Poppins-Bold',
                  textDayHeaderFontFamily: 'Poppins-Medium',
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </LinearGradient>

      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  calendarIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
  },
  appointmentList: {
    padding: 10,
  },
  appointmentItem: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentDate: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },
  clientName: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E0E0E0',
    fontStyle: 'italic',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
    marginTop: 50,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
  },
  addButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateIcon: {
    marginRight: 10,
  },
  datePickerButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFF',
  },
  input: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#FFF',
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  addAppointmentButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  calendarModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarModalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
  },
});

export default AppointmentsScreen;
