import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Reminder = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | undefined;
  isImportant: boolean;
};

const ReminderItem = ({
  reminder,
  onDelete,
  isNightMode,
}: {
  reminder: Reminder;
  onDelete: (id: number) => void;
  isNightMode: boolean;
}) => {
  return (
    <View
      style={[
        styles.reminderContainer,
        { backgroundColor: isNightMode ? '#333' : '#fff' },
      ]}
    >
      {/* Display Star for Important Reminder */}
      <View style={styles.reminderTitleContainer}>
        {reminder.isImportant && (
          <MaterialIcons name="star" size={24} color="gold" />
        )}
        <Text
          style={[
            styles.reminderTitle,
            { color: isNightMode ? '#fff' : '#000' },
          ]}
        >
          {reminder.title}
        </Text>
      </View>
      <Text style={{ color: isNightMode ? '#ddd' : '#000' }}>
        {reminder.description}
      </Text>
      <Text style={{ color: isNightMode ? '#ccc' : '#000' }}>
        {reminder.dueDate?.toLocaleDateString() || 'No due date'}
      </Text>

      {/* Delete Button */}
      <TouchableOpacity
        onPress={() => onDelete(reminder.id)}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
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
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default ReminderItem;
