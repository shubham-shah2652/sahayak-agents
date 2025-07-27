import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChatScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const scrollViewRef = useRef();
  
  // State management
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      content: 'Hello! I\'m Sahaayak, your AI assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMarkdown: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useRAG, setUseRAG] = useState(true); // State for the RAG toggle

  const markdownStyles = {
    body: {
      color: COLORS.text,
      fontSize: 16,
    },
    heading1: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    heading2: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.primary,
    },
    code_block: {
      backgroundColor: COLORS.card,
      padding: 10,
      borderRadius: 8,
    },
    code_inline: {
      backgroundColor: COLORS.card,
      padding: 4,
      borderRadius: 4,
    },
    link: {
      color: COLORS.primary,
    },
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
  };

  // Function to get language mapping
  const getLanguageMapping = () => {
    const currentLang = i18n.language;
    const languageMap = {
      'en': 'English',
      'hi': 'Hindi', 
      'gu': 'Gujarati'
    };
    return languageMap[currentLang] || 'English';
  };

  // Function to send message to API with better error handling
  const sendMessageToAPI = async (userQuery) => {
    try {
      console.log('Sending request to API...');
      console.log('Request payload:', {
        user_query: userQuery,
        language: getLanguageMapping()
      });

      const response = await fetch('https://answer-from-textbook-cf-522049177242.us-east4.run.app', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Sahaayak-App/1.0',
          'mode': "no-cors",
        },
        body: JSON.stringify({
          user_query: userQuery,
          language: getLanguageMapping()
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!data.content) {
        throw new Error('API response missing content field');
      }

      return data.content;
    } catch (error) {
      console.error('Detailed error sending message:', error);
      
      if (error.message.includes('Network request failed')) {
        throw new Error('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please try again.');
      } else if (error.message.includes('CORS')) {
        throw new Error('API access issue. Please contact support.');
      } else {
        throw new Error(`API Error: ${error.message}`);
      }
    }
  };

  // Function to handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'sent',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMarkdown: false
    };

    // Add user message to chat and store the text before clearing the input
    const messageToSend = inputText;
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    if (useRAG) {
      // RAG is ON: Call the API
      try {
        const apiResponse = await sendMessageToAPI(messageToSend);
        
        const aiMessage = {
          id: Date.now() + 1,
          type: 'received',
          content: apiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMarkdown: true
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error in handleSendMessage:', error);
        
        const errorMessage = {
          id: Date.now() + 1,
          type: 'received',
          content: `Sorry, I encountered an error: ${error.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMarkdown: false
        };
        setMessages(prev => [...prev, errorMessage]);
        
        Alert.alert(
          'Connection Error', 
          `Failed to connect to Sahaayak AI. ${error.message}\n\nPlease check your internet connection and try again.`,
          [
            { text: 'OK', style: 'default' },
            { text: 'Retry', onPress: () => handleSendMessage() }
          ]
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // RAG is OFF: Use a fixed response for all questions
      const aiResponseContent =  "The water cycle, also known as the hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth. The main stages are:\n\n1.  **Evaporation:** Water turns from a liquid to a gas (water vapor).\n2.  **Condensation:** Water vapor in the air gets cold and changes back into liquid, forming clouds.\n3.  **Precipitation:** So much water has condensed that the air cannot hold it anymore. The clouds get heavy and water falls back to the earth in the form of rain, hail, sleet or snow.\n4.  **Collection:** Water that falls from the clouds collects in oceans, rivers, lakes, and streams. Some of it soaks into the ground and becomes groundwater."      ;

      const aiMessage = {
        id: Date.now() + 1,
        type: 'received',
        content: aiResponseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMarkdown: false // It's a simple text, no markdown needed
      };
      
      // Simulate a small delay for a better user experience
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 500);
    }
  };


  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const renderMessage = (message) => {
    const isSent = message.type === 'sent';
    
    return (
      <View key={message.id} style={{ 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        justifyContent: isSent ? 'flex-end' : 'flex-start',
        marginBottom: 10 
      }}>
        {!isSent && (
          <MaterialIcons name="chat-bubble" size={18} color={COLORS.text} style={{ marginRight: 6 }} />
        )}
        <View style={{ 
          backgroundColor: isSent ? COLORS.primary : COLORS.card, 
          borderRadius: isSent ? 20 : 10, 
          padding: 12, 
          maxWidth: '75%' 
        }}>
          {message.isMarkdown ? (
            <Markdown style={{
              ...markdownStyles,
              body: {
                ...markdownStyles.body,
                color: isSent ? 'white' : COLORS.text,
              },
              heading1: {
                ...markdownStyles.heading1,
                color: isSent ? 'white' : COLORS.primary,
              },
              heading2: {
                ...markdownStyles.heading2,
                color: isSent ? 'white' : COLORS.primary,
              },
            }}>
              {message.content}
            </Markdown>
          ) : (
            <Text style={{ 
              color: isSent ? 'white' : COLORS.text,
              fontSize: 16
            }}>
              {message.content}
            </Text>
          )}
          <Text style={{ 
            color: isSent ? 'white' : COLORS.gray, 
            fontSize: 12, 
            textAlign: 'right', 
            marginTop: 4 
          }}>
            {message.timestamp}
          </Text>
        </View>
        {isSent && (
          <MaterialIcons name="chat-bubble" size={18} color={COLORS.text} style={{ marginLeft: 6 }} />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color={'white'} />
        </TouchableOpacity>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 22,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 10
        }}>
          <MaterialIcons name="chat" size={25} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Ask Sahaayak</Text>
          <Text style={{ color: COLORS.accent, fontSize: 13 }}>
            {isLoading ? 'Typing...' : 'Available'}
          </Text>
        </View>
        
        {/* Custom RAG Toggle Button */}
        <TouchableOpacity 
          onPress={() => setUseRAG(prev => !prev)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: useRAG ? COLORS.accent : 'rgba(255, 255, 255, 0.2)',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 15,
          }}
        >
          <Text style={{color: 'white', fontWeight: 'bold', marginRight: 5, fontSize: 12}}>RAG</Text>
          <Ionicons name={useRAG ? "flash" : "flash-off"} size={16} color="white" />
        </TouchableOpacity>

      </View>

      {/* Chat messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={{ flex: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
        
        {/* Loading indicator */}
        {isLoading && (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'flex-end', 
            marginBottom: 10 
          }}>
            <MaterialIcons name="chat-bubble" size={18} color={COLORS.text} style={{ marginRight: 6 }} />
            <View style={{ 
              backgroundColor: COLORS.card, 
              borderRadius: 10, 
              padding: 12, 
              maxWidth: '75%' 
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={COLORS.primary} style={{ marginRight: 8 }} />
                <Text style={{ color: COLORS.gray, fontSize: 14 }}>Sahaayak is thinking...</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 25,
        margin: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
      }}>
        <MaterialIcons name="more-horiz" size={24} color={COLORS.primary} style={{ marginRight: 8 }} />
        <TextInput
          style={{ flex: 1, fontSize: 16, color: COLORS.primary, maxHeight: 100 }}
          placeholder="Type your message..."
          placeholderTextColor={COLORS.primary + '99'}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity 
          onPress={handleSendMessage}
          disabled={isLoading || !inputText.trim()}
          style={{ opacity: (isLoading || !inputText.trim()) ? 0.5 : 1 }}
        >
          <MaterialIcons name="send" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
