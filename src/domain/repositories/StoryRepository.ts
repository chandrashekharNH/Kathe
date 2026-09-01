import {Story} from '../models/Story';

export interface StoryRepository {
  createStory(story: Story): Promise<void>;

  getStory(id: string): Promise<Story | null>;

  getStories(): Promise<Story[]>;

  updateStory(story: Story): Promise<void>;

  deleteStory(id: string): Promise<void>;
}