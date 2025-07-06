
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Feather } from '@expo/vector-icons'; // or MaterialIcons, Ionicons, etc.

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Todo List'>;

const HomeScreen = observer(() => {
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();


  return (
    <View style={styles.container}>
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
      <FlatList
        data={todoStore.todos}
        keyExtractor={item => item.id}
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

  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  item: { padding: 10, fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  modalContainer: { flex: 1, justifyContent: 'center', padding: 20 },
});