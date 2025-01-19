import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const SoundTest = () => {
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/sounds/sillyMeow.mp3') 
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SoundTest;
