import {StoryRepository} from '../repositories/StoryRepository';

export class SaveRoughStoryUseCase {
  constructor(
    private readonly storyRepository: StoryRepository,
  ) {}

  async execute(
    storyId: string,
    roughStory: string,
  ): Promise<void> {

    const story =
      await this.storyRepository.getStory(
        storyId,
      );

    if (!story) {
      throw new Error(
        `Story not found: ${storyId}`,
      );
    }

    const updatedStory = {
      ...story,

      roughStory,

      status: 'transcriptReady' as const,

      updatedAt:
        new Date().toISOString(),
    };

    await this.storyRepository.updateStory(
      updatedStory,
    );
  }
}