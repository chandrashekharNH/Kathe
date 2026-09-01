import {useEffect, useRef, useState} from 'react';

import AudioRecordingService from '../../../services/audio/AudioRecordingService';

import {
  saveRecordedStoryUseCase,
} from '../../../app/dependencies';

import {Story} from '../../../domain/models/Story';

import {generateId} from '../../../shared/utils/id';

import {
  RecordingStatus,
} from '../../../domain/models/Recording';


// ======================================================
// Stop Result
// ======================================================

type StopRecordingResult = {
  storyId: string;
  path: string;
  duration: number;
};


// ======================================================
// Hook
// ======================================================

const useRecording = () => {

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [status, setStatus] =
    useState<RecordingStatus>('idle');

  const [duration, setDuration] =
    useState(0);

  const [filePath, setFilePath] =
    useState<string | null>(null);


  // --------------------------------------------------
  // Duration Ref
  // --------------------------------------------------

  // Keeps the latest duration value available
  // inside async functions.

  const durationRef =
    useRef(0);


  // --------------------------------------------------
  // Recording Listener
  // --------------------------------------------------

  useEffect(() => {

    AudioRecordingService.addRecordingListener(
      data => {

        durationRef.current =
          data.currentPosition;

        setDuration(
          data.currentPosition,
        );
      },
    );

    return () => {

      AudioRecordingService
        .removeRecordingListener();

    };

  }, []);


  // ==================================================
  // Start Recording
  // ==================================================

  const start = async () => {

    try {

      console.log(
        'Starting recording...',
      );

      // Reset duration

      durationRef.current = 0;

      setDuration(0);

      // Clear previous file

      setFilePath(null);

      // Start audio recorder

      const path =
        await AudioRecordingService
          .startRecording();

      console.log(
        'Recording path:',
        path,
      );

      // Update status

      setStatus('recording');

      console.log(
        'Recording started',
      );

    } catch (error) {

      console.error(
        'Failed to start recording:',
        error,
      );

    }
  };


  // ==================================================
  // Pause Recording
  // ==================================================

  const pause = async () => {

    try {

      await AudioRecordingService
        .pauseRecording();

      setStatus('paused');

      console.log(
        'Recording paused',
      );

    } catch (error) {

      console.error(
        'Failed to pause recording:',
        error,
      );

    }
  };


  // ==================================================
  // Resume Recording
  // ==================================================

  const resume = async () => {

    try {

      await AudioRecordingService
        .resumeRecording();

      setStatus('recording');

      console.log(
        'Recording resumed',
      );

    } catch (error) {

      console.error(
        'Failed to resume recording:',
        error,
      );

    }
  };


  // ==================================================
  // Stop Recording
  // ==================================================

  const stop = async (): Promise<
    StopRecordingResult | null
  > => {

    try {

      console.log(
        'Stopping recording...',
      );


      // ------------------------------------------------
      // Stop Audio
      // ------------------------------------------------

      const path =
        await AudioRecordingService
          .stopRecording();


      // ------------------------------------------------
      // Get Final Duration
      // ------------------------------------------------

      const finalDuration =
        durationRef.current;


      console.log(
        'Audio path:',
        path,
      );

      console.log(
        'Final duration:',
        finalDuration,
      );


      // ------------------------------------------------
      // Create Story
      // ------------------------------------------------

      const now =
        new Date().toISOString();


      const story: Story = {

        id: generateId(),

        title: 'Untitled Story',

        audioPath: path,

        duration: finalDuration,

        roughStory: null,

        status: 'recorded',

        createdAt: now,

        updatedAt: now,

      };


      console.log(
        'Story created:',
        story,
      );


      // ------------------------------------------------
      // Save Story
      // ------------------------------------------------

      await saveRecordedStoryUseCase.execute(
        story,
      );


      console.log(
        'Story saved successfully:',
        story,
      );


      // ------------------------------------------------
      // Update State
      // ------------------------------------------------

      setFilePath(path);

      setDuration(finalDuration);

      setStatus('completed');


      // ------------------------------------------------
      // Return Result
      // ------------------------------------------------

      const result: StopRecordingResult = {

        storyId: story.id,

        path: path,

        duration: finalDuration,

      };


      console.log(
        'Stop result:',
        result,
      );


      return result;

    } catch (error) {

      console.error(
        'Failed to stop recording:',
        error,
      );

      return null;
    }
  };


  // ==================================================
  // Return
  // ==================================================

  return {

    status,

    duration,

    filePath,

    start,

    pause,

    resume,

    stop,

  };
};


export default useRecording;