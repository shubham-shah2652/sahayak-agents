import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { COLORS } from "../constants/colors";
import { useTranslation } from 'react-i18next';

export default function CameraDialog({ visible, onClose, onImageUploaded, heading = "Grade Quiz" }) {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickImageFromGallery = async () => {
    try {
      console.log("Requesting media library permissions...");
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Permission result:", permissionResult);
      
      if (permissionResult.granted === false) {
        Alert.alert(
          t('common.permissionRequired'), 
          t('camera.photoPermissionMessage')
        );
        return;
      }

      console.log("Launching image library...");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log("Image picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        console.log("Image selected:", result.assets[0].uri);
      } else {
        console.log("Image selection was canceled or failed");
      }
    } catch (error) {
      console.error("Error picking image from gallery:", error);
      Alert.alert(t('common.error'), `${t('camera.uploadFailed')}: ${error.message}`);
    }
  };

  const takePhoto = async () => {
    try {
      console.log("Requesting camera permissions...");
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      console.log("Camera permission result:", permissionResult);
      
      if (permissionResult.granted === false) {
        Alert.alert(
          t('common.permissionRequired'), 
          t('camera.cameraPermissionMessage')
        );
        return;
      }

      console.log("Launching camera...");
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log("Camera result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        console.log("Photo taken:", result.assets[0].uri);
      } else {
        console.log("Camera was canceled or failed");
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert(t('common.error'), `${t('camera.uploadFailed')}: ${error.message}`);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!image) {
      Alert.alert(t('common.error'), t('camera.noImage'));
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      console.log("Starting image upload...");
      console.log("Image URI:", image);
      
      // Convert image to blob
      const response = await fetch(image);
      const blob = await response.blob();
      console.log("Blob created, size:", blob.size);

      // Generate unique filename in the attendance data folder
      const filename = `sahayak_attendance_data/temp/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      const storageRef = ref(storage, filename);
      console.log("Storage reference created:", filename);

      // Upload to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress / 100);
          console.log("Upload progress:", progress);
        },
        (error) => {
          console.error("Upload error:", error);
          Alert.alert(t('common.error'), `${t('camera.uploadFailed')}: ${error.message}`);
          setIsLoading(false);
        },
        async () => {
          try {
            console.log("Upload completed, generating GS URI...");
            // Generate GS URI
            const bucket = storage.bucket || 'sahayakai-466115.appspot.com';
            const gsUri = `gs://${bucket}/${filename}`;
            console.log("Image uploaded successfully. GS URI:", gsUri);
            
            // Call the callback with the GS URI
            onImageUploaded(gsUri);
            
            // Reset state
            setImage(null);
            setIsLoading(false);
            setUploadProgress(0);
            onClose();
            
            Alert.alert(t('common.success'), t('camera.uploadSuccess'));
          } catch (error) {
            console.error("Error getting GS URI:", error);
            Alert.alert(t('common.error'), `${t('camera.uploadFailed')}: ${error.message}`);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert(t('common.error'), `${t('camera.uploadFailed')}: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setImage(null);
    setIsLoading(false);
    setUploadProgress(0);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{heading}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.uploadButton]}
                  onPress={uploadImageToFirebase}
                  disabled={isLoading}
                >
                  <Ionicons name="cloud-upload" size={20} color="white" />
                  <Text style={styles.buttonText}>
                    {isLoading ? t('camera.uploading') : t('camera.uploadImageButton')}
                  </Text>
                </TouchableOpacity>
                {isLoading && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${uploadProgress * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {Math.round(uploadProgress * 100)}%
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setImage(null)}
                >
                  <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                <View style={styles.optionIcon}>
                  <Ionicons name="camera" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.optionText}>{t('camera.takePhoto')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionButton} onPress={pickImageFromGallery}>
                <View style={styles.optionIcon}>
                  <Ionicons name="images" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.optionText}>{t('camera.uploadImage')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  optionButton: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    minWidth: 120,
  },
  optionIcon: {
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});
