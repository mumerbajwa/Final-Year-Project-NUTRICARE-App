import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Camera } from 'expo-camera';
import { DAILY_API_KEY } from '../utils/dailyConfig';

const VideoCall = ({ route, navigation }) => {
  const [roomUrl, setRoomUrl] = useState(null);
  const { username, isInitiator, roomId, isNutritionist, nutritionistName } = route.params || {};
  const [callStatus, setCallStatus] = useState('connecting');

  useEffect(() => {
    (async () => {
      // Request permissions first
      const { status } = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      
      if (status !== 'granted' || audioStatus.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera and microphone access is required for video calls.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        return;
      }

      // If we're the initiator, create the room
      if (isInitiator) {
        createRoom();
      } else {
        // If we're joining, just set the room URL
        setRoomUrl(`https://nutricare.daily.co/${roomId}`);
      }
    })();
  }, [isInitiator, roomId]);

  const createRoom = useCallback(async () => {
    try {
      const response = await fetch('https://api.daily.co/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DAILY_API_KEY}`,
        },
        body: JSON.stringify({
          name: roomId,
          properties: {
            enable_screenshare: true,
            enable_chat: true,
            start_video_off: false,
            start_audio_off: false,
            exp: Math.round(Date.now() / 1000) + 3600, // Room expires in 1 hour
          },
        }),
      });

      const room = await response.json();
      setRoomUrl(room.url);
      setCallStatus('connected');
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('Error', 'Failed to create video call room');
      navigation.goBack();
    }
  }, [roomId, navigation]);

  const handleEndCall = () => {
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
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  // Custom JavaScript to inject into WebView to handle permissions and customize UI
  const injectedJavaScript = `
    // Add custom styles to ensure video elements are properly sized
    const style = document.createElement('style');
    style.textContent = \`
      .daily-video-element {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
      .self-view {
        position: absolute !important;
        top: 20px !important;
        right: 20px !important;
        width: 120px !important;
        height: 160px !important;
        border-radius: 10px !important;
        overflow: hidden !important;
        z-index: 2 !important;
      }
    \`;
    document.head.appendChild(style);

    // Customize Daily.co UI
    window.addEventListener('message', (e) => {
      if (e.data === 'ready') {
        callFrame.setUserName("${username}");
      }
    });
    true;
  `;

  if (!roomUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.statusText}>
          {isNutritionist ? 'Starting consultation room...' : `Connecting to ${nutritionistName}...`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: roomUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onError={() => {
          Alert.alert('Error', 'Failed to load video call');
          navigation.goBack();
        }}
        injectedJavaScript={injectedJavaScript}
      />
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <Text style={styles.endCallText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  endCallButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    zIndex: 2,
  },
  endCallText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoCall; 