import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BottomNavBar from './BottomNavBar';
import styles from './styles/CreateShopStyle';

const { width, height } = Dimensions.get('window');

const CreateProfileScreen = ({ navigation, isViewMode = false, profileData = null, onSaveProfile }) => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [barberInfo, setBarberInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    address: '',
    phone: '',
  });
  const [workShowcase, setWorkShowcase] = useState([]);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [viewMedia, setViewMedia] = useState(null);

  const formAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isViewMode && profileData) {
      setCoverPhoto(profileData.coverPhoto);
      setProfilePhoto(profileData.profilePhoto);
      setBarberInfo(profileData.barberInfo);
      setIsOpen(profileData.isOpen);
      setWorkShowcase(profileData.workShowcase);
    }
  }, [isViewMode, profileData]);

  const toggleForm = () => {
    setShowForm(!showForm);
    Animated.spring(formAnimation, {
      toValue: showForm ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const pickMedia = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        type === 'showcase'
          ? ImagePicker.MediaTypeOptions.All
          : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'cover' ? [16, 9] : [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'cover') setCoverPhoto(result.assets[0].uri);
      else if (type === 'profile') setProfilePhoto(result.assets[0].uri);
      else
        setWorkShowcase([
          ...workShowcase,
          { type: result.assets[0].type, uri: result.assets[0].uri },
        ]);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.shopName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };

  const saveInfo = () => {
    if (isFormValid()) {
      setBarberInfo(formData);
      toggleForm();
    } else {
      Alert.alert(
        'Incomplete Information',
        'Please fill in all fields before saving.'
      );
    }
  };

  const deleteShowcaseItem = (index) => {
    const newShowcase = [...workShowcase];
    newShowcase.splice(index, 1);
    setWorkShowcase(newShowcase);
    if (showcaseIndex >= newShowcase.length) {
      setShowcaseIndex(Math.max(0, newShowcase.length - 1));
    }
  };

  const renderWorkShowcase = () => {
    if (workShowcase.length === 0) {
      return (
        <TouchableOpacity
          style={styles.addMediaButton}
          onPress={() => pickMedia('showcase')}>
          <Ionicons name="add-circle-outline" size={40} color="#0B192C" />
          <Text style={styles.addMediaText}>Add Photos/Videos</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.carouselContainer}>
        <TouchableOpacity
          onPress={() => setShowcaseIndex(Math.max(0, showcaseIndex - 1))}>
          <Ionicons name="chevron-back" size={30} color="#0B192C" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMedia(workShowcase[showcaseIndex])}>
          <Image
            source={{ uri: workShowcase[showcaseIndex].uri }}
            style={styles.showcaseMedia}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setShowcaseIndex(
              Math.min(workShowcase.length - 1, showcaseIndex + 1)
            )
          }>
          <Ionicons name="chevron-forward" size={30} color="#0B192C" />
        </TouchableOpacity>
        {!isViewMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteShowcaseItem(showcaseIndex)}>
            <Ionicons name="trash-outline" size={24} color="#FF0000" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const saveProfile = () => {
    if (
      coverPhoto &&
      profilePhoto &&
      barberInfo &&
      workShowcase.length > 0 &&
      isOpen !== null
    ) {
      const profileData = {
        coverPhoto,
        profilePhoto,
        barberInfo,
        isOpen,
        workShowcase,
      };
      onSaveProfile(profileData);
    } else {
      Alert.alert(
        "Incomplete Profile",
        "Please fill in all required information before saving."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.coverPhotoContainer}>
          <TouchableOpacity
            onPress={() => setViewMedia({ type: 'image', uri: coverPhoto })}
            disabled={isViewMode}>
            {coverPhoto ? (
              <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
            ) : (
              <View style={styles.coverPhotoPlaceholder}>
                <Ionicons name="image-outline" size={40} color="#fff" />
                <Text style={styles.placeholderText}>Add Cover Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          {!isViewMode && (
            <TouchableOpacity
              style={styles.uploadButtonCover}
              onPress={() => pickMedia('cover')}>
              <Ionicons name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.profilePhotoContainer}>
          <View style={styles.profilePhotoWrapper}>
            <TouchableOpacity
              onPress={() =>
                setViewMedia({ type: 'image', uri: profilePhoto })
              }
              disabled={isViewMode}>
              {profilePhoto ? (
                <Image
                  source={{ uri: profilePhoto }}
                  style={styles.profilePhoto}
                />
              ) : (
                <View style={styles.profilePhotoPlaceholder}>
                  <Ionicons name="person-outline" size={40} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
            {!isViewMode && (
              <TouchableOpacity
                style={styles.uploadButtonProfile}
                onPress={() => pickMedia('profile')}>
                <Ionicons name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {barberInfo ? (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="user" size={20} color="#0B192C" />
              <Text style={styles.infoText}>{barberInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="store" size={20} color="#0B192C" />
              <Text style={styles.infoText}>{barberInfo.shopName}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="map-marker-alt" size={20} color="#0B192C" />
              <Text style={styles.infoText}>{barberInfo.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome5 name="phone" size={20} color="#0B192C" />
              <Text style={styles.infoText}>{barberInfo.phone}</Text>
            </View>
            {!isViewMode && (
              <TouchableOpacity style={styles.editButton} onPress={toggleForm}>
                <Text style={styles.editButtonText}>Edit Info</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity style={styles.addInfoButton} onPress={toggleForm}>
            <Text style={styles.addInfoButtonText}>Fill Your Information</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.storeIconContainer}
          onPress={() => !isViewMode && setShowToggle(true)}
          disabled={isViewMode}>
          <MaterialCommunityIcons name="store" size={40} color="#0B192C" />
          <Text style={styles.storeStatus}>{isOpen ? 'Open' : 'Closed'}</Text>
        </TouchableOpacity>

        <View style={styles.showcaseContainer}>
          <Text style={styles.showcaseTitle}>Work Showcase</Text>
          {renderWorkShowcase()}
          {!isViewMode && (
            <TouchableOpacity
              style={styles.addShowcaseButton}
              onPress={() => pickMedia('showcase')}>
              <Ionicons name="add-circle" size={30} color="#0B192C" />
            </TouchableOpacity>
          )}
        </View>

        {!isViewMode && (
          <TouchableOpacity style={styles.saveProfileButton} onPress={saveProfile}>
            <Text style={styles.saveProfileButtonText}>Save Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Modal visible={showForm} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.formContainer,
              {
                transform: [
                  {
                    translateY: formAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [height, 0],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity onPress={toggleForm} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.formTitle}>Barber Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#666"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Barbershop Name"
              placeholderTextColor="#666"
              value={formData.shopName}
              onChangeText={(text) =>
                setFormData({ ...formData, shopName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#666"
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#666"
              value={formData.phone}
              onChangeText={(text) =>
                setFormData({ ...formData, phone: text.replace(/[^0-9]/g, '') })
              }
              keyboardType="numeric"
            />
            <View style={styles.formButtonsContainer}>
              <TouchableOpacity style={styles.formButton} onPress={toggleForm}>
                <Text style={styles.formButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.formButton,
                  styles.saveButton,
                  !isFormValid() && styles.disabledButton,
                ]}
                onPress={saveInfo}
                disabled={!isFormValid()}>
                <Text style={styles.formButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <Modal visible={showToggle} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleTitle}>Barbershop Status</Text>
            <View style={styles.toggleOptions}>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  isOpen ? styles.toggleActive : null,
                  styles.toggleOpen,
                ]}
                onPress={() => {
                  setIsOpen(true);
                  setShowToggle(false);
                }}>
                <Text style={styles.toggleText}>Open</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleOption,
                  !isOpen ? styles.toggleActive : null,
                  styles.toggleClosed,
                ]}
                onPress={() => {
                  setIsOpen(false);
                  setShowToggle(false);
                }}>
                <Text style={styles.toggleText}>Closed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!viewMedia}
        transparent={true}
        onRequestClose={() => setViewMedia(null)}>
        <View style={styles.mediaViewerContainer}>
          <Image
            source={{ uri: viewMedia?.uri }}
            style={styles.fullMedia}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.closeMediaViewer}
            onPress={() => setViewMedia(null)}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </Modal>

      <BottomNavBar navigation={navigation} />
    </View>
  );
};

export default CreateProfileScreen;