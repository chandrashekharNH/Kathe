import AsyncStorage from '@react-native-async-storage/async-storage';

import {Story} from '../../domain/models/Story';
import {StoryRepository} from '../../domain/repositories/StoryRepository';

const STORIES_KEY = '@kathe/stories';

class LocalStoryRepository implements StoryRepository {

  async createStory(story: Story): Promise<void> {
    const stories = await this.getStories();

    stories.push(story);

    await AsyncStorage.setItem(
      STORIES_KEY,
      JSON.stringify(stories),
    );
  }

  async getStory(id: string): Promise<Story | null> {
    const stories = await this.getStories();

    return stories.find(story => story.id === id) ?? null;
  }

  async getStories(): Promise<Story[]> {
    const data =
      await AsyncStorage.getItem(STORIES_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  async updateStory(story: Story): Promise<void> {
    const stories = await this.getStories();

    const updatedStories = stories.map(item =>
      item.id === story.id ? story : item,
    );

    await AsyncStorage.setItem(
      STORIES_KEY,
      JSON.stringify(updatedStories),
    );
  }

  async deleteStory(id: string): Promise<void> {
    const stories = await this.getStories();

    const updatedStories =
      stories.filter(story => story.id !== id);

    await AsyncStorage.setItem(
      STORIES_KEY,
      JSON.stringify(updatedStories),
    );
  }
}

export default new LocalStoryRepository();
