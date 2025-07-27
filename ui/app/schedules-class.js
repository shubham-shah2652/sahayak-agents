import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import TopicsList from '../components/TopicsList';
import CameraDialog from '../components/Camera';

export default function ScheduleClassScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [classDetails, setClassDetails] = useState(null);
  const [topics, setTopics] = useState([]);
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'topics'
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    if (params.classDetails) {
      try {
        setClassDetails(JSON.parse(decodeURIComponent(params.classDetails)));
      } catch (e) {
        console.error('Failed to parse class details');
      }
    }
  }, [params.classDetails]);

  // Simulating API call to get topics
  useEffect(() => {
    // This would be your actual API call
    const mockTopicsData = {
      "count": 20,
      "status": "success",
      "topics": [
        {
          "class": "class_4",
          "created_at": "Sat, 26 Jul 2025 20:07:30 GMT",
          "date": "2025-07-28",
          "day_number": "1",
          "objectives": ["Understand numbers beyond 1000", "Identify ranges of numbers for different situations"],
          "plan_id": "6adf5e55-eb18-4d0f-b120-1f2bec729f19",
          "status": "pending",
          "subject": "Mathematics",
          "teacher_id": "T002",
          "topic": "Thousands Around Us",
          "topic_id": "5029f13a-a7e5-4572-acab-beba40538d2f",
          "unit": "Numbers and Operations"
        },
        {
          "class": "class_4",
          "created_at": "Sat, 26 Jul 2025 20:07:30 GMT",
          "date": "2025-07-29",
          "day_number": "2",
          "objectives": ["Use real-world data to illustrate large numbers", "Understand the Indian base-10 place value system using Dienes blocks"],
          "plan_id": "6adf5e55-eb18-4d0f-b120-1f2bec729f19",
          "status": "pending",
          "subject": "Mathematics",
          "teacher_id": "T002",
          "topic": "Thousands Around Us",
          "topic_id": "6e8474fa-1688-42b6-ad2b-4e9912f0c385",
          "unit": "Numbers and Operations"
        },
        {
          "class": "class_4",
          "created_at": "Sat, 26 Jul 2025 20:07:30 GMT",
          "date": "2025-07-30",
          "day_number": "3",
          "objectives": ["Make numbers with arrow cards", "Express numbers in expanded form and words"],
          "plan_id": "6adf5e55-eb18-4d0f-b120-1f2bec729f19",
          "status": "pending",
          "subject": "Mathematics",
          "teacher_id": "T002",
          "topic": "Thousands Around Us",
          "topic_id": "e764d019-36f5-4d3b-9ecb-9822b6ac2e1d",
          "unit": "Numbers and Operations"
        },
        {
          "class": "class_4",
          "created_at": "Sat, 26 Jul 2025 20:07:30 GMT",
          "date": "2025-07-31",
          "day_number": "4",
          "objectives": ["Compare numbers using symbols (<, =, >)", "Arrange numbers in decreasing order"],
          "plan_id": "6adf5e55-eb18-4d0f-b120-1f2bec729f19",
          "status": "pending",
          "subject": "Mathematics",
          "teacher_id": "T002",
          "topic": "Thousands Around Us",
          "topic_id": "db8640d9-23dc-48d7-8982-c71bcae35ac8",
          "unit": "Numbers and Operations"
        },
        {
          "class": "class_4",
          "created_at": "Sat, 26 Jul 2025 20:07:30 GMT",
          "date": "2025-08-01",
          "day_number": "5",
          "objectives": ["Determine the number of integers between two given thousands", "Create and arrange four-digit numbers without repetition"],
          "plan_id": "6adf5e55-eb18-4d0f-b120-1f2bec729f19",
          "status": "pending",
          "subject": "Mathematics",
          "teacher_id": "T002",
          "topic": "Thousands Around Us",
          "topic_id": "91c15c24-60d0-4e50-9c86-338fbb5d1927",
          "unit": "Numbers and Operations"
        }
      ]
    };
    setTopics(mockTopicsData.topics);
  }, []);

  const handleTakeAttendance = () => {
    setCameraVisible(true);
  };

  const handleImageUploaded = (imageUrl) => {
    // Navigate to attendance results screen
    router.push({
      pathname: '/attendance-results',
      params: { imageUrl }
    });
  };

  if (!classDetails) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'white',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>{classDetails.title}</Text>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setActiveTab('details')}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: activeTab === 'details' ? COLORS.primary : 'transparent',
              marginRight: 10
            }}
          >
            <Text style={{ color: activeTab === 'details' ? 'white' : '#666' }}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('topics')}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: activeTab === 'topics' ? COLORS.primary : 'transparent'
            }}
          >
            <Text style={{ color: activeTab === 'topics' ? 'white' : '#666' }}>Topics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {activeTab === 'details' ? (
          <ScrollView>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{classDetails.time}</Text>
              <Text style={{ color: '#666', marginBottom: 15 }}>{classDetails.date}</Text>
              
              <Text style={{ fontSize: 16, marginBottom: 20 }}>{classDetails.description}</Text>
              
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Instructor</Text>
              <Text style={{ marginBottom: 15 }}>{classDetails.instructor}</Text>
              
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Location</Text>
              <Text style={{ marginBottom: 15 }}>{classDetails.location}</Text>
              
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Materials Needed</Text>
              {classDetails.materials.map((material, index) => (
                <Text key={index} style={{ marginBottom: 5 }}>• {material}</Text>
              ))}

              {/* Take Attendance Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  borderRadius: 12,
                  marginTop: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                onPress={handleTakeAttendance}
              >
                <MaterialIcons name="how-to-reg" size={24} color="white" />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }}>
                  Take Attendance
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <TopicsList topics={topics} />
        )}
      </View>

      {/* Camera Dialog */}
      <CameraDialog
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onImageUploaded={handleImageUploaded}
        heading="Take Attendance"
      />
    </View>
  );
} 