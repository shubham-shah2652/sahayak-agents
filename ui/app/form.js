// ... existing code ...
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

export default function FormScreen() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = () => {
    if (!date || !month || !time || !title || !tags || !participants) return;
    const newSchedule = {
      date,
      month,
      time,
      title,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      participants: parseInt(participants, 10),
    };
    router.replace({ pathname: '/schedules', params: { newSchedule: JSON.stringify(newSchedule) } });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f5f5f5' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: COLORS.primary }}>Add Schedule</Text>
          
          <Text style={{ marginBottom: 6, color: '#333' }}>Date (e.g. 18)</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
            placeholder="Date"
            style={inputStyle}
          />

          <Text style={{ marginBottom: 6, marginTop: 12, color: '#333' }}>Month (e.g. NO)</Text>
          <TextInput
            value={month}
            onChangeText={setMonth}
            placeholder="Month"
            style={inputStyle}
          />

          <Text style={{ marginBottom: 6, marginTop: 12, color: '#333' }}>Time (e.g. 9:00 - 10:30 AM)</Text>
          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="Time"
            style={inputStyle}
          />

          <Text style={{ marginBottom: 6, marginTop: 12, color: '#333' }}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            style={inputStyle}
          />

          <Text style={{ marginBottom: 6, marginTop: 12, color: '#333' }}>Tags (comma separated)</Text>
          <TextInput
            value={tags}
            onChangeText={setTags}
            placeholder="e.g. PREPARA,LESSON"
            style={inputStyle}
          />

          <Text style={{ marginBottom: 6, marginTop: 12, color: '#333' }}>Participants (number)</Text>
          <TextInput
            value={participants}
            onChangeText={setParticipants}
            keyboardType="numeric"
            placeholder="Participants"
            style={inputStyle}
          />

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 14,
              borderRadius: 10,
              marginTop: 28,
              alignItems: 'center'
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add Schedule</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const inputStyle = {
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 16,
  marginBottom: 2,
};