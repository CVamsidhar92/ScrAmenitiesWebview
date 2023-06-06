1.Install React Native Package: -> npm install -g react-native-cli

Create Project: -> npx react-native init ProjectName

Run the App: -> cd ProjectName -> npm run android or npm run ios

To Clear the Cache -> cd android && gradlew clean
To Reset Cache -> npm start -- --reset-cache

To Generate Key
keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

react-native run-android --mode=release

To Generate APK file -> cd android -> ./gradlew assembleRelease APK Path: android/app/build/outputs/apk/relaese/app-release.apk

installations: npm i react-native-web
npm i react-native-screens
npm i react-native-animatable
npm install @react-navigation/native npm install react-native-screens react-native-safe-area-context npm installnpm i @react-native-community/netinfo npm i react-native-toast-message yarn add react-native-toast-notifications

error: requireNativeComponent: "RNSScreenStackHeaderConfig" was not found in the UIManager when running android app

Solution: need to make changes in MainActivity.java which is located in android/app/src/main/java//MainActivity.java

Add this line in MainActivity.java file in the bottom of "getMainComponentName" function

@Override protected void onCreate(Bundle savedInstanceState) { super.onCreate(null); }

also Import import android.os.Bundle;

error: Execution failed for task ':app:installDebug'.

Solution: check if you already have an app with the same name is installed in android Delete old apps and run -> npm run-android