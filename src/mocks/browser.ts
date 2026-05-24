import { setupWorker } from 'msw';
import { handlers } from './handlers-hu9-15';

export const worker = setupWorker(...handlers);