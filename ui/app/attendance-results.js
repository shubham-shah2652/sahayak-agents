import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS } from '../constants/colors';
import { useTranslation } from 'react-i18next';

export default function AttendanceResultsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.imageUrl) {
      console.log('Processing attendance with GS URI:', params.imageUrl);
      processAttendance(params.imageUrl);
    }
  }, [params.imageUrl]);

  const processAttendance = async (gsUri) => {
    setLoading(true);
    setError(null);

    try {
      gsUri = "gs://sahayak_attendance_data/known_faces/Charan_6fedd6.jpg"
      const response = await fetch('https://process-attendance-522049177242.us-east4.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_uri: gsUri
        })
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Attendance processing response:', data);
      
      if (data.success) {
        setAttendanceData(data);
      } else {
        throw new Error(data.message || 'Attendance processing failed');
      }
    } catch (error) {
      console.error('Error processing attendance:', error);
      setError(error.message);
      Alert.alert('Error', 'Failed to process attendance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
      case 'already_marked':
        return { name: 'check-circle', color: '#10b981' };
      case 'absent':
        return { name: 'cancel', color: '#ef4444' };
      default:
        return { name: 'help', color: '#f59e0b' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'present':
      case 'already_marked':
        return 'Present';
      case 'absent':
        return 'Absent';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 20, fontSize: 16, color: '#666' }}>
          Processing attendance...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
            Attendance Results
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {error ? (
          <View style={{
            backgroundColor: '#fef2f2',
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#fecaca'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <MaterialIcons name="error" size={24} color="#ef4444" />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ef4444', marginLeft: 10 }}>
                Error
              </Text>
            </View>
            <Text style={{ color: '#666', lineHeight: 20 }}>
              {error}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 15,
                alignSelf: 'flex-start'
              }}
              onPress={() => processAttendance(params.imageUrl)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : attendanceData ? (
          <>
            {/* Processed Image */}
            {attendanceData.annotated_image_url && (
              <View style={{
                backgroundColor: 'white',
                borderRadius: 15,
                padding: 15,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
                  Processed Image
                </Text>
                <Image
                  source={{ uri: attendanceData.annotated_image_url }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                    resizeMode: 'cover'
                  }}
                />
              </View>
            )}

            {/* Attendance List */}
            <View style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 20,
              marginBottom: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
                Student Attendance
              </Text>

              {attendanceData.marked_students && attendanceData.marked_students.length > 0 ? (
                attendanceData.marked_students.map((student, index) => {
                  const statusIcon = getStatusIcon(student.status);
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 15,
                        borderBottomWidth: index < attendanceData.marked_students.length - 1 ? 1 : 0,
                        borderBottomColor: '#f3f4f6'
                      }}
                    >
                      <View style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: '#f3f4f6',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 15
                      }}>
                        <MaterialIcons name="person" size={24} color={COLORS.primary} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                          {student.name}
                        </Text>
                        {student.timestamp && (
                          <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                            {student.timestamp}
                          </Text>
                        )}
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons 
                          name={statusIcon.name} 
                          size={24} 
                          color={statusIcon.color} 
                          style={{ marginRight: 8 }}
                        />
                        <Text style={{ 
                          fontSize: 14, 
                          fontWeight: '500',
                          color: statusIcon.color 
                        }}>
                          {getStatusText(student.status)}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                  <MaterialIcons name="people" size={48} color="#ccc" />
                  <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>
                    No students detected
                  </Text>
                </View>
              )}
            </View>

            {/* Summary */}
            <View style={{
              backgroundColor: COLORS.card,
              borderRadius: 15,
              padding: 20,
              marginBottom: 20
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
                Summary
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#10b981' }}>
                    {attendanceData.marked_students?.filter(s => s.status === 'present' || s.status === 'already_marked').length || 0}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#666' }}>Present</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ef4444' }}>
                    {attendanceData.marked_students?.filter(s => s.status === 'absent').length || 0}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#666' }}>Absent</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>
                    {attendanceData.marked_students?.length || 0}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#666' }}>Total</Text>
                </View>
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}
