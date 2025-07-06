import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Feather } from '@expo/vector-icons';
import ReminderButton from '../utils/reminderButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Todo List'>;

const HomeScreen = observer(() => {
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Alarm Icon */}
      <TouchableOpacity
        style={styles.alarmIcon}
        onPress={() => setReminderModalVisible(true)}
      >
        <Feather name="bell" size={24} color="black" />
      </TouchableOpacity>

      {/* Task Add Modal */}
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Task title"
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
          <Button
            title="Save"
            onPress={() => {
              if (input.trim()) todoStore.addTodo(input.trim());
              setInput('');
              setModalVisible(false);
            }}
          />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Reminder Modal */}
    <Modal
  visible={reminderModalVisible}
  animationType="fade"
  transparent={true}
  onRequestClose={() => setReminderModalVisible(false)}
>
  <View style={styles.popupOverlay}>
    <View style={styles.popupContainer}>
      <Text style={styles.popupTitle}>Set Daily Reminder</Text>
      <ReminderButton />
      <View style={{ marginTop: 20 ,marginHorizontal: 20 }}>
        <Button title="Close" onPress={() => setReminderModalVisible(false)} />
      </View>
    </View>
  </View>
</Modal>


      {/* Todo List */}
      <FlatList
        data={todoStore.todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
            >
              <Text style={[styles.item, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => todoStore.toggleTodo(item.id)}>
              <Feather
                name={item.completed ? 'check-circle' : 'circle'}
                size={24}
                color={item.completed ? 'green' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  alarmIcon: { alignSelf: 'flex-end', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  popupOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

popupContainer: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

popupTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},

  item: { padding: 10, fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
});
