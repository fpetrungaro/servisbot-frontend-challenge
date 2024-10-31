import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { workerReducer, fetchWorkersByBotName } from '@/store/workerSlice';

describe('Worker Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        workers: workerReducer,
      },
    });
  });

  it('should fetch workers by bot name successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: '1', name: 'Worker One' }]),
    });

    // Dispatch the fetchWorkersByBotName async thunk
    await store.dispatch(fetchWorkersByBotName('Bot One'));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the workers are populated in the state
    expect(state.workers.workers).toEqual([{ id: '1', name: 'Worker One' }]);
    expect(state.workers.loading).toBe(false);
    expect(state.workers.error).toBe(null);
  });

  it('should handle failed workers fetch by bot name', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to fetch workers' }),
    });

    // Dispatch the fetchWorkersByBotName async thunk
    await store.dispatch(fetchWorkersByBotName('Bot One'));

    // Get the state after dispatching the action
    const state = store.getState();

    // Check if the error is set in the state
    expect(state.workers.workers).toEqual([]);
    expect(state.workers.loading).toBe(false);
    expect(state.workers.error).toBe('Failed to fetch workers');
  });
});
