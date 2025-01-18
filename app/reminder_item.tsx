import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importing the Material Icons set

type Reminder = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | undefined;
  isImportant: boolean;
};

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  return (
    <View style={styles.reminderContainer}>
      {/* Display Star for Important Reminder */}
      <View style={styles.reminderTitleContainer}>
        {reminder.isImportant && (
          <MaterialIcons name="star" size={24} color="gold" />
        )}
        <Text style={styles.reminderTitle}>{reminder.title}</Text>
      </View>
      <Text>{reminder.description}</Text>
      <Text>{reminder.dueDate?.toLocaleDateString() || 'No due date'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reminderContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },
  reminderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ReminderItem;
