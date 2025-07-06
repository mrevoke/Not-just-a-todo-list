import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  input: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function AddTaskModal({ visible, input, onChangeText, onSave, onCancel }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Add New Task</Text>
          <TextInput
            placeholder="What's on your mind?"
            value={input}
            onChangeText={onChangeText}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <View style={styles.buttons}>
            <Pressable style={styles.saveButton} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: '#333', textAlign: 'center' },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  saveText: { color: 'white', fontWeight: 'bold' },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  cancelText: { color: '#555' },
});
