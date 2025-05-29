import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { generateChatResponse } from '../utils/openaiConfig';

const Aiadvisor = () => {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState([
    {
      sender: 'AI',
      text: 'Hello! I am your AI nutrition advisor. How can I help you today? You can ask me about nutrition, healthy eating habits, or any health-related questions.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const fetchAIResponse = async () => {
    if (!prompt.trim()) {
      Alert.alert('Empty Message', 'Please enter a message before sending.');
      return;
    }

    const userMessage = { sender: 'You', text: prompt };
    setConversation((prev) => [...prev, userMessage]);
    setLoading(true);
    setPrompt('');

    try {
      const response = await generateChatResponse(prompt);
      const botMessage = { sender: 'AI', text: response };
      setConversation((prev) => [...prev, botMessage]);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to get response. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
      console.error('AI Response Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyboardDismiss = () => {
    try {
      Keyboard.dismiss();
    } catch (error) {
      console.error('Keyboard dismiss error:', error);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [conversation]);

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
      <View style={styles.container}>
        {/* Top Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask something..."
            value={prompt}
            onChangeText={setPrompt}
            onSubmitEditing={fetchAIResponse}
            multiline={false}
            returnKeyType="send"
          />
          <TouchableOpacity 
            style={[styles.button, !prompt.trim() && styles.buttonDisabled]} 
            onPress={fetchAIResponse}
            disabled={!prompt.trim()}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Chat History */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContentContainer}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          {conversation.map((msg, index) => (
            <View key={index} style={msg.sender === 'You' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageSender}>{msg.sender}</Text>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {loading && (
            <View style={styles.typingIndicator}>
              <ActivityIndicator size="small" color="#29AB87" />
              <Text style={styles.typingText}>AI is typing...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    backgroundColor: '#FFF',
    maxHeight: 100,
  },
  button: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: '75%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
    maxWidth: '75%',
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#333',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  typingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
});

export default Aiadvisor;
