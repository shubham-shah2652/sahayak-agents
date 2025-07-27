import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold mb-2">SAHAAYAK</Text>
      <Text className="text-lg text-gray-500 mb-8">Streamline your teaching tasks</Text>
      <MaterialIcons name="calendar-today" size={100} color="#2563eb" />
      <TouchableOpacity
        className="mt-10 bg-blue-600 px-8 py-3 rounded-full"
        onPress={() => router.push('/onboarding')}
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}