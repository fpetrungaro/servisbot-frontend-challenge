import { createWrapper } from 'next-redux-wrapper';
import { makeStore, AppStore } from '@/store';

describe('Redux Store', () => {
  it('should be configured correctly', () => {
    const store = makeStore();

    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  it('should have the correct reducers', () => {
    const store = makeStore();

    const state = store.getState();

    expect(state.bots).toBeDefined();
    expect(state.workers).toBeDefined();
    expect(state.logs).toBeDefined();
  });

  it('should be wrapped correctly with next-redux-wrapper', () => {
    const wrapper = createWrapper<AppStore>(makeStore);

    expect(wrapper).toBeDefined();
    expect(wrapper.withRedux).toBeDefined();
    expect(wrapper.withRedux).toBeInstanceOf(Function);
  });
});
