import React, { useEffect, useState } from 'react';
import { View, Alert, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Device from 'expo-device';

import { TIME_STORAGE_KEY } from '../constants/keys';
import { getTimeFromStorage, saveTimeToStorage } from '../utils/storage/timeStorage';
import { requestNotificationPermission, scheduleDailyNotification } from '../utils/notifications';

export default function ReminderButton() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const savedTime = await getTimeFromStorage(TIME_STORAGE_KEY);
      if (savedTime) setTime(savedTime);
    })();
  }, []);

  const onTimePicked = async (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;

    setTime(selectedDate);
    await saveTimeToStorage(TIME_STORAGE_KEY, selectedDate);
    await scheduleDailyNotification(selectedDate.getHours(), selectedDate.getMinutes());

    const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    Alert.alert(`Daily reminder set for ${formattedTime}`);
  };

  const handleSetReminderPress = async () => {
    if (!Device.isDevice) {
      Alert.alert('Notifications only work on physical devices.');
      return;
    }

    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      Alert.alert('Failed to get permission for notifications!');
      return;
    }

    setShowPicker(true);
  };

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
      <Text style={{ marginBottom: 10 }}>⏰ Current Reminder: {formattedTime}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSetReminderPress}>
        <Text style={styles.buttonText}>Set Daily Reminder</Text>
      </TouchableOpacity>

      {showPicker && (
      <DateTimePicker
  mode="time"
  value={time}
  is24Hour={false}
  display={'spinner'}
  onChange={onTimePicked}
/>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2E86AB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
