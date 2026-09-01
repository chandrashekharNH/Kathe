import LocalStoryRepository from '../data/repositories/LocalStoryRepository';

import FakeTranscriptionRepository from '../data/repositories/FakeTranscriptionRepository';

import SaveRecordedStoryUseCase from '../domain/useCases/SaveRecordedStoryUseCase';

import {TranscribeStoryUseCase} from '../domain/useCases/TranscribeStoryUseCase';

import {
  SaveRoughStoryUseCase,
} from '../domain/useCases/SaveRoughStoryUseCase';

export const saveRecordedStoryUseCase =
  new SaveRecordedStoryUseCase(
    LocalStoryRepository,
  );

export const transcribeStoryUseCase =
  new TranscribeStoryUseCase(
    FakeTranscriptionRepository,
  );

   export const saveRoughStoryUseCase =
  new SaveRoughStoryUseCase(
    LocalStoryRepository,
  );