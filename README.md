# iZen

iZen is your personal retrospective board to help you continuously improve your hobbies and skills. Users can create a progression board for areas they want to grow and set up retros for self-evaluating their recent progress (or lack of progress). They can add notes stating what did or did not go well and set up completable action items to improve their development.

# Technologies Used

iZen's client side was developed in Javascript using [React Native](https://reactnative.dev/) and [Expo](https://expo.io/).

# Instructions for Installing iZen

## Prerequisites

### Expo

[Expo](https://docs.expo.io/versions/latest/) (a framework for React Native) is required to run the client side of iZen. Since iZen was built as a mobile app, it won't run smoothly in a web interface. It can currently be tested on your phone by scanning a QR code via the Expo app, or by an emulator/simulator on your computer. If using a phone, it must be on the same network as the computer running iZen.

Install [Expo](https://expo.io/learn) by

1. downloading [Node.js](https://nodejs.org/en/)
1. install expo by running `npm install expo-cli --global`
1. Set up expo on a device OR follow the instructions for setting up either an Android emulator or an iOS simulator on your computer

#### Install the Expo app on a device

- [iOS Apple Store](https://itunes.apple.com/app/apple-store/id982107779)
- [Android Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)

#### Set up Android Emulator or iOS Simulator

- [Android Studio Emulator](https://docs.expo.io/versions/latest/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.io/versions/v36.0.0/workflow/ios-simulator/)

## Install iZen

Follow these instructions to get iZen running.

1. Clone the repository:

```sh
git clone git@github.com:klb417/i-Zen-client.git
```

2. Install the dependencies:

```sh
npm install
```

3. Start the app.

```sh
npm run start-for-devices
```

4. Run the app one of the following ways.

   - Scan the QR code with the Expo app (Android).
   - Scan the QR code with the Camera app (iOS).
   - Press a for Android emulator.
   - Press i for iOS simulator.
