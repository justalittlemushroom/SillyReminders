import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Use expo-router for navigation

const HomeScreen = () => {
  const router = useRouter(); // Get the router from expo-router

  // Handle button press (navigating to Silly Mode Page)
  const goToSillyMode = () => {
    router.push('/sillymode_page'); // Navigate to Silly Mode page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <Text style={styles.sillyModeText}>Silly Mode is OFF</Text>
      
      {/* Circular button in top-right corner */}
      <TouchableOpacity style={styles.sillyModeButton} onPress={goToSillyMode}>
        <Text style={styles.buttonText}>OFF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sillyModeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  sillyModeButton: {
    position: 'absolute', // Position the button in the top-right
    top: 20,
    right: 20,
    width: 50, // Set the width and height for the circle
    height: 50,
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red background
    borderRadius: 25, // Circle shape
    justifyContent: 'center', // Center the text inside
    alignItems: 'center',
    shadowColor: '#000', // Optional shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff', // Text color inside the button
    fontWeight: 'bold',
  },
});

export default HomeScreen;
