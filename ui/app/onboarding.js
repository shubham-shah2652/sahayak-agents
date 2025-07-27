import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Onboarding() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4">Welcome</Text>
      <Text className="text-base text-center mb-8">
        Just a moment while we set up your assistant
      </Text>
      <View className="mb-8">
        <Text className="mb-2">📅 Organizing your schedule</Text>
        <Text className="mb-2">⭐ Tracking student progress</Text>
        <Text>📚 Preparing your resources</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-600 px-8 py-3 rounded-full"
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text className="text-white text-lg font-semibold">Start Now</Text>
      </TouchableOpacity>
    </View>
  );
}