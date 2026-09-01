import Sound from 'react-native-nitro-sound';

class AudioRecordingService {
  // MARK: - Recording

  async startRecording(): Promise<string> {
    const path = await Sound.startRecorder();

    return path;
  }

  async pauseRecording(): Promise<void> {
    await Sound.pauseRecorder();
  }

  async resumeRecording(): Promise<void> {
    await Sound.resumeRecorder();
  }

  async stopRecording(): Promise<string> {
    const path = await Sound.stopRecorder();

    Sound.removeRecordBackListener();

    return path;
  }

  addRecordingListener(
    callback: (data: {
      currentPosition: number;
      currentMetering?: number;
    }) => void,
  ): void {
    Sound.addRecordBackListener(callback);
  }

  removeRecordingListener(): void {
    Sound.removeRecordBackListener();
  }

  // MARK: - Playback

  async startPlayback(path: string): Promise<void> {
    await Sound.startPlayer(path);
  }

  async pausePlayback(): Promise<void> {
    await Sound.pausePlayer();
  }

  async resumePlayback(): Promise<void> {
    await Sound.resumePlayer();
  }

  async stopPlayback(): Promise<void> {
    await Sound.stopPlayer();

    Sound.removePlayBackListener();
    Sound.removePlaybackEndListener();
  }

  addPlaybackListener(
    callback: (data: {
      currentPosition: number;
      duration: number;
    }) => void,
  ): void {
    Sound.addPlayBackListener(callback);
  }

  removePlaybackListener(): void {
    Sound.removePlayBackListener();
  }

  addPlaybackEndListener(
    callback: (data: unknown) => void,
  ): void {
    Sound.addPlaybackEndListener(callback);
  }

  removePlaybackEndListener(): void {
    Sound.removePlaybackEndListener();
  }
}

export default new AudioRecordingService();