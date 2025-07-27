import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function QuizModal({ visible, onClose, quiz }) {
  if (!quiz) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          width: '90%',
          maxHeight: '80%',
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{quiz.title}</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* Questions Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Questions to Ask:</Text>
              {quiz.questions.map((question, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={{ fontSize: 15, marginBottom: 5 }}>
                    {index + 1}. {question}
                  </Text>
                </View>
              ))}
            </View>

            {/* Discussion Points Section */}
            {quiz.discussionPoints && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Discussion Points:</Text>
                {quiz.discussionPoints.map((point, index) => (
                  <View key={index} style={{ marginBottom: 10, flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, marginRight: 8 }}>•</Text>
                    <Text style={{ fontSize: 15, flex: 1 }}>{point}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Activity Section */}
            {quiz.activity && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Suggested Activity:</Text>
                <Text style={{ fontSize: 15 }}>{quiz.activity}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
} 