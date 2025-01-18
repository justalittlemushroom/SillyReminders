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
  const [isSillyMode, setIsSillyMode] = useState(false); // new state for silly mode

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

  // Function to shuffle reminders for silly mode
  const shuffleReminders = (reminders: Reminder[]) => {
    const shuffled = [...reminders];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // switches random elements into random places
    }
    return shuffled;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SILLY REMINDERS!!!!!</Text>

      {/* Reminder Input Form */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ltiTe"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="iispnterDoc"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        {/* Due Date */}
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowCalendar(true)}>
          <Text style={styles.datePickerText}>
            {dueDate ? dueDate.toLocaleDateString() : 'etDa Steuec leD'}
          </Text>
        </TouchableOpacity>

        {/* Important Star */}
        <TouchableOpacity onPress={() => setIsImportant(!isImportant)}>
          <Text style={styles.importantText}>
            {isImportant ? '⭐ Important' : '☆ r pM aasokrmnItat'}
          </Text>
        </TouchableOpacity>

        <Button title="ADD A SILLY REMINDER?!" onPress={handleAddReminder} />
      </View>

      {/* Silly Mode Toggle */}
      <TouchableOpacity
        style={styles.sillyModeButton}
        onPress={() => setIsSillyMode((prev) => !prev)}
      >
        <Text style={styles.sillyModeText}>
          {isSillyMode ? 'Turn Off Silly Mode' : 'Turn On Silly Mode'}
        </Text>
      </TouchableOpacity>

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
                selectedDayBackgroundColor: '#ab2b4d',
                todayTextColor: '#ab2b4d',
              }}
            />
            <Button title="CLOSE CALENDAR!" onPress={() => setShowCalendar(false)} />
          </View>
        </View>
      </Modal>

      {/* List of Reminders */}
      <FlatList
        data={isSillyMode ? shuffleReminders(reminders) : reminders} // Shuffle when silly mode is on
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
    backgroundColor: '#ffd4e9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'purple',
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
  sillyModeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eb4bd5',
    borderRadius: 5,
    alignItems: 'center',
  },
  sillyModeText: {
    color: '#green',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 91, 244, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
});

export default App;