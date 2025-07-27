import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const changeLanguage = async (languageCode) => {
    await i18n.changeLanguage(languageCode);
    setLanguageModalVisible(false);
  };

  const settingsOptions = [
    {
      title: t('settings.language'),
      icon: 'language',
      description: t('settings.languageDescription'),
      onPress: () => setLanguageModalVisible(true)
    },
    {
      title: t('settings.logout'),
      icon: 'logout',
      description: t('settings.logoutDescription'),
      onPress: () => console.log('Logout pressed')
    }
  ];

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
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{t('settings.title')}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              width: 45,
              height: 45,
              borderRadius: 22.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <MaterialIcons name="help" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {/* User Info Card */}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#f0f9ff',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
              <MaterialIcons name="person" size={30} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{t('settings.userName')}</Text>
              <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{t('settings.userRole')}</Text>
              <Text style={{ fontSize: 12, color: '#10b981', marginTop: 2 }}>{t('settings.userStatus')}</Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: COLORS.card,
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 15
            }}>
              <Text style={{ color: COLORS.primary, fontWeight: '500', fontSize: 12 }}>{t('settings.edit')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Options */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15 }}>{t('settings.settings')}</Text>
        
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={option.onPress}
          >
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: COLORS.card,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15
            }}>
              <MaterialIcons 
                name={option.icon} 
                size={24} 
                color={option.title === t('settings.logout') ? '#ef4444' : COLORS.primary} 
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: option.title === t('settings.logout') ? '#ef4444' : '#333',
                marginBottom: 2
              }}>
                {option.title}
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {option.description}
              </Text>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color="#ccc" 
            />
          </TouchableOpacity>
        ))}

        {/* App Version Info */}
        <View style={{
          backgroundColor: COLORS.card,
          borderRadius: 15,
          padding: 20,
          marginTop: 10,
          marginBottom: 30,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 14, color: '#666', textAlign: 'center' }}>
            {t('settings.appVersion')}
          </Text>
          <Text style={{ fontSize: 12, color: '#999', marginTop: 5, textAlign: 'center' }}>
            {t('settings.appDescription')}
          </Text>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('settings.selectLanguage')}</Text>
              <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    i18n.language === language.code && styles.selectedLanguage,
                  ]}
                  onPress={() => changeLanguage(language.code)}
                >
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text style={[
                    styles.languageName,
                    i18n.language === language.code && styles.selectedLanguageText,
                  ]}>
                    {language.name}
                  </Text>
                  {i18n.language === language.code && (
                    <MaterialIcons name="checkmark" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
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
  languageList: {
    gap: 10,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLanguage: {
    backgroundColor: '#e3f2fd',
    borderColor: COLORS.primary,
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedLanguageText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
}; 