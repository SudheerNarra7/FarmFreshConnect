# FarmFreshConnect

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Expo version](https://img.shields.io/badge/expo-~52.0.33-blue)
![React Native version](https://img.shields.io/badge/react--native-0.76.6-blue)
![TypeScript](https://img.shields.io/badge/typescript-^5.3.3-blue)

FarmFreshConnect is a mobile application designed to bridge the gap between local farmers and consumers, allowing users to discover nearby farms, browse fresh products, and engage with their local agricultural community.

## ✨ Features

* **Discover Local Farmers:** Browse a directory of local farms with detailed profiles.
* **View Products:** See products offered by farmers, including descriptions and pricing.
* **Farmer Profiles:** Learn more about each farm's practices and history.
* **Reviews & Ratings:** Read and submit reviews for farmers.
* **Search Functionality:** (Inferred from `data/farms.ts`) Ability to search for farmers based on products.
* **Cross-Platform:** Built with Expo for compatibility with iOS, Android, and Web.

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/)
* **Platform:** [Expo SDK 52](https://expo.dev/)
* **Routing:** [Expo Router v4](https://docs.expo.dev/router/introduction/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** (Potentially [NativeWind](https://www.nativewind.dev/) - based on `app.json` and `tsconfig.json`) + Core React Native Styles + `expo-linear-gradient`, `expo-blur`
* **State Management:** (Likely component state or Context API - no specific library listed)
* **UI Libraries:** `@expo/vector-icons`, `lucide-react-native`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`
* **Fonts:** `@expo-google-fonts/poppins`, `expo-font`
* **Device Features:** `expo-camera`, `expo-haptics`, `expo-linking`
* **Utilities:** `expo-constants`, `expo-splash-screen`, `expo-status-bar`, `expo-system-ui`, `expo-web-browser`

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Expo CLI](https://docs.expo.dev/get-started/installation/):
    ```bash
    npm install -g expo-cli
    ```
* (Optional) [Watchman](https://facebook.github.io/watchman/) (Recommended for macOS and Linux users for better performance)
* (Optional) [Xcode](https://developer.apple.com/xcode/) (for iOS development) or [Android Studio](https://developer.android.com/studio) (for Android development)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SudheerNarra7/FarmFreshConnect.git](https://github.com/SudheerNarra7/FarmFreshConnect.git)
    ```
    *(Note: Replace with the actual repository URL if different)*

2.  **Navigate to the project directory:**
    ```bash
    cd FarmFreshConnect
    ```

3.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## 🏃 Running the App

1.  **Start the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This command starts the Metro bundler.

2.  **Open the app:**
    * **iOS Simulator:** Press `i` in the terminal where the server is running.
    * **Android Emulator:** Press `a` in the terminal. (Ensure an emulator is running or a device is connected).
    * **Expo Go App:** Scan the QR code shown in the terminal using the Expo Go app (available on the App Store and Google Play Store).
    * **Web Browser:** Press `w` in the terminal.

## 🧹 Linting

To check the code for linting errors, run:

Using npm:
```bash
npm run lint
