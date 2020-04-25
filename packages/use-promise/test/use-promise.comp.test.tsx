import React from 'react';
import { render, act } from '@testing-library/react';
import { usePromise } from '../src';

describe('usePromise usage', () => {
  describe('React.FC usage', () => {
    type Params = { query: string };
    type LoaderPromise = (params: Params) => Promise<string>;
    type Props = {
      asyncFn: LoaderPromise;
      params: Params;
    };
    const MyComp: React.FC<Props> = ({ asyncFn, params }) => {
      const { data } = usePromise(asyncFn, params);
      return <div data-testid={'content'}>{data}</div>;
    };

    it('should conditionally call the promise based on deps changes', async () => {
      // Arrange
      const promise = Promise.resolve();
      const handleLoading = jest.fn(() => promise);
      const loadData = async (deps: Params) => {
        await handleLoading();
        return deps.query;
      };

      // Act & Assert

      const { getByTestId, rerender } = render(<MyComp asyncFn={loadData} params={{ query: 'query1' }} />);
      await act(() => promise);
      expect(getByTestId('content').textContent).toBe('query1');
      expect(handleLoading).toHaveBeenCalledTimes(1);

      // 1. Promise should be called on deps changes
      rerender(<MyComp asyncFn={loadData} params={{ query: 'query2' }} />);
      await act(() => promise);
      expect(getByTestId('content').textContent).toBe('query2');
      expect(handleLoading).toHaveBeenCalledTimes(2);

      // 2. Promise should not be called if deps have not changed
      rerender(<MyComp asyncFn={loadData} params={{ query: 'query2' }} />);
      await act(() => promise);
      expect(getByTestId('content').textContent).toBe('query2');
      expect(handleLoading).toHaveBeenCalledTimes(2);
    });

    it('should call the promise if changed', async () => {
      // Arrange
      const promise = Promise.resolve();
      const handleLoading1 = jest.fn(() => promise);
      const handleLoading2 = jest.fn(() => promise);
      const loadData1 = async (deps: Params) => {
        await handleLoading1();
        return deps.query;
      };
      const loadData2 = async (deps: Params) => {
        await handleLoading2();
        return deps.query;
      };

      // Act & Assert
      const { rerender } = render(<MyComp asyncFn={loadData1} params={{ query: 'q' }} />);
      await act(() => promise);
      expect(handleLoading1).toHaveBeenCalledTimes(1);
      expect(handleLoading2).toHaveBeenCalledTimes(0);

      rerender(<MyComp asyncFn={loadData2} params={{ query: 'q' }} />);
      await act(() => promise);
      expect(handleLoading1).toHaveBeenCalledTimes(1);
      expect(handleLoading2).toHaveBeenCalledTimes(1);

      rerender(<MyComp asyncFn={loadData1} params={{ query: 'q' }} />);
      await act(() => promise);
      expect(handleLoading1).toHaveBeenCalledTimes(2);
      expect(handleLoading2).toHaveBeenCalledTimes(1);
    });
  });
});
