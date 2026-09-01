import {Transcript} from '../models/Transcript';

import {TranscriptionRepository} from '../repositories/TranscriptionRepository';

export class TranscribeStoryUseCase {
  constructor(
    private readonly transcriptionRepository: TranscriptionRepository,
  ) {}

  async execute(
    storyId: string,
    audioPath: string,
  ): Promise<Transcript> {
    return await this.transcriptionRepository.transcribeAudio(
      storyId,
      audioPath,
    );
  }
}