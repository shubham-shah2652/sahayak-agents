import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentUpdateCard({ student }) {
  let icon = "check-circle";
  let color = "#2563eb";
  if (student.type === "star") { icon = "star"; color = "#fbbf24"; }
  if (student.type === "alert") { icon = "error"; color = "#ef4444"; }
  if (student.type === "info") { icon = "info"; color = "#6b7280"; }

  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg p-3 mb-2">
      <MaterialIcons name={icon} size={24} color={color} />
      <View className="ml-3">
        <Text className="font-semibold">{student.name}</Text>
        <Text className="text-gray-600">{student.update}</Text>
      </View>
    </View>
  );
}