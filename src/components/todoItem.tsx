import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { TodoItem as Todo } from '../types/todo';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Todo List'>;

export default function TodoItem({ item, onToggle }: { item: Todo; onToggle: () => void }) {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
      >
        <Text style={[styles.item, item.completed && styles.completed]}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggle}>
        <Feather
          name={item.completed ? 'check-circle' : 'circle'}
          size={24}
          color={item.completed ? '#6fcf97' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  item: { fontSize: 17, color: '#333' },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  titleContainer: { flex: 1, marginRight: 10 },
});
