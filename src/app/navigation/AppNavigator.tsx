import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../features/home/screens/HomeScreen';
import RecordingScreen from '../../features/recording/screens/RecordingScreen';

import RecordingCompleteScreen from '../../features/recording/screens/RecordingCompleteScreen';

import type {Transcript} from '../../domain/models/Transcript';
import TranscribingScreen from '../../features/story/screens/TranscribingScreen';


import RoughStoryScreen from '../../features/story/screens/RoughStoryScreen';


export type RootStackParamList = {
  Home: undefined;

  Recording: undefined;

  RecordingComplete: {
    audioPath: string;
    duration: number;
    storyId: string;
  };

  Transcribing: {
    storyId: string;
    audioPath: string;
  };

  RoughStory: {
    transcript: Transcript;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Recording"
          component={RecordingScreen}
          options={{
            title: 'Tell Your Story',
          }}
        />

        <Stack.Screen
          name="RecordingComplete"
          component={RecordingCompleteScreen}
          options={{
        title: 'Recording Complete',
        }}
        />

        <Stack.Screen
        name="Transcribing"
        component={TranscribingScreen}
        options={{
         headerShown: false,
        }}
        />

        <Stack.Screen
        name="RoughStory"
        component={RoughStoryScreen}
        options={{
         title: 'Rough Story',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;