import React, { useState } from 'react';
import { View, Button, Alert, Platform, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function ReminderButton() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onTimeChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setTime(date);
    }
  };

  const scheduleDailyReminder = async () => {
    if (!Device.isDevice) {
      Alert.alert('Notifications only work on physical devices.');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get permission for notifications!');
      return;
    }

    const hour = time.getHours();
    const minute = time.getMinutes();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Tasks Reminder',
        body: 'Complete or add new tasks',
      },
      trigger: {
    type: Notifications.SchedulableTriggerInputTypes.DAILY,
   hour: hour,
      minute: minute,
  },
    });

    Alert.alert(`Reminder set for ${hour}:${minute < 10 ? '0' + minute : minute} daily`);
  };

  return (
    <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
      <Text style={{ marginBottom: 10 }}>Selected Time: {time.toLocaleTimeString()}</Text>
      <Button title="Pick Time" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          mode="time"
          value={time}
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Set Daily Reminder" onPress={scheduleDailyReminder} />
      </View>
    </View>
  );
}
