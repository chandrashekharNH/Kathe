import {useEffect, useRef, useState} from 'react';

import AudioRecordingService from '../../../services/audio/AudioRecordingService';

const useAudioPlayback = (audioPath: string | null) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [currentPosition, setCurrentPosition] =
    useState(0);

  const [totalDuration, setTotalDuration] =
    useState(0);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    AudioRecordingService.addPlaybackListener(data => {
      if (!isMounted.current) {
        return;
      }

      setCurrentPosition(data.currentPosition);
      setTotalDuration(data.duration);
    });

    AudioRecordingService.addPlaybackEndListener(() => {
      if (!isMounted.current) {
        return;
      }

      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    });

    return () => {
      isMounted.current = false;

      AudioRecordingService.removePlaybackListener();

      AudioRecordingService.removePlaybackEndListener();
    };
  }, []);

  const play = async () => {
    if (!audioPath) {
      console.warn('No audio file available');
      return;
    }

    try {
      await AudioRecordingService.startPlayback(
        audioPath,
      );

      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error(
        'Failed to play recording:',
        error,
      );
    }
  };

  const pause = async () => {
    try {
      await AudioRecordingService.pausePlayback();

      setIsPlaying(false);
      setIsPaused(true);
    } catch (error) {
      console.error(
        'Failed to pause playback:',
        error,
      );
    }
  };

  const resume = async () => {
    try {
      await AudioRecordingService.resumePlayback();

      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error(
        'Failed to resume playback:',
        error,
      );
    }
  };

  const stop = async () => {
    try {
      await AudioRecordingService.stopPlayback();

      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    } catch (error) {
      console.error(
        'Failed to stop playback:',
        error,
      );
    }
  };

  return {
    isPlaying,
    isPaused,
    currentPosition,
    totalDuration,
    play,
    pause,
    resume,
    stop,
  };
};

export default useAudioPlayback;