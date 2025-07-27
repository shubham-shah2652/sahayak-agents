import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import QuizModal from './QuizModal';

// Mock quiz data generator based on topic objectives
const generateQuiz = (topic) => {
  // Example quiz for "Thousands Around Us" topic
  if (topic.topic === "Thousands Around Us") {
    return {
      title: `${topic.topic} - Day ${topic.day_number} Review`,
      questions: [
        "Can someone explain what numbers beyond 1000 look like in real life?",
        "How do we write large numbers in expanded form?",
        "What are some everyday situations where we see numbers larger than 1000?",
        "How do we compare two four-digit numbers?"
      ],
      discussionPoints: [
        "Let's discuss different ways we can represent large numbers",
        "Think about where we see large numbers in our daily life",
        "How does understanding place value help us work with large numbers?",
        "What patterns do we notice when counting by thousands?"
      ],
      activity: "Let's create a number line on the board and place some four-digit numbers on it. We'll discuss their relative positions and practice comparing them."
    };
  }
  
  // Generate default review content based on objectives
  return {
    title: `${topic.topic} - Day ${topic.day_number} Review`,
    questions: topic.objectives.map(objective => 
      `Can someone explain how to ${objective.toLowerCase()}?`
    ),
    discussionPoints: topic.objectives.map(objective =>
      `Let's discuss different approaches to ${objective.toLowerCase()}`
    ),
    activity: "Let's work through some examples together on the board and discuss the concepts we learned today."
  };
};

export default function TopicsList({ topics }) {
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [quizVisible, setQuizVisible] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const toggleTopic = (topicId) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const areAllObjectivesCompleted = (topic) => {
    return topic.objectives.every((_, index) => 
      completedTopics.has(`${topic.topic_id}-${index}`)
    );
  };

  const handleStartQuiz = (topic) => {
    const quiz = generateQuiz(topic);
    setCurrentQuiz(quiz);
    setTimeout(() => {
      setQuizVisible(true);
    }, 100);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {topics.map((topic) => (
        <View 
          key={topic.topic_id}
          style={{
            backgroundColor: 'white',
            marginBottom: 12,
            borderRadius: 12,
            overflow: 'hidden',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <View style={{
            backgroundColor: COLORS.primary,
            padding: 12,
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              {topic.topic} - Day {topic.day_number}
            </Text>
            <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>
              {topic.date}
            </Text>
          </View>
          
          <View style={{ padding: 12 }}>
            {topic.objectives.map((objective, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleTopic(`${topic.topic_id}-${index}`)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderBottomWidth: index < topic.objectives.length - 1 ? 1 : 0,
                  borderBottomColor: '#f0f0f0',
                }}
              >
                <MaterialIcons
                  name={completedTopics.has(`${topic.topic_id}-${index}`) ? "check-circle" : "radio-button-unchecked"}
                  size={24}
                  color={completedTopics.has(`${topic.topic_id}-${index}`) ? COLORS.primary : '#666'}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    fontSize: 14,
                    color: '#333',
                    textDecorationLine: completedTopics.has(`${topic.topic_id}-${index}`) ? 'line-through' : 'none',
                  }}
                >
                  {objective}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Review Button - only shown when all objectives are completed */}
            {areAllObjectivesCompleted(topic) && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 12,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                }}
                onPress={() => handleStartQuiz(topic)}
              >
                <MaterialIcons name="rate-review" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={{ color: COLORS.primary, fontWeight: '500' }}>Start Review</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      {/* Quiz Modal */}
      <QuizModal
        visible={quizVisible}
        onClose={() => setQuizVisible(false)}
        quiz={currentQuiz}
      />
    </ScrollView>
  );
} 