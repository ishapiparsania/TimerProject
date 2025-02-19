import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};

export const loadTimers = async () => {
  try {
    const data = await AsyncStorage.getItem('timers');
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading timers:', error);
    return {};
  }
};
