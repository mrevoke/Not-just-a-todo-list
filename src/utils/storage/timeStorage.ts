import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTimeToStorage = async (key: string, date: Date) => {
  await AsyncStorage.setItem(key, date.toISOString());
};

export const getTimeFromStorage = async (key: string): Promise<Date | null> => {
  const stored = await AsyncStorage.getItem(key);
  return stored ? new Date(stored) : null;
};
