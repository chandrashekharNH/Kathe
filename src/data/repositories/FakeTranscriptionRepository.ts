import {Transcript} from '../../domain/models/Transcript';

import {TranscriptionRepository} from '../../domain/repositories/TranscriptionRepository';

class FakeTranscriptionRepository
  implements TranscriptionRepository {

  async transcribeAudio(
    storyId: string,
    audioPath: string,
  ): Promise<Transcript> {

    console.log(
      'Fake transcription started',
    );

    console.log(
      'Story ID:',
      storyId,
    );

    console.log(
      'Audio path:',
      audioPath,
    );

    // --------------------------------------------------
    // Simulate transcription processing
    // --------------------------------------------------

    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    // --------------------------------------------------
    // Create Transcript
    // --------------------------------------------------

    const now =
      new Date().toISOString();

    const transcript: Transcript = {

      id: `transcript-${Date.now()}`,

      storyId: storyId,

      text:
        'This is a temporary transcript. ' +
        'Your recorded story will appear here ' +
        'after we connect the real speech-to-text service.',

      language: 'en',

      createdAt: now,

      updatedAt: now,

    };

    console.log(
      'Fake transcript created:',
      transcript,
    );

    return transcript;
  }
}

export default new FakeTranscriptionRepository();