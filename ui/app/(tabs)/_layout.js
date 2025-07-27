import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tabs.Screen name="home" options={{
        title: t('tabs.home'),
        tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />
      }} />
      <Tabs.Screen name="calendar" options={{
        title: t('tabs.calendar'),
        tabBarIcon: ({ color, size }) => <MaterialIcons name="calendar-today" color={color} size={size} />
      }} />
      <Tabs.Screen name="notifications" options={{
        title: t('tabs.notifications'),
        tabBarIcon: ({ color, size }) => <MaterialIcons name="notifications" color={color} size={size} />
      }} />
      <Tabs.Screen name="settings" options={{
        title: t('tabs.settings'),
        tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" color={color} size={size} />
      }} />
    </Tabs>
  );
}