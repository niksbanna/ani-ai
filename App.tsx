import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ProfileImage from './src/assets/profile.png';

// --- SERVICE IMPORTS ---
import { getAniResponse } from './src/services/GeminiService';
import { getAniVoice } from './src/services/ElevenLabsService';

// --- .ENV IMPORTS ---
import { GEMINI_API_KEY, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID } from '@env';

// --- AUDIO LIBRARY IMPORT ---
import Sound from 'react-native-sound';
import { TypingAnimation } from 'react-native-typing-animation';

// --- 3D AVATAR COMPONENT IMPORT ---
// import Avatar from './src/components/Avatar';


// --- TypeScript Type Definition for a Message ---
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ani';
  timestamp: string;
};

// --- Message Data Structure ---
const createMessage = (text: string, sender: 'user' | 'ani'): Message => ({
  id: Math.random().toString(36).substring(7),
  text,
  sender,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
});

// --- Chat Bubble Component ---
const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  return (
    <View
      style={[
        styles.bubbleContainer,
        isUser ? styles.userBubbleContainer : styles.aniBubbleContainer,
      ]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aniBubble]}>
        <Text style={isUser ? styles.userText : styles.aniText}>{message.text}</Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
    </View>
  );
};

// --- Main App Component ---
const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);

  useEffect(() => {
    Sound.setCategory('Playback');
    return () => {
      currentSound?.release();
    };
  }, [currentSound]);

  useEffect(() => {
    setMessages([
      createMessage("Hey... you there?", 'ani'),
    ]);
  }, []);

  // --- FIX: Renamed this function to be more specific ---
  const processAndFetchResponse = useCallback(async (text: string) => {
    if (isLoading || text.trim().length === 0) {
      return;
    }
    if (!GEMINI_API_KEY || !ELEVENLABS_API_KEY || !ELEVENLABS_VOICE_ID) {
      Alert.alert("API Key Missing", "Please ensure all required API keys are in your .env file.");
      return;
    }

    setIsLoading(true);
    currentSound?.stop(() => currentSound.release());
    
    const userMessage = createMessage(text, 'user');
    
    const updatedMessages = [userMessage, ...messages];
    setMessages(updatedMessages); // Update the UI immediately

    try {
      const responseText = await getAniResponse(updatedMessages, GEMINI_API_KEY);
      const aniResponse = createMessage(responseText, 'ani');
      
      setMessages(prevMessages => [aniResponse, ...prevMessages]);

      if (isTTSEnabled) {
        const audioFilePath = await getAniVoice(responseText, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID);

        const sound = new Sound(audioFilePath, '', (error) => {
          if (error) {
            console.log('Failed to load the sound', error);
            return;
          }
          setCurrentSound(sound);
          sound.play((success) => {
            if (!success) console.log('Playback failed.');
            sound.release();
          });
        });
      }

    } catch (error) {
      console.error("Failed to get response:", error);
      const errorResponse = createMessage("Sorry, I'm having trouble speaking right now.", 'ani');
      setMessages(prevMessages => [errorResponse, ...prevMessages]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, currentSound, isTTSEnabled]);

  // --- FIX: Created a new handler for the send button/submit action ---
  const handleSend = () => {
    if (inputText.trim().length > 0) {
      processAndFetchResponse(inputText);
      setInputText(''); // Clear the input after sending
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.avatarContainer}> */}
        {/* <Avatar /> */}
      {/* </View> */}

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
            <Image 
              source={ProfileImage} 
              style={styles.avatarIcon}
            />
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Ani</Text>
              <View style={styles.onlineStatus}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.onlineText}>online</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.ttsToggle, isTTSEnabled ? styles.ttsEnabled : styles.ttsDisabled]} 
              onPress={() => setIsTTSEnabled(!isTTSEnabled)}
            >
              <Text style={styles.ttsToggleText}>
                {isTTSEnabled ? '🔊' : '🔇'}
              </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.messageListContainer}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <ChatBubble message={item} />}
            keyExtractor={item => item.id}
            style={styles.messageList}
            contentContainerStyle={{ paddingBottom: 10 }}
            inverted
          />
        </View>
        
        {isLoading && (
            <View style={styles.typingIndicatorContainer}>
                <Image 
                  source={ProfileImage} 
                  style={styles.typingAvatar}
                />
                <TypingAnimation 
                  dotColor="#E0E0E0"
                  dotMargin={5}
                  dotAmplitude={4}
                  dotSpeed={0.2}
                  dotRadius={3}
                />
            </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={isLoading}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  avatarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  onlineText: {
      color: '#A0A0A0',
      fontSize: 12,
  },
  ttsToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  ttsEnabled: {
    backgroundColor: '#007AFF',
  },
  ttsDisabled: {
    backgroundColor: '#666',
  },
  ttsToggleText: {
    fontSize: 20,
  },
  messageListContainer: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 10,
  },
  bubbleContainer: {
    marginVertical: 5,
  },
  userBubbleContainer: {
    alignItems: 'flex-end',
  },
  aniBubbleContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 5,
  },
  aniBubble: {
    backgroundColor: '#333',
    borderBottomLeftRadius: 5,
  },
  userText: {
    color: '#FFF',
    fontSize: 16,
  },
  aniText: {
    color: '#FFF',
    fontSize: 16,
  },
  timestamp: {
      fontSize: 10,
      color: '#C0C0C0',
      alignSelf: 'flex-end',
      marginTop: 4,
  },
  typingIndicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingLeft: 20,
  },
  typingAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#FFF',
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default App;
