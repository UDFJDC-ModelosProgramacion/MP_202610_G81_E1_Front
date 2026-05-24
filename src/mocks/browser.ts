import { setupWorker } from 'msw';
import { handlers } from './handlers-hu09-15';

export const worker = setupWorker(...handlers);