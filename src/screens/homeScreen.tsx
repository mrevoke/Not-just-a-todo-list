import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import todoStore from '../stores/todoStore';
import FloatingAddButton from '../components/floatingAddButton';
import TodoItem from '../components/todoItem';
import AddTaskModal from '../components/addTaskModal';
import ReminderModal from '../components/reminderModal';
import Markdown from 'react-native-markdown-display';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = observer(() => {
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [planVisible, setPlanVisible] = useState(false);

  const handleGenerate = async () => {
    await todoStore.generatePlan();
    setPlanVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleGenerate}>
          <MaterialCommunityIcons name="brain" size={30} color="#2E86AB" />
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>setReminderVisible(true)}>
          <MaterialCommunityIcons name="alarm" size={30} color="#2E86AB" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={todoStore.todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 180 }}
        renderItem={({ item }) => (
          <TodoItem item={item} onToggle={() => todoStore.toggleTodo(item.id)} />
        )}
      />

      {/* Add Task Modal */}
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

      {/* Reminder Modal */}
      <ReminderModal visible={reminderVisible} onClose={() => setReminderVisible(false)} />

      {/* AI Plan Bottom Sheet */}
      <Modal
        visible={planVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPlanVisible(false)}
      >
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.planTitle}>🧠 AI Suggested Plan</Text>
              <Pressable onPress={() => setPlanVisible(false)}>
                <MaterialCommunityIcons name="close-circle-outline" size={26} color="gray" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Markdown style={markdownStyles}>
                {todoStore.aiPlan || 'No plan generated yet.'}
              </Markdown>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Floating Add Task Button */}
      <FloatingAddButton onPress={() => setModalVisible(true)} />

      {/* Fullscreen Loader Overlay */}
      {todoStore.loadingPlan && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#2E86AB" />
        </View>
      )}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '65%',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#2E86AB',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});


const markdownStyles: {
  body: TextStyle;
  bullet_list: ViewStyle;
  list_item: ViewStyle;
  strong: TextStyle;
  em: TextStyle;
  heading2: TextStyle;
} = {
  body: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bullet_list: {
    marginVertical: 4,
  },
  list_item: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-start' as const,
  },
  strong: {
    fontWeight: '700',
  },
  em: {
    fontStyle: 'italic',
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
};