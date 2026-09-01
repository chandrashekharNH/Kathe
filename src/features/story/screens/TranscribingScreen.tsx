import React, {useEffect, useRef, useState} from 'react';

import {
  ActivityIndicator,
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

import {
  transcribeStoryUseCase,
} from '../../../app/dependencies';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Transcribing'
>;

const TranscribingScreen = ({
  route,
  navigation,
}: Props) => {
  const {
    storyId,
    audioPath,
  } = route.params;

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [isProcessing, setIsProcessing] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  // --------------------------------------------------
  // Prevent duplicate execution
  // --------------------------------------------------

  const hasStarted = useRef(false);

  const isMounted = useRef(true);

  // --------------------------------------------------
  // Cleanup
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // --------------------------------------------------
  // Transcription
  // --------------------------------------------------

  useEffect(() => {
    // Prevent duplicate transcription
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    const transcribe = async () => {
      try {
        console.log(
          '--------------------------------',
        );

        console.log(
          'Starting transcription...',
        );

        console.log(
          'Story ID:',
          storyId,
        );

        console.log(
          'Audio Path:',
          audioPath,
        );

        console.log(
          '--------------------------------',
        );

        // --------------------------------------------
        // Call Use Case
        // --------------------------------------------

        const transcript =
          await transcribeStoryUseCase.execute(
            storyId,
            audioPath,
          );

        console.log(
          'Transcription completed:',
          transcript,
        );

        // --------------------------------------------
        // Check component is still mounted
        // --------------------------------------------

        if (!isMounted.current) {
          return;
        }

        setIsProcessing(false);

        // --------------------------------------------
        // Navigate to Rough Story
        // --------------------------------------------

        navigation.replace(
          'RoughStory',
          {
            transcript,
          },
        );

      } catch (error) {

        console.error(
          'Transcription failed:',
          error,
        );

        if (!isMounted.current) {
          return;
        }

        setIsProcessing(false);

        setErrorMessage(
          'We could not process your story. Please try again.',
        );
      }
    };

    transcribe();
  }, [
    storyId,
    audioPath,
    navigation,
  ]);

  // --------------------------------------------------
  // Retry
  // --------------------------------------------------

  const handleRetry = () => {
    hasStarted.current = false;

    setErrorMessage(null);

    setIsProcessing(true);

    const retryTranscription = async () => {
      try {
        console.log(
          'Retrying transcription...',
        );

        const transcript =
          await transcribeStoryUseCase.execute(
            storyId,
            audioPath,
          );

        if (!isMounted.current) {
          return;
        }

        setIsProcessing(false);

        navigation.replace(
          'RoughStory',
          {
            transcript,
          },
        );

      } catch (error) {

        console.error(
          'Retry transcription failed:',
          error,
        );

        if (!isMounted.current) {
          return;
        }

        setIsProcessing(false);

        setErrorMessage(
          'Unable to process the recording. Please try again.',
        );
      }
    };

    retryTranscription();
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
        {/* Processing */}
        {/* ------------------------------------------ */}

        {isProcessing && (
          <>
            <View
              style={styles.iconContainer}
            >

              <Text style={styles.icon}>
                🎙️
              </Text>

            </View>

            <Text style={styles.title}>
              Processing Your Story
            </Text>

            <Text style={styles.description}>
              Converting your voice into text...
            </Text>

            <ActivityIndicator
              size="large"
              style={styles.loader}
            />

            <Text style={styles.waitText}>
              This may take a moment
            </Text>
          </>
        )}

        {/* ------------------------------------------ */}
        {/* Error */}
        {/* ------------------------------------------ */}

        {!isProcessing &&
          errorMessage && (
            <>
              <View
                style={styles.errorIconContainer}
              >

                <Text style={styles.errorIcon}>
                  !
                </Text>

              </View>

              <Text style={styles.title}>
                Something went wrong
              </Text>

              <Text style={styles.description}>
                {errorMessage}
              </Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
                activeOpacity={0.8}
              >

                <Text
                  style={styles.retryButtonText}
                >
                  Try Again
                </Text>

              </TouchableOpacity>
            </>
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
    paddingHorizontal: 30,
  },

  // --------------------------------------------------
  // Processing
  // --------------------------------------------------

  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 50,
  },

  title: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 23,
  },

  loader: {
    marginTop: 30,
  },

  waitText: {
    marginTop: 15,
    fontSize: 13,
    color: '#999999',
  },

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FDECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorIcon: {
    fontSize: 40,
    fontWeight: '700',
    color: '#DD3333',
  },

  retryButton: {
    marginTop: 30,
    backgroundColor: '#111111',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TranscribingScreen;