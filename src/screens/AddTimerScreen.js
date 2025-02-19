import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TimerContext from '../context/TimerContext';

export default function AddTimerScreen({ navigation }) {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');

  const addTimer = () => {
    const parsedDuration = parseInt(duration, 10);

    if (!name || isNaN(parsedDuration) || parsedDuration <= 0) {
      alert('Please enter a valid timer name and duration.');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parsedDuration,
      remainingTime: parsedDuration,
      status: 'Paused',
    };

    dispatch({
      type: 'ADD_TIMER',
      payload: { category, timer: newTimer },
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Timer Name:</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="Enter timer name"
          placeholderTextColor="#bbb"
        />
        
        <Text style={styles.label}>Duration (seconds):</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="Enter duration"
          placeholderTextColor="#bbb"
        />
        
        <Text style={styles.label}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Workout" value="Workout" />
            <Picker.Item label="Study" value="Study" />
            <Picker.Item label="Break" value="Break" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={addTimer}>
          <Text style={styles.addButtonText}>Add Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  card: { 
    backgroundColor: '#1E1E1E', 
    padding: 20, 
    borderRadius: 10, 
    width: '100%', 
    maxWidth: 400, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 5 
  },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 5 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#444', 
    padding: 12, 
    borderRadius: 8, 
    color: '#fff', 
    backgroundColor: '#2A2A2A', 
    marginBottom: 15 
  },
  pickerContainer: { 
    borderWidth: 1, 
    borderColor: '#444', 
    borderRadius: 8, 
    backgroundColor: '#2A2A2A', 
    marginBottom: 15 
  },
  picker: { 
    color: '#fff', 
    height: 50 
  },
  addButton: { 
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  addButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});
