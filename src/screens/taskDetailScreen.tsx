import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';

const TaskDetailScreen = observer(({ route, navigation }: any) => {
  const { id } = route.params;
  const todo = todoStore.todos.find(t => t.id === id);
  const [title, setTitle] = useState(todo?.title || '');

  if (!todo) return null;

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Validation', 'Task title cannot be empty.');
      return;
    }
    todoStore.editTodo(id, title);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          todoStore.deleteTodo(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Task</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter task title"
        placeholderTextColor="#aaa"
      />

      <View style={styles.buttonGroup}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete Task</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fefefe',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  buttonGroup: {
    marginTop: 10,
    gap: 16,
  },
  saveButton: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#fce4e4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
