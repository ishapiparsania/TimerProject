import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TimerItem({ timer, dispatch }) {
  const [remainingTime, setRemainingTime] = useState(timer.remainingTime);
  const [status, setStatus] = useState(timer.status);
  const [intervalId, setIntervalId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'Running' && remainingTime > 0) {
      const id = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(id);
            setStatus('Completed');
            dispatch({ type: 'MARK_COMPLETED', payload: { id: timer.id } });
            saveToHistory(timer.name);
            setShowModal(true);  // 🎉 Show modal on completion
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [status]);

  const startTimer = () => {
    setStatus('Running');
    dispatch({ type: 'START_TIMER', payload: { id: timer.id } });
  };

  const pauseTimer = () => {
    setStatus('Paused');
    clearInterval(intervalId);
    dispatch({ type: 'PAUSE_TIMER', payload: { id: timer.id } });
  };

  const resetTimer = () => {
    setStatus('Paused');
    setRemainingTime(timer.duration);
    dispatch({ type: 'RESET_TIMER', payload: { id: timer.id } });
  };

  const saveToHistory = async (name) => {
    const timestamp = new Date().toLocaleString();
    const newEntry = { name, timestamp };

    try {
      const history = await AsyncStorage.getItem('timerHistory');
      const historyArray = history ? JSON.parse(history) : [];
      historyArray.push(newEntry);
      await AsyncStorage.setItem('timerHistory', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text style={[styles.status, status === 'Running' ? styles.running : status === 'Paused' ? styles.paused : styles.completed]}>
        Status: {status}
      </Text>
      <Text style={styles.time}>Remaining Time: {remainingTime}s</Text>
      <ProgressBar 
        progress={status === 'Completed' ? 1 : (timer.duration - remainingTime) / timer.duration} 
        color="#4CAF50" 
        style={styles.progressBar} 
      />

      <View style={styles.buttons}>
        <Button title="Start" onPress={startTimer} disabled={status === 'Running' || status === 'Completed'} color="#4CAF50" />
        <Button title="Pause" onPress={pauseTimer} disabled={status !== 'Running' || status === 'Completed'} color="#FF9800" />
        <Button title="Reset" onPress={resetTimer} disabled={status === 'Completed'} color="#F44336" />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsText}>🎉 Timer Completed!</Text>
            <Text style={styles.timerName}>{timer.name}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  name: { 
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  running: { color: '#4CAF50' },
  paused: { color: '#FF9800' },
  completed: { color: '#F44336' },
  progressBar: { 
    height: 10, 
    borderRadius: 5, 
    marginVertical: 10 
  },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },

  // 🔥 Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  timerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
