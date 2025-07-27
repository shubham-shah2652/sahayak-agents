import { View, Text } from 'react-native';

export default function ScheduleCard({ day }) {
  return (
    <View className="mb-4 p-4 bg-gray-100 rounded-lg">
      <Text className="font-bold text-lg mb-2">{day.date}</Text>
      {day.events.map((event, idx) => (
        <View key={idx} className="mb-2">
          <Text className="text-base font-semibold">{event.title}</Text>
          <Text className="text-xs text-gray-500">{event.time}</Text>
          <View className="flex-row mt-1">
            {event.tags.map((tag, i) => (
              <Text key={i} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs mr-2">{tag}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}