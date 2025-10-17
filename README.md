# Ani AI 🤖💬

An AI-powered virtual companion chatbot built with React Native, featuring natural conversation powered by Google's Gemini AI and realistic voice synthesis using ElevenLabs.

## ✨ Features

- **Natural Conversations**: Powered by Google's Gemini 2.5 Flash model for intelligent, contextual responses
- **Voice Synthesis**: Realistic text-to-speech using ElevenLabs API
- **Chat Interface**: Clean, intuitive messaging interface with typing animations
- **Cross-Platform**: Works on both iOS and Android devices
- **Conversation History**: Maintains context throughout the chat session
- **Customizable Personality**: AI character with a unique personality and interaction style

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18
- **npm** or **yarn**
- **React Native development environment** ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- **For iOS**: Xcode and CocoaPods
- **For Android**: Android Studio and Android SDK

### API Keys Required

You'll need to obtain API keys from:

1. **Google Gemini API**: Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **ElevenLabs API**: Sign up and get your API key from [ElevenLabs](https://elevenlabs.io/)
3. **ElevenLabs Voice ID**: Create or select a voice and copy its ID from your ElevenLabs dashboard

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/niksbanna/ani-ai.git
   cd ani-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **For iOS, install CocoaPods dependencies**:
   ```bash
   bundle install
   cd ios
   bundle exec pod install
   cd ..
   ```

### Configuration

1. **Create a `.env` file** in the root directory:
   ```bash
   touch .env
   ```

2. **Add your API keys** to the `.env` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ELEVENLABS_VOICE_ID=your_elevenlabs_voice_id_here
   ```

   > **Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Running the App

1. **Start the Metro bundler**:
   ```bash
   npm start
   ```

2. **Run on Android**:
   ```bash
   npm run android
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

### Building for Production

**Android Release Build**:
```bash
npm run release
```

This will create an APK file in `android/app/build/outputs/apk/release/`.

## 🛠️ Technology Stack

- **Framework**: React Native 0.80.1
- **Language**: TypeScript
- **AI Model**: Google Gemini 2.5 Flash
- **Voice Synthesis**: ElevenLabs API
- **UI Components**: React Native core components
- **File System**: react-native-fs
- **Audio Playback**: react-native-sound
- **Animations**: react-native-typing-animation

## 📁 Project Structure

```
ani-ai/
├── src/
│   ├── services/
│   │   ├── GeminiService.ts      # Gemini AI integration
│   │   └── ElevenLabsService.ts  # Voice synthesis integration
│   ├── components/
│   │   └── Avatar.tsx            # 3D avatar component
│   └── assets/                   # Images and other assets
├── android/                      # Android native code
├── ios/                         # iOS native code
├── __tests__/                   # Test files
├── App.tsx                      # Main app component
└── package.json                 # Dependencies and scripts
```

## 🧪 Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - Mobile framework
- [Google Gemini](https://ai.google.dev/) - AI conversation model
- [ElevenLabs](https://elevenlabs.io/) - Voice synthesis
- [React Native Community](https://github.com/react-native-community) - Tools and libraries

## 📞 Support

If you encounter any issues or have questions:

- Open an [Issue](https://github.com/niksbanna/ani-ai/issues)
- Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)

## ⚠️ Disclaimer

This application requires API keys from third-party services (Google Gemini and ElevenLabs). Please ensure you comply with their respective terms of service and usage policies. API usage may incur costs based on your usage volume.

---

Made with ❤️ using React Native
