import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimerProvider from '../TimerProject/src/context/TimerProvider';
import HomeScreen from './src/screens/HomeScreen';
import AddTimerScreen from './src/screens/AddTimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTimer" component={AddTimerScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
