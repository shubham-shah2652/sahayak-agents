import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS } from '../constants/colors';

export default function SchedulesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [schedules, setSchedules] = useState([
    {
      date: "28",
      month: "JUL",
      time: "9:00 - 9:45 AM",
      title: "Mathematics - 5A",
      tags: ["CLASS 5A", "MATH"],
      participants: 1,
    },
    {
      date: "28",
      month: "JUL",
      time: "9:45 - 10:30 AM",
      title: "Mathematics - 5A",
      tags: ["CLASS 5A", "MATH"],
      participants: 1,
    },
    {
      date: "28",
      month: "JUL",
      time: "10:30 - 11:15 AM",
      title: "Mathematics - 4A",
      tags: ["CLASS 4A", "MATH"],
      participants: 1,
    },
    {
      date: "28",
      month: "JUL",
      time: "12:20 - 1:05 PM",
      title: "Mathematics - 4A",
      tags: ["CLASS 4A", "MATH"],
      participants: 1,
    },
    {
      date: "28",
      month: "JUL",
      time: "1:05 - 1:50 PM",
      title: "Environmental Studies - 5B",
      tags: ["CLASS 5B", "EVS", "SUBSTITUTE"],
      participants: 2,
    },
  ]);

  // Add new schedule if passed from form
  useEffect(() => {
    if (params.newSchedule) {
      try {
        const newSchedule = JSON.parse(params.newSchedule);
        setSchedules((prev) => [newSchedule, ...prev]);
        // Optionally, clear the param after adding
        // router.setParams({ newSchedule: undefined });
      } catch (e) {
        // ignore parse errors
      }
    }
  }, [params.newSchedule]);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>Today's Schedule</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="notifications" size={24} color="#333" style={{ marginRight: 15 }} />
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={{ width: 35, height: 35, borderRadius: 17.5 }}
            />
          </View>
        </View>
        
        {/* Add Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: -25,
            right: 20,
            backgroundColor: COLORS.primary,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8
          }}
          onPress={() => router.push('/form')}
        >
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        {/* Featured Class Card */}
        <TouchableOpacity 
          style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={() => {
            const mathClassDetails = {
              title: "Math Class",
              time: "8:00 AM",
              date: "18 NOV",
              tags: ["CORE", "MATH"],
              participants: 1,
              description: "Advanced mathematics class focusing on algebra and calculus concepts. Students will solve complex problems and learn mathematical reasoning through interactive exercises and real-world applications.",
              instructor: "Prof. Michael Chen",
              location: "Room 301",
              materials: ["Calculator", "Graph paper", "Textbook", "Ruler"],
              objectives: [
                "Master algebraic concepts",
                "Solve complex equations",
                "Apply mathematical reasoning",
                "Prepare for advanced topics"
              ]
            };
            router.push('/schedules-class?classDetails=' + encodeURIComponent(JSON.stringify(mathClassDetails)));
          }}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop' }}
              style={{ width: 60, height: 60, borderRadius: 8, marginRight: 15 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Math Class</Text>
              <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>8:00 AM</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Schedule Items */}
        {schedules.map((item, idx) => (
          <ScheduleItem
            key={idx}
            date={item.date}
            month={item.month}
            time={item.time}
            title={item.title}
            tags={item.tags}
            participants={item.participants}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function ScheduleItem({ date, month, time, title, tags, participants }) {
  const router = useRouter();
  
  const handlePress = () => {
    // Create class details object
    const classDetails = {
      title: title,
      time: time,
      date: `${date} ${month}`,
      tags: tags,
      participants: participants,
      description: `This is a detailed description of the ${title} class. Students will engage in interactive learning activities and hands-on exercises to enhance their understanding of the subject matter.`,
      instructor: "Dr. Sarah Johnson",
      location: "Room 205",
      materials: ["Notebook", "Pencil", "Textbook", "Calculator"],
      objectives: [
        "Understand key concepts",
        "Practice problem-solving",
        "Collaborate with peers",
        "Complete assigned tasks"
      ]
    };
    
    // Navigate to class details page with data
    router.push('/schedules-class?classDetails=' + encodeURIComponent(JSON.stringify(classDetails)));
  };

  return (
    <TouchableOpacity 
      style={{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Date Badge */}
        <View style={{
          backgroundColor: COLORS.primary,
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{date}</Text>
          <Text style={{ color: 'white', fontSize: 10 }}>{month}</Text>
        </View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>{time}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>{title}</Text>
          
          {/* Tags */}
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {tags.map((tag, index) => (
              <View key={index} style={{
                backgroundColor: '#e0f2fe',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                marginRight: 8
              }}>
                <Text style={{ fontSize: 12, color: COLORS.primary }}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Participants */}
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row' }}>
            {[...Array(participants)].map((_, index) => (
              <Image 
                key={index}
                source={{ uri: `https://randomuser.me/api/portraits/${index % 2 ? 'women' : 'men'}/${index + 1}.jpg` }}
                style={{ 
                  width: 25, 
                  height: 25, 
                  borderRadius: 12.5,
                  marginLeft: index > 0 ? -8 : 0,
                  borderWidth: 2,
                  borderColor: 'white'
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}