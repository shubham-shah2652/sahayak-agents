import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function NotificationsScreen() {
  const students = [
    {
      name: 'Santosh',
      update: 'completed his homework',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      type: 'done',
      icon: 'assignment-turned-in',
      iconColor: '#10b981'
    },
    {
      name: 'Charan',
      update: 'aced her math test',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      type: 'star',
      icon: 'star',
      iconColor: '#f59e0b'
    },
    {
      name: 'Madhav',
      update: 'improved his reading skills!',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      type: 'star',
      icon: 'book',
      iconColor: '#3b82f6'
    },
    {
      name: 'Shubham',
      update: 'needs encouragement',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      type: 'alert',
      icon: 'warning',
      iconColor: '#ef4444'
    },
    {
      name: 'Sanya',
      update: 'is studying hard',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      type: 'info',
      icon: 'lightbulb',
      iconColor: '#8b5cf6'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'done':
        return { name: 'check-circle', color: '#10b981' };
      case 'star':
        return { name: 'star', color: '#f59e0b' };
      case 'alert':
        return { name: 'error', color: '#ef4444' };
      case 'info':
        return { name: 'info', color: '#6b7280' };
      default:
        return { name: 'info', color: '#6b7280' };
    }
  };

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
              backgroundColor: COLORS.primary,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
              <MaterialIcons name="notifications" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Notifications</Text>
          </View>
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Student Updates Card */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          {/* Card Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={{
              backgroundColor: COLORS.primary,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
              <MaterialIcons name="chat" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>Student Updates</Text>
          </View>

          {/* Student List */}
          {students.map((student, index) => {
            const actionIcon = getActionIcon(student.type);
            return (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 15,
                borderBottomWidth: index < students.length - 1 ? 1 : 0,
                borderBottomColor: '#f0f0f0'
              }}>
                {/* Profile Picture */}
                <Image 
                  source={{ uri: student.avatar }}
                  style={{ 
                    width: 45, 
                    height: 45, 
                    borderRadius: 22.5,
                    marginRight: 15
                  }}
                />

                {/* Student Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                    {student.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>
                    {student.update}
                  </Text>
                </View>

                {/* Action Icons */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    backgroundColor: actionIcon.color,
                    width: 35,
                    height: 35,
                    borderRadius: 17.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10
                  }}>
                    <MaterialIcons name={actionIcon.name} size={18} color="white" />
                  </View>
                  <View style={{
                    borderWidth: 2,
                    borderColor: '#e5e7eb',
                    width: 35,
                    height: 35,
                    borderRadius: 17.5,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialIcons name="more-vert" size={18} color="#9ca3af" />
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Add New Student Button */}
        <TouchableOpacity style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 25,
          alignItems: 'center',
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8
        }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Add new student
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}