# AI Sahaaya - Educational Assistant App

A comprehensive React Native/Expo application designed to assist educators and students with lesson management, attendance tracking, analytics, and multilingual support.

## 🚀 Features

- **Multi-language Support**: English, Hindi, and Gujarati
- **Lesson Management**: Create and manage educational lessons
- **Attendance Tracking**: Monitor student attendance with detailed analytics
- **Calendar Integration**: Schedule management and class planning
- **Real-time Chat**: Communication between educators and students
- **Analytics Dashboard**: Comprehensive data visualization and insights
- **Camera Integration**: Photo capture for quiz grading and documentation
- **Firebase Integration**: Real-time data synchronization and storage
- **Modern UI**: Built with NativeWind (Tailwind CSS for React Native)

## 📱 Screenshots

*Screenshots will be added here*

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.5
- **Development Platform**: Expo SDK 53
- **Navigation**: Expo Router v5
- **Styling**: NativeWind (Tailwind CSS)
- **Backend**: Firebase (Firestore & Storage)
- **Internationalization**: i18next & react-i18next
- **Charts**: react-native-chart-kit
- **Markdown**: react-native-markdown-display
- **Animations**: react-native-reanimated

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Git**

### For iOS Development (macOS only):
- **Xcode** (latest version)
- **iOS Simulator** or physical iOS device

### For Android Development:
- **Android Studio**
- **Android SDK**
- **Android Emulator** or physical Android device

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sahaayak_ui
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Configuration

The app is pre-configured with Firebase. The configuration is located in `init-firebase.js`. If you need to use your own Firebase project:

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Storage
3. Replace the Firebase configuration in `init-firebase.js` with your own:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 4. Environment Setup

Create a `.env` file in the root directory if needed for additional environment variables:

```bash
# .env
EXPO_PUBLIC_API_URL=your_api_url
```

### 5. Start the Development Server

```bash
# Start Expo development server
npm start
# or
expo start

# Run on specific platforms
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

### 6. Running on Devices

#### iOS Simulator:
```bash
npm run ios
```

#### Android Emulator:
```bash
npm run android
```

#### Physical Device:
1. Install the **Expo Go** app from App Store/Google Play
2. Scan the QR code displayed in the terminal or browser

## 📁 Project Structure

```
sahaayak_ui/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── home.js        # Home dashboard
│   │   ├── calendar.js    # Calendar view
│   │   ├── notifications.js # Notifications
│   │   └── settings.js    # Settings & preferences
│   ├── analytics.js       # Analytics dashboard
│   ├── attendance-results.js # Attendance tracking
│   ├── chat.js           # Chat functionality
│   ├── create-lesson.js  # Lesson creation
│   ├── form.js           # Form components
│   ├── onboarding.js     # Onboarding flow
│   ├── schedules.js      # Schedule management
│   └── welcome.js        # Welcome screen
├── components/            # Reusable components
│   ├── Camera.js         # Camera functionality
│   ├── LanguageSelector.js # Language selection
│   ├── ProfileHeader.js  # Profile header component
│   ├── QuizModal.js      # Quiz modal component
│   ├── ScheduleCard.js   # Schedule card component
│   ├── StudentUpdateCard.js # Student update card
│   └── TopicsList.js     # Topics list component
├── constants/            # App constants and configurations
│   ├── colors.js         # Color definitions
│   ├── data.js           # Static data
│   ├── i18n.js           # Internationalization setup
│   └── translations/     # Language files
│       ├── en.js         # English translations
│       ├── hi.js         # Hindi translations
│       └── gu.js         # Gujarati translations
├── assets/               # Static assets
│   ├── icon.png          # App icon
│   ├── splash-icon.png   # Splash screen
│   └── adaptive-icon.png # Android adaptive icon
├── init-firebase.js      # Firebase configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🌐 Internationalization

The app supports multiple languages:
- **English** (en)
- **Hindi** (hi)
- **Gujarati** (gu)

Language switching is handled through the `LanguageSelector` component and managed by i18next.

## 📊 Key Features Explained

### 1. Lesson Management
- Create new lessons with detailed information
- Schedule lessons with calendar integration
- Track lesson progress and completion

### 2. Attendance Tracking
- Mark student attendance
- Generate attendance reports
- View attendance analytics

### 3. Analytics Dashboard
- Visual charts and graphs
- Performance metrics
- Data insights and trends

### 4. Chat System
- Real-time messaging
- File sharing capabilities
- Group chat support

### 5. Camera Integration
- Photo capture for documentation
- Quiz grading assistance
- Image processing capabilities

## 🔧 Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web

# Build for production
expo build:android
expo build:ios

# Eject from Expo (if needed)
expo eject
```

## 📱 Platform Support

- ✅ **iOS** (iPhone & iPad)
- ✅ **Android** (Phone & Tablet)
- ✅ **Web** (Progressive Web App)

## 🔐 Permissions

The app requires the following permissions:

### iOS:
- Camera access for photo capture
- Photo library access for image selection

### Android:
- Camera permission
- Read/Write external storage

## 🚨 Troubleshooting

### Common Issues:

1. **Metro bundler issues**:
   ```bash
   npx expo start --clear
   ```

2. **Dependencies conflicts**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Firebase connection issues**:
   - Verify Firebase configuration in `init-firebase.js`
   - Check internet connectivity
   - Ensure Firebase project is properly set up

4. **Camera permissions**:
   - Ensure permissions are granted in device settings
   - Check `app.json` for proper permission configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Multi-language support
  - Lesson management
  - Attendance tracking
  - Analytics dashboard
  - Chat functionality

---

**Note**: This is an educational application designed to assist teachers and students in their learning journey. Please ensure compliance with your institution's policies and data protection regulations.