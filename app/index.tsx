import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  Switch,
  Animated,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import ReminderItem from './reminder_item';
import { Reminder } from './reminder_data';
import { router } from 'expo-router';

const App = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const sidebarAnimation = useRef(new Animated.Value(-250)).current; // Sidebar starts hidden off-screen
  
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
  
  const onDayPress = (day: { dateString: string }) => {
    const [year, month, date] = day.dateString.split('-').map(Number);
    const selectedDate = new Date(Date.UTC(year, month - 1, date));
    setDueDate(selectedDate);
    setShowCalendar(false);
  };  

  const goToSillyMode = () => {
    router.push('/sillymode_page'); // Navigate to the silly reminders page
  };
  
  const toggleSidebar = () => {
    if (sidebarVisible) {
      // Slide sidebar out
      Animated.timing(sidebarAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      // Slide sidebar in
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };
  
  const lightTheme = {
    container: { backgroundColor: '#f9f9f9' },
    text: { color: '#000' },
    input: { backgroundColor: '#fff', borderColor: '#ccc', color: '#000' },
  };
  
  const darkTheme = {
    container: { backgroundColor: '#1e1e1e' },
    text: { color: '#fff' },
    input: { backgroundColor: '#333', borderColor: '#555', color: '#fff' },
  };
  
  const theme = isNightMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, theme.container]}>
    {/* Sidebar */}
    <Animated.View
    style={[
      styles.sidebar,
      { backgroundColor: isNightMode ? darkTheme.container.backgroundColor : lightTheme.container.backgroundColor },
      { transform: [{ translateX: sidebarAnimation }] },
    ]}>
    <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
    <Text style={[styles.closeButtonText, theme.text]}>✖</Text>
    </TouchableOpacity>
    <Text style={[styles.sidebarText, theme.text]}>Folders</Text>
    <Text style={[styles.sidebarText, theme.text]}>Tags</Text>
    </Animated.View>
    
    {/* Main Content */}
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
    <Text style={[styles.menuButtonText, theme.text]}>☰</Text>
    </TouchableOpacity>
    <Text style={[styles.header, theme.text]}>Reminders</Text>
    <View style={styles.toggleContainer}>
    <Text style={[styles.toggleText, theme.text]}>
    {isNightMode ? 'Night Mode' : 'Day Mode'}
    </Text>
    <Switch
    value={isNightMode}
    onValueChange={(value) => setIsNightMode(value)}
    />
    </View>
    </View>
    
    <View style={styles.inputContainer}>
    <TextInput
    placeholder="Title"
    value={title}
    onChangeText={setTitle}
    style={[styles.input, theme.input]}
    placeholderTextColor={theme.text.color}
    />
    <TextInput
    placeholder="Description"
    value={description}
    onChangeText={setDescription}
    style={[styles.input, theme.input]}
    placeholderTextColor={theme.text.color}
    />
    <TouchableOpacity
    style={[styles.datePickerButton, theme.input]}
    onPress={() => setShowCalendar(true)}
    >
    <Text style={[styles.datePickerText, theme.text]}>
    {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
    </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setIsImportant(!isImportant)}>
    <Text style={[styles.importantText, theme.text]}>
    {isImportant ? '⭐ Marked as Important' : '☆ Mark as Important'}
    </Text>
    </TouchableOpacity>
    <Button title="Add Reminder" onPress={handleAddReminder} color={isNightMode ? '#565370' : '#99afb0'} font-family={'Cambria'}/>
    </View>
    
    {/* Calendar Modal */}
    <Modal
    visible={showCalendar}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setShowCalendar(false)}
    >
    <View style={styles.modalContainer}>
    <Calendar
    current={dueDate ? dueDate.toISOString().split('T')[0] : undefined}
    onDayPress={onDayPress}
    />
    <Button title="Close" onPress={() => setShowCalendar(false)} />
    </View>
    </Modal>
    
    <FlatList
    data={reminders}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <ReminderItem
      reminder={item}
      isNightMode={isNightMode}
      onDelete={(id) =>
        setReminders(reminders.filter((reminder) => reminder.id !== id))
      } />
    )}
    contentContainerStyle={styles.list} />
    {/* Circular Button in top-right that always says "ON" */}
    <TouchableOpacity style={styles.sillyModeButton} onPress={goToSillyMode}>
    <Text style={styles.buttonText}>ON</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 250,
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1,
    elevation: 1,
  },
  sidebarText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  menuButton: {
    marginRight: 15,
  },
  menuButtonText: {
    fontSize: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginRight: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  datePickerButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
  },
  importantText: {
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  }
});

export default App;
