export type StoryStatus =
  | 'draft'
  | 'recording'
  | 'recorded'
  | 'transcribing'
  | 'transcriptReady'
  | 'analyzing'
  | 'storyBibleReady'
  | 'scenePlanReady'
  | 'generatingScreenplay'
  | 'completed'
  | 'failed';

export interface Story {
  id: string;

  title: string;

  audioPath: string | null;

  duration: number;

  roughStory: string | null;

  status: StoryStatus;

  createdAt: string;

  updatedAt: string;
}