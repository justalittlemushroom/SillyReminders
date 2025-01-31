import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ReminderItem from './reminder_item';
import { Reminder } from './reminder_data';
import { useRouter } from 'expo-router'; 
import { Audio } from 'expo-av'; // Importing expo-av

const SillyModePage = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [isSillyMode, setIsSillyMode] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const router = useRouter(); 

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./sillyMeow.mp3') 
    );
    setSound(sound);
    await sound.playAsync(); // Plays meow
  };

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

    playSound(); 
  };

  const onDayPress = (day: any) => {
    const selectedDate = new Date(day.dateString);
    setDueDate(selectedDate);
    playSound();
    setShowCalendar(false);
  };

  const playSillyModeSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./sillyMeow.mp3') 
    );
    setSound(sound);
    await sound.playAsync();
  };

  const goToHomeScreen = () => {
    playSillyModeSound(); 
    router.push('/'); 
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); 
      }
    };
  }, [sound]);

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
            {isImportant ? '😈 Unimportant...' : '☆ r pM aasokrmnItat'}
          </Text>
        </TouchableOpacity>

        <Button title="ADD A SILLY REMINDER?!" onPress={handleAddReminder} />
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
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReminderItem reminder={item} onDelete={(id) => setReminders(reminders.filter((reminder) => reminder.id !== id))} isNightMode={false}/>
        )}
        contentContainerStyle={styles.list}
      />

      {/* Circular Button in top-right that always says "ON" */}
      <TouchableOpacity style={styles.sillyModeButton} onPress={goToHomeScreen}>
        <Text style={styles.buttonText}>ON</Text>
      </TouchableOpacity>
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
    backgroundColor: '#d9e7ff',
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 91, 244, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
});

export default SillyModePage;