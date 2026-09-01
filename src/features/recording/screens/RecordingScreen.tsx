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

import type {
  RootStackParamList,
} from '../../../app/navigation/AppNavigator';

import useRecording from '../hooks/useRecording';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Recording'
>;

const RecordingScreen = ({
  navigation,
}: Props) => {
  const {
    status,
    duration,
    start,
    pause,
    resume,
    stop: stopRecording,
  } = useRecording();

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
  // Finish Recording
  // --------------------------------------------------

  const handleFinish = async () => {
    try {
      console.log(
        'Finish button pressed',
      );

      const result =
        await stopRecording();

      console.log(
        'Stop result:',
        result,
      );

      if (!result) {
        console.error(
          'Recording did not return a result',
        );

        return;
      }

      console.log(
        'Recording saved successfully',
      );

      console.log(
        'Story ID:',
        result.storyId,
      );

      console.log(
        'Audio Path:',
        result.path,
      );

      console.log(
        'Duration:',
        result.duration,
      );

      // ----------------------------------------------
      // Navigate to Recording Complete
      // ----------------------------------------------

      navigation.replace(
        'RecordingComplete',
        {
          storyId: result.storyId,
          audioPath: result.path,
          duration: result.duration,
        },
      );
    } catch (error) {
      console.error(
        'Failed to finish recording:',
        error,
      );
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.content}>

        {/* ------------------------------------------ */}
        {/* Microphone */}
        {/* ------------------------------------------ */}

        <Text style={styles.microphone}>
          🎙️
        </Text>

        {/* ------------------------------------------ */}
        {/* Timer */}
        {/* ------------------------------------------ */}

        <Text style={styles.timer}>
          {formatTime(duration)}
        </Text>

        {/* ------------------------------------------ */}
        {/* Status */}
        {/* ------------------------------------------ */}

        <Text style={styles.status}>
          {status === 'idle' &&
            'Ready to tell your story'}

          {status === 'recording' &&
            'Recording your story...'}

          {status === 'paused' &&
            'Recording paused'}
        </Text>

        {/* ------------------------------------------ */}
        {/* IDLE */}
        {/* ------------------------------------------ */}

        {status === 'idle' && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={start}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              🎙️ Start Recording
            </Text>
          </TouchableOpacity>
        )}

        {/* ------------------------------------------ */}
        {/* RECORDING */}
        {/* ------------------------------------------ */}

        {status === 'recording' && (
          <View style={styles.row}>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={pause}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>
                ⏸ Pause
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.stopButtonText}>
                ■ Finish
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {/* ------------------------------------------ */}
        {/* PAUSED */}
        {/* ------------------------------------------ */}

        {status === 'paused' && (
          <View style={styles.row}>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={resume}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>
                ▶ Resume
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stopButton}
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.stopButtonText}>
                ■ Finish
              </Text>
            </TouchableOpacity>

          </View>
        )}

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

  microphone: {
    fontSize: 70,
  },

  timer: {
    marginTop: 25,
    fontSize: 46,
    fontWeight: '700',
    color: '#111111',
  },

  status: {
    marginTop: 12,
    fontSize: 17,
    color: '#666666',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 40,
  },

  primaryButton: {
    marginTop: 40,
    backgroundColor: '#111111',
    paddingVertical: 17,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },

  stopButton: {
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: '#DD3333',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RecordingScreen;