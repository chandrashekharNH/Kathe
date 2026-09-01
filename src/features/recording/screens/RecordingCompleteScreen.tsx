import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../../../app/navigation/AppNavigator';

import useAudioPlayback from '../hooks/useAudioPlayback';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'RecordingComplete'
>;

const RecordingCompleteScreen = ({
  route,
  navigation,
}: Props) => {

  const {
    audioPath,
    duration,
     storyId,
  } = route.params;

  const {
    isPlaying,
    isPaused,
    currentPosition,
    totalDuration,
    play,
    pause,
    resume,
    stop,
  } = useAudioPlayback(audioPath);

  // --------------------------------------------------
  // Format Time
  // --------------------------------------------------

  const formatTime = (
    milliseconds: number,
  ): string => {

    const totalSeconds =
      Math.floor(milliseconds / 1000);

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    return `${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  // --------------------------------------------------
  // Continue
  // --------------------------------------------------

  const handleContinue = async () => {
  if (isPlaying || isPaused) {
    await stop();
  }

  navigation.replace(
    'Transcribing',
    {
      storyId,
      audioPath,
    },
  );
};
  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaView
      style={styles.container}
    >

      <View style={styles.content}>

        {/* Success */}

        <View style={styles.successCircle}>

          <Text style={styles.checkmark}>
            ✓
          </Text>

        </View>

        <Text style={styles.title}>
          Recording Complete
        </Text>

        <Text style={styles.subtitle}>
          Your story has been saved successfully.
        </Text>

        {/* Playback */}

        <View style={styles.playerContainer}>

          <Text style={styles.playerTitle}>
            Your Story
          </Text>

          <Text style={styles.time}>

            {formatTime(currentPosition)}

            {' / '}

            {formatTime(
              totalDuration || duration,
            )}

          </Text>

          {/* Play */}

          {!isPlaying && !isPaused && (

            <TouchableOpacity
              style={styles.playButton}
              onPress={play}
              activeOpacity={0.8}
            >

              <Text style={styles.playButtonText}>
                ▶ Play Recording
              </Text>

            </TouchableOpacity>

          )}

          {/* Pause */}

          {isPlaying && (

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={pause}
              activeOpacity={0.8}
            >

              <Text style={styles.secondaryButtonText}>
                ⏸ Pause
              </Text>

            </TouchableOpacity>

          )}

          {/* Resume */}

          {!isPlaying && isPaused && (

            <TouchableOpacity
              style={styles.playButton}
              onPress={resume}
              activeOpacity={0.8}
            >

              <Text style={styles.playButtonText}>
                ▶ Resume
              </Text>

            </TouchableOpacity>

          )}

          {/* Stop */}

          {(isPlaying || isPaused) && (

            <TouchableOpacity
              style={styles.stopButton}
              onPress={stop}
              activeOpacity={0.8}
            >

              <Text style={styles.stopButtonText}>
                ■ Stop
              </Text>

            </TouchableOpacity>

          )}

        </View>

        {/* Continue */}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >

          <Text style={styles.continueButtonText}>
            Continue →
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

// ======================================================
// Styles
// ======================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  // --------------------------------------------------
  // Success
  // --------------------------------------------------

  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmark: {
    fontSize: 42,
    color: '#2E7D32',
    fontWeight: '700',
  },

  title: {
    marginTop: 22,
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
    textAlign: 'center',
  },

  // --------------------------------------------------
  // Player
  // --------------------------------------------------

  playerContainer: {
    width: '100%',
    marginTop: 35,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },

  playerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
  },

  time: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#444444',
  },

  playButton: {
    marginTop: 22,
    backgroundColor: '#111111',
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 13,
  },

  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    marginTop: 22,
    backgroundColor: '#EEEEEE',
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 13,
  },

  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },

  stopButton: {
    marginTop: 12,
    backgroundColor: '#DD3333',
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 13,
  },

  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // --------------------------------------------------
  // Continue
  // --------------------------------------------------

  continueButton: {
    width: '100%',
    marginTop: 24,
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#111111',
    alignItems: 'center',
  },

  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

});

export default RecordingCompleteScreen;