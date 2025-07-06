import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';
import AlarmIcon from '../components/alarmIcon';
import FloatingAddButton from '../components/floatingAddButton';
import TodoItem from '../components/todoItem';
import AddTaskModal from '../components/addTaskModal';
import ReminderModal from '../components/reminderModal';

const HomeScreen = observer(() => {
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AlarmIcon onPress={() => setReminderVisible(true)} />
      <FloatingAddButton onPress={() => setModalVisible(true)} />

      <FlatList
        data={todoStore.todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={() => todoStore.toggleTodo(item.id)} />
        )}
      />

      <AddTaskModal
        visible={modalVisible}
        input={input}
        onChangeText={setInput}
        onSave={() => {
          if (input.trim()) todoStore.addTodo(input.trim());
          setInput('');
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />

      <ReminderModal
        visible={reminderVisible}
        onClose={() => setReminderVisible(false)}
      />
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
  },
});
