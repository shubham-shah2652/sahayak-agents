import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';
import { Picker } from '@react-native-picker/picker';
import { LineChart, BarChart } from 'react-native-chart-kit';

// Mock data
const CLASSES = ["Class 4A", "Class 4B", "Class 5A", "Class 5B"];
const STUDENTS = {
  "Class 4A": [
    {
      id: "1",
      name: "Rahul Kumar",
      attendance: 92,
      overallGrade: "A",
      subjects: {
        Mathematics: { grade: "A", progress: 85, trend: "improving" },
        Science: { grade: "B", progress: 75, trend: "stable" },
        English: { grade: "A", progress: 90, trend: "improving" },
        Social: { grade: "C", progress: 65, trend: "declining" }
      },
      recentScores: [85, 92, 88, 95, 89, 91],
      improvements: ["Problem Solving", "Mathematical Concepts"],
      needsWork: ["Social Studies Concepts", "Map Reading"]
    },
    {
      id: "2",
      name: "Priya Patel",
      attendance: 88,
      overallGrade: "B",
      subjects: {
        Mathematics: { grade: "B", progress: 78, trend: "stable" },
        Science: { grade: "A", progress: 88, trend: "improving" },
        English: { grade: "B", progress: 82, trend: "stable" },
        Social: { grade: "B", progress: 80, trend: "improving" }
      },
      recentScores: [78, 82, 85, 80, 88, 85],
      improvements: ["Scientific Concepts", "Lab Work"],
      needsWork: ["Complex Calculations"]
    }
  ]
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 112, 243, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export default function AnalyticsScreen() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  const renderClassOverview = () => (
    <View style={{ padding: 20 }}>
      {/* Class Statistics */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Class Overview</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>90%</Text>
            <Text style={{ color: '#666' }}>Attendance</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>85%</Text>
            <Text style={{ color: '#666' }}>Pass Rate</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary }}>B+</Text>
            <Text style={{ color: '#666' }}>Avg Grade</Text>
          </View>
        </View>
      </View>

      {/* Performance Chart */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Class Performance Trend</Text>
        <LineChart
          data={{
            labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'],
            datasets: [{
              data: [75, 82, 78, 85, 88]
            }]
          }}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      {/* Student List */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Students</Text>
        {STUDENTS[selectedClass]?.map(student => (
          <TouchableOpacity
            key={student.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            }}
            onPress={() => setSelectedStudent(student)}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{student.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>{student.name}</Text>
              <Text style={{ color: '#666' }}>Overall Grade: {student.overallGrade}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStudentDetail = () => (
    <View style={{ padding: 20 }}>
      {/* Back Button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={() => setSelectedStudent(null)}
      >
        <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        <Text style={{ marginLeft: 8, color: COLORS.primary, fontSize: 16 }}>Back to Class View</Text>
      </TouchableOpacity>

      {/* Student Header */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
          }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{selectedStudent.name[0]}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedStudent.name}</Text>
            <Text style={{ color: '#666' }}>Attendance: {selectedStudent.attendance}%</Text>
          </View>
        </View>
      </View>

      {/* Performance Chart */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Recent Performance</Text>
        <LineChart
          data={{
            labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6'],
            datasets: [{
              data: selectedStudent.recentScores
            }]
          }}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>

      {/* Subject Performance */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Subject Performance</Text>
        {Object.entries(selectedStudent.subjects).map(([subject, data]) => (
          <View key={subject} style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ fontSize: 16 }}>{subject}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 8, color: COLORS.primary, fontWeight: 'bold' }}>{data.grade}</Text>
                <MaterialIcons
                  name={data.trend === 'improving' ? 'trending-up' : data.trend === 'declining' ? 'trending-down' : 'trending-flat'}
                  size={20}
                  color={data.trend === 'improving' ? 'green' : data.trend === 'declining' ? 'red' : '#666'}
                />
              </View>
            </View>
            <View style={{
              height: 6,
              backgroundColor: '#f0f0f0',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <View style={{
                width: `${data.progress}%`,
                height: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 3,
              }} />
            </View>
          </View>
        ))}
      </View>

      {/* Areas of Improvement */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>Feedback & Recommendations</Text>
        
        <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10, color: 'green' }}>Strengths:</Text>
        {selectedStudent.improvements.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialIcons name="check-circle" size={20} color="green" style={{ marginRight: 8 }} />
            <Text>{item}</Text>
          </View>
        ))}

        <Text style={{ fontSize: 16, fontWeight: '500', marginVertical: 10, color: 'orange' }}>Areas for Improvement:</Text>
        {selectedStudent.needsWork.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialIcons name="info" size={20} color="orange" style={{ marginRight: 8 }} />
            <Text>{item}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Add Personal Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>Analytics Dashboard</Text>
        </View>

        {/* Class Selector */}
        <View style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          borderRadius: 8,
          backgroundColor: '#f8f8f8'
        }}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={setSelectedClass}
            style={{ height: 50 }}
          >
            {CLASSES.map((cls) => (
              <Picker.Item key={cls} label={cls} value={cls} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {selectedStudent ? renderStudentDetail() : renderClassOverview()}
      </ScrollView>
    </View>
  );
} 