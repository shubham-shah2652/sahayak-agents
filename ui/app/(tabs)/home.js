import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CameraDialog from '../../components/Camera';
import LanguageSelector from '../../components/LanguageSelector';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [languageSelectorVisible, setLanguageSelectorVisible] = useState(false);

  const handleStartSession = () => {
    router.push('/schedules');
  };

  const handleGradeQuiz = () => {
    setCameraVisible(true);
  };

  const handleImageUploaded = (imageUrl) => {
    console.log('Image uploaded successfully for quiz grading:', imageUrl);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{t('home.title')}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setLanguageSelectorVisible(true)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                width: 45,
                height: 45,
                borderRadius: 22.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
              }}
            >
              <MaterialIcons name="language" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/chat')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                width: 45,
                height: 45,
                borderRadius: 22.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
              }}
            >
              <MaterialIcons name="chat" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 45,
              height: 45,
              borderRadius: 22.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialIcons name="mic" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {/* AI Assistance Card */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          marginBottom: 25,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>
            {t('home.welcomeMessage')}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <MaterialIcons name="wifi" size={16} color={COLORS.accent} />
            <Text style={{ fontSize: 14, color: '#10b981', marginLeft: 5 }}>{t('home.online')}</Text>
            <Text style={{ fontSize: 12, color: '#666', marginLeft: 'auto' }}>
              {t('home.lastSync')}: 10:30 AM
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#f0f9ff',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15
              }}>
                <MaterialIcons name="psychology" size={24} color={COLORS.primary} />
              </View>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                {t('home.aiAssistance')}
              </Text>
            </View>

            <TouchableOpacity style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{t('home.create')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15 }}>
            <TouchableOpacity style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
              backgroundColor: COLORS.card,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10
            }}>
              <MaterialIcons name="cloud-upload" size={18} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={{
              width: 35,
              height: 35,
              borderRadius: 17.5,
              backgroundColor: COLORS.card,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10
            }}>
              <MaterialIcons name="download" size={18} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: -100 }}>
          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.card,
              width: '48%',
              aspectRatio: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15
            }}
            onPress={() => router.push('/create-lesson')}
          >
            <MaterialIcons name="book" size={32} color={COLORS.primary} style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: '500' }}>
              {t('home.createLesson')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.card,
              width: '48%',
              aspectRatio: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15
            }}
            onPress={handleStartSession}
          >
            <MaterialIcons name="present-to-all" size={32} color={COLORS.primary} style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: '500' }}>
              {t('home.startClass')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.card,
              width: '48%',
              aspectRatio: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15
            }}
            onPress={handleGradeQuiz}
          >
            <MaterialIcons name="how-to-reg" size={32} color={COLORS.primary} style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: '500' }}>
              {t('home.gradeQuiz')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.card,
              width: '48%',
              aspectRatio: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15
            }}
            onPress={() => router.push('/analytics')}
          >
            <MaterialIcons name="show-chart" size={32} color={COLORS.primary} style={{ marginBottom: 12 }} />
            <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: '500' }}>
              {t('home.analytics')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>
            {t('home.todaysSchedule')}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{
            backgroundColor: COLORS.card,
            padding: 15,
            borderRadius: 15,
            flex: 1,
            marginRight: 10
          }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>8:00 AM</Text>
            <Text style={{ fontSize: 16, color: '#666' }}>Math</Text>
          </View>

          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.primary,
              padding: 15,
              borderRadius: 15,
              flex: 1,
              marginHorizontal: 5
            }}
            onPress={handleStartSession}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              {t('home.startClassButton')}
            </Text>
          </TouchableOpacity>

          <View style={{
            backgroundColor: COLORS.card,
            padding: 15,
            borderRadius: 15,
            flex: 1,
            marginLeft: 10,
            alignItems: 'center'
          }}>
            <MaterialIcons name="play-arrow" size={24} color={COLORS.primary} />
            <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>Science</Text>
          </View>
        </View>
      </ScrollView>

      {/* Camera Dialog */}
      <CameraDialog
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onImageUploaded={handleImageUploaded}
        heading="Grade Quiz"
      />

      {/* Language Selector */}
      <LanguageSelector
        visible={languageSelectorVisible}
        onClose={() => setLanguageSelectorVisible(false)}
      />
    </View>
  );
}