
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';

const TaskDetailScreen = observer(({ route, navigation }: any) => {
  const { id } = route.params;
  const todo = todoStore.todos.find(t => t.id === id);
  const [title, setTitle] = useState(todo?.title || '');

  if (!todo) return null;

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button
        title="Save Changes"
        onPress={() => {
          todoStore.editTodo(id, title);
          navigation.goBack();
        }}
      />
      <Button
        title="Delete Task"
        onPress={() => {
          todoStore.deleteTodo(id);
          navigation.goBack();
        }}
        color="red"
      />
    </View>
  );
});

export default TaskDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
});
