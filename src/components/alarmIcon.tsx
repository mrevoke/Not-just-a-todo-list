import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = { onPress: () => void };

export default function AlarmIcon({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Feather name="bell" size={26} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    marginTop: 50,
  },
});
