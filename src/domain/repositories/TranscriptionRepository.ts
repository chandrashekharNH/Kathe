import {Transcript} from '../models/Transcript';

export interface TranscriptionRepository {
  transcribeAudio(
    storyId: string,
    audioPath: string,
  ): Promise<Transcript>;
}