# Timer App

## Overview

The Timer App is a React Native application that allows users to manage multiple customizable timers. The app supports features like:

• Customized timers

• Start, pause, and reset actions

• Timer completion notifications with modals

• History tracking of completed timers

## Features

1. Timer Management

• Add, edit, and delete timers.

• Categorize timers for better organization.

• Display active timers in a structured list.

2. Timer Controls

• Start, pause, and reset individual timers.

• Progress bar visualization for remaining time.

• Timers automatically transition to "Completed" state upon reaching zero.

3. Timer History

• Stores a log of completed timers.

• Displays completion time and timer name.

• Accessible via a dedicated "History" screen.

# Installation

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

### Using npm
npm react-native start

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

npm install

npx react-native run-android

If everything is set up correctly, you should see your new app running in the Android Emulator, or your connected device.

## Congratulations! :tada:

You've successfully run your React Native App


# Assumptions Made During Development

Timers are stored in context - The app uses React Context for state management rather than Redux.

Timer countdown continues even when screen changes - Uses useEffect with state updates.

Each timer has a unique ID - Required for handling actions correctly.

Timers are categorized - Users can organize timers into different groups.

History logs only completed timers - Timers only appear in history once they reach zero.

Timers are stored in-memory - No persistent database storage is implemented (AsyncStorage or SQLite can be added).

