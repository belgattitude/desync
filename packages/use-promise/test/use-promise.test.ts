import { act, renderHook } from '@testing-library/react-hooks';
import { usePromise } from '../src';

describe('usePromise', () => {
  it('should load, return the promise response and rerender', async () => {
    const deps = { slug: 'b' };
    const expected = { value: 'cool' };
    type Deps = typeof deps;
    const callback = jest.fn();
    const promiseFn = async (deps: Deps) => {
      callback(deps);
      return expected;
    };

    const { result, waitForNextUpdate, rerender } = renderHook(() => usePromise(promiseFn, deps));
    // initial data
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.error).toBeNull();

    // resolved data
    await waitForNextUpdate();

    expect(callback).toHaveBeenCalledTimes(1);

    expect(result.current.data).toStrictEqual(expected);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.error).toBeNull();

    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.data).toStrictEqual(expected);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.error).toBeNull();
  });

  it('should set error when promise fails', async () => {
    const callback = jest.fn();
    const promiseFn = async () => {
      callback();
      throw new Error('cool');
    };

    const { result, waitForNextUpdate } = renderHook(() => usePromise(promiseFn, {}));
    // initial data
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.error).toBeNull();

    // resolved data
    await waitForNextUpdate();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.error?.message).toStrictEqual('cool');
  });

  it('should call the promise when forceReload is called', async () => {
    const callback = jest.fn();
    const promiseFn = async () => {
      callback();
    };

    const { result, waitForNextUpdate } = renderHook(() => usePromise(promiseFn, {}));
    // initial data
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.error).toBeNull();

    // resolved data
    await waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.reload();
    });

    await waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
