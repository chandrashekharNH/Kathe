import React, {
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  saveRoughStoryUseCase,
} from '../../../app/dependencies';


type Props = NativeStackScreenProps<
  RootStackParamList,
  'RoughStory'
>;


const RoughStoryScreen = ({
  route,
  navigation,
}: Props) => {

  const {
    transcript,
  } = route.params;

  // --------------------------------------------------
  // Story Text
  // --------------------------------------------------

  const [text, setText] =
    useState(transcript.text);

  // --------------------------------------------------
  // Saving State
  // --------------------------------------------------

  const [isSaving, setIsSaving] =
    useState(false);

  // --------------------------------------------------
  // Save Rough Story
  // --------------------------------------------------

  const handleSave = async () => {

    const trimmedText =
      text.trim();

    if (!trimmedText) {

      Alert.alert(
        'Story Required',
        'Please enter your story before continuing.',
      );

      return;
    }

    try {

      setIsSaving(true);

      console.log(
        'Saving rough story...',
      );

      console.log(
        'Story ID:',
        transcript.storyId,
      );

      await saveRoughStoryUseCase.execute(
        transcript.storyId,
        trimmedText,
      );

      console.log(
        'Rough story saved successfully',
      );

      Alert.alert(
        'Story Saved',
        'Your rough story has been saved successfully.',
      );

    } catch (error) {

      console.error(
        'Failed to save rough story:',
        error,
      );

      Alert.alert(
        'Save Failed',
        'We could not save your story. Please try again.',
      );

    } finally {

      setIsSaving(false);
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        keyboardShouldPersistTaps="handled"
      >

        {/* ------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------ */}

        <Text style={styles.title}>
          Your Rough Story
        </Text>

        <Text style={styles.description}>
          This is the text created from your
          recorded story.
        </Text>

        <Text style={styles.instruction}>
          Review and edit it before creating
          your screenplay.
        </Text>

        {/* ------------------------------------------ */}
        {/* Writing Block */}
        {/* ------------------------------------------ */}

        <View style={styles.editorContainer}>

          <TextInput
            style={styles.editor}
            value={text}
            onChangeText={setText}
            multiline
            textAlignVertical="top"
            placeholder="Write your story here..."
            placeholderTextColor="#999999"
            editable={!isSaving}
          />

        </View>

        {/* ------------------------------------------ */}
        {/* Character Count */}
        {/* ------------------------------------------ */}

        <View style={styles.metaRow}>

          <Text style={styles.metaText}>
            {text.length} characters
          </Text>

          <Text style={styles.metaText}>
            {text.trim().length === 0
              ? 'Empty story'
              : 'Story ready'}
          </Text>

        </View>

        {/* ------------------------------------------ */}
        {/* Save */}
        {/* ------------------------------------------ */}

        <TouchableOpacity
          style={[
            styles.saveButton,
            isSaving &&
              styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
        >

          {isSaving ? (

            <View style={styles.loadingRow}>

              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

              <Text
                style={styles.saveButtonText}
              >
                Saving...
              </Text>

            </View>

          ) : (

            <Text
              style={styles.saveButtonText}
            >
              Save Rough Story
            </Text>

          )}

        </TouchableOpacity>

        {/* ------------------------------------------ */}
        {/* Future */}
        {/* ------------------------------------------ */}

        <Text style={styles.nextStepText}>
          After saving, we'll turn your story
          into a scene-by-scene screenplay.
        </Text>

      </ScrollView>

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
    padding: 24,
    paddingBottom: 50,
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
  },

  instruction: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
  },

  // --------------------------------------------------
  // Writing Block
  // --------------------------------------------------

  editorContainer: {
    marginTop: 25,
    minHeight: 420,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 16,
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },

  editor: {
    minHeight: 420,
    padding: 18,
    fontSize: 17,
    lineHeight: 27,
    color: '#222222',
  },

  // --------------------------------------------------
  // Meta
  // --------------------------------------------------

  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  metaText: {
    fontSize: 12,
    color: '#888888',
  },

  // --------------------------------------------------
  // Save Button
  // --------------------------------------------------

  saveButton: {
    marginTop: 25,
    paddingVertical: 17,
    borderRadius: 14,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // --------------------------------------------------
  // Next Step
  // --------------------------------------------------

  nextStepText: {
    marginTop: 18,
    fontSize: 13,
    lineHeight: 19,
    color: '#999999',
    textAlign: 'center',
  },

});

export default RoughStoryScreen;