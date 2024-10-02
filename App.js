import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Add task with default status 'due' (false)
  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { title: taskTitle, status: false }]);
      setTaskTitle('');
    }
  };

  // Toggle the task status (done/due)
  const toggleStatus = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  // Open modal for editing task
  const editTask = (index) => {
    setEditingTaskIndex(index);
    setNewTaskTitle(tasks[index].title);
    setModalVisible(true);
  };

  // Save edited task
  const saveTaskEdit = () => {
    if (newTaskTitle.trim()) {
      const updatedTasks = tasks.map((task, i) => {
        if (i === editingTaskIndex) {
          return { ...task, title: newTaskTitle };
        }
        return task;
      });
      setTasks(updatedTasks);
      setModalVisible(false);
      setEditingTaskIndex(null);
      setNewTaskTitle('');
    }
  };

  // Render each task item
  const renderTask = ({ item, index }) => (
    <View
      style={[
        styles.taskCard,
        { backgroundColor: item.status ? '#DFF2BF' : '#FFD2D2' },
      ]}
    >
      <Switch value={item.status} onValueChange={() => toggleStatus(index)} />
      <Text style={styles.taskTitle}>{item.title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editTask(index)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={(text) => setTaskTitle(text)}
        />
        <Button
          title="Add Task"
          color="#6A5ACD"
          onPress={addTask}
          disabled={!taskTitle.trim()}
        />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Task</Text>
          <TextInput
            style={styles.input}
            placeholder="New Task Title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />
          <View style={styles.modalButtons}>
            <Button
              title="Save"
              color="#6A5ACD"
              onPress={saveTaskEdit}
              disabled={!newTaskTitle.trim()}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A5ACD',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    marginRight: 10,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#6A5ACD',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#6A5ACD',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default App;
