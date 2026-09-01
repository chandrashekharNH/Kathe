import {Story} from '../models/Story';
import {StoryRepository} from '../repositories/StoryRepository';

export class CreateStoryUseCase {

  constructor(
    private readonly storyRepository: StoryRepository,
  ) {}

  async execute(story: Story): Promise<void> {
    await this.storyRepository.createStory(story);
  }
}