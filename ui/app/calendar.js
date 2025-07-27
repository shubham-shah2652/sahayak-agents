import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CalendarScreen() {
  const currentDate = "18 Dec 2023";
  const selectedDay = 18;
  
  // Calendar data
  const daysInMonth = 31;
  const firstDayOfMonth = 5; // Friday (0=Sunday, 5=Friday)
  const events = [
    { title: "Lesson Planning", time: "9:00-10:30AM", icon: "description" },
    { title: "Progress Tracking", time: "1:00-2:00PM", icon: "work" },
    { title: "Notifications", time: "7:00-9:00PM", icon: "chat" }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty days for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', isEmpty: true });
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isEmpty: false });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

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
            <View style={{
              backgroundColor: '#2563eb',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
              <MaterialIcons name="calendar-today" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Calendar</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="notifications" size={24} color="#333" style={{ marginRight: 15 }} />
            <View style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
              backgroundColor: '#2563eb'
            }} />
          </View>
        </View>
        
        {/* Date */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 15 }}>{currentDate}</Text>
        
        {/* View Buttons */}
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <TouchableOpacity style={{
            backgroundColor: '#2563eb',
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 10
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#e0f2fe',
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 10
          }}>
            <Text style={{ color: '#2563eb' }}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#e0f2fe',
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20
          }}>
            <Text style={{ color: '#2563eb' }}>Daily</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Calendar Grid */}
      <View style={{ 
        backgroundColor: 'white', 
        margin: 20, 
        borderRadius: 15, 
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}>
        {/* Days of Week */}
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          {['Mo', 'Tu', 'We', 'Th', 'Fri', 'Sat', 'Su'].map((day, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#666', fontWeight: 'bold' }}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Days */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {calendarDays.map((item, index) => (
            <View key={index} style={{ 
              width: '14.28%', 
              height: 35, 
              justifyContent: 'center', 
              alignItems: 'center',
              marginBottom: 5
            }}>
              {!item.isEmpty && (
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: item.day === selectedDay ? '#2563eb' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: item.day === selectedDay ? 'white' : '#333',
                    fontWeight: item.day === selectedDay ? 'bold' : 'normal'
                  }}>
                    {item.day}
                  </Text>
                  {/* Event dot */}
                  {[1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 15, 16, 17, 19, 21, 22, 27, 31].includes(item.day) && (
                    <View style={{
                      position: 'absolute',
                      bottom: 2,
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: item.day === selectedDay ? 'white' : '#2563eb'
                    }} />
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Events List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        {events.map((event, index) => (
          <View key={index} style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                backgroundColor: '#e0f2fe',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15
              }}>
                <MaterialIcons name={event.icon} size={20} color="#2563eb" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{event.title}</Text>
                <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{event.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 