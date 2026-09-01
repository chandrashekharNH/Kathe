import {Story} from '../models/Story';
import {StoryRepository} from '../repositories/StoryRepository';

class SaveRecordedStoryUseCase {
  constructor(
    private readonly storyRepository: StoryRepository,
  ) {}

  async execute(story: Story): Promise<void> {
    await this.storyRepository.createStory(story);
  }
}

export default SaveRecordedStoryUseCase;