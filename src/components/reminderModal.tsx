import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import ReminderButton from '../components/reminderButton';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ReminderModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <ReminderButton />

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#2E86AB',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeText: {
    color: '#2E86AB',
    fontWeight: '600',
    fontSize: 15,
  },
});
