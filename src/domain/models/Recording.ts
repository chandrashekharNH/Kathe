export type RecordingStatus =
  | 'idle'
  | 'recording'
  | 'paused'
  | 'completed';

export interface Recording {
  filePath: string | null;
  duration: number;
  status: RecordingStatus;
}