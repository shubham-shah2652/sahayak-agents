import { View, Text, Image } from 'react-native';

export default function ProfileHeader({ profile }) {
  return (
    <View className="items-center my-6">
      <Image source={{ uri: profile.avatar }} className="w-24 h-24 rounded-full mb-2" />
      <Text className="text-xl font-bold">{profile.name}</Text>
      <Text className="text-gray-500">{profile.role}</Text>
      <Text className="text-blue-600">{profile.email}</Text>
      <Text className="text-gray-400">{profile.localTime}</Text>
    </View>
  );
}