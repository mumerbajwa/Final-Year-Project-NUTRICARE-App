import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';

const VideoConsultation = ({ visible, onClose, userRole, userName }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const startCall = () => {
    setIsCallActive(true);
    // Here we'll integrate with WebRTC or Twilio
  };

  const endCall = () => {
    Alert.alert(
      'End Call',
      'Are you sure you want to end the call?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'End',
          onPress: () => {
            setIsCallActive(false);
            onClose();
          },
        },
      ]
    );
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([
        ...chatHistory,
        { sender: userName, message: chatMessage, timestamp: new Date() },
      ]);
      setChatMessage('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {!isCallActive ? (
          // Pre-call screen
          <View style={styles.preCallContainer}>
            <Text style={styles.title}>Video Consultation</Text>
            <Text style={styles.subtitle}>
              {userRole === 'patient'
                ? 'Connect with a healthcare professional'
                : 'Connect with your patient'}
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={startCall}>
              <Text style={styles.buttonText}>Start Consultation</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Active call screen
          <View style={styles.callContainer}>
            {/* Video View */}
            <View style={styles.videoContainer}>
              <WebView
                source={{ uri: 'about:blank' }}
                style={styles.videoView}
              />
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={[styles.controlButton, isMuted && styles.controlButtonActive]}
                onPress={toggleMute}
              >
                <Text style={styles.controlButtonText}>
                  {isMuted ? 'Unmute' : 'Mute'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, isCameraOff && styles.controlButtonActive]}
                onPress={toggleCamera}
              >
                <Text style={styles.controlButtonText}>
                  {isCameraOff ? 'Camera On' : 'Camera Off'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.endCallButton]}
                onPress={endCall}
              >
                <Text style={styles.controlButtonText}>End Call</Text>
              </TouchableOpacity>
            </View>

            {/* Chat Section */}
            <View style={styles.chatContainer}>
              <ScrollView style={styles.chatHistory}>
                {chatHistory.map((msg, index) => (
                  <View key={index} style={styles.chatMessage}>
                    <Text style={styles.chatSender}>{msg.sender}</Text>
                    <Text style={styles.chatText}>{msg.message}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.chatInputContainer}>
                <TextInput
                  style={styles.chatInput}
                  value={chatMessage}
                  onChangeText={setChatMessage}
                  placeholder="Type a message..."
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendChatMessage}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preCallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  callContainer: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoView: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  controlButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  controlButtonActive: {
    backgroundColor: '#29AB87',
  },
  controlButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  endCallButton: {
    backgroundColor: '#FF3B30',
  },
  chatContainer: {
    height: 200,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  chatHistory: {
    flex: 1,
    padding: 10,
  },
  chatMessage: {
    marginBottom: 10,
  },
  chatSender: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  chatText: {
    fontSize: 14,
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#29AB87',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VideoConsultation; 