import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ReminderItem from './reminder_item';
import { Reminder } from './reminder_data';

const App = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleAddReminder = () => {
    if (!title || !description || !dueDate) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newReminder: Reminder = {
      id: reminders.length + 1,
      title,
      description,
      dueDate,
      isImportant,
    };

    setReminders((prev) => [...prev, newReminder]);
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setIsImportant(false);
  };

  const onDayPress = (day: any) => {
    const selectedDate = new Date(day.dateString);
    setDueDate(selectedDate);
    setShowCalendar(false);  // Close the calendar after selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminders</Text>

      {/* Reminder Input Form */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        {/* Due Date */}
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowCalendar(true)}>
          <Text style={styles.datePickerText}>
            {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
          </Text>
        </TouchableOpacity>

        {/* Important Star */}
        <TouchableOpacity onPress={() => setIsImportant(!isImportant)}>
          <Text style={styles.importantText}>
            {isImportant ? '⭐ Important' : '☆ Mark as Important'}
          </Text>
        </TouchableOpacity>

        <Button title="Add Reminder" onPress={handleAddReminder} />
      </View>

      {/* Modal for the Calendar Picker */}
      <Modal visible={showCalendar} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [dueDate?.toISOString().split('T')[0] || '']: { selected: true, selectedColor: 'blue' },
              }}
              theme={{
                selectedDayBackgroundColor: '#00adf5',
                todayTextColor: '#00adf5',
              }}
            />
            <Button title="Close Calendar" onPress={() => setShowCalendar(false)} />
          </View>
        </View>
      </Modal>

      {/* List of Reminders */}
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReminderItem reminder={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  datePickerText: {
    color: '#666',
  },
  importantText: {
    marginBottom: 10,
    color: '#f39c12',
  },
  list: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
});

export default App;
