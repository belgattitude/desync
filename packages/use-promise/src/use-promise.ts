import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useDeepCompareMemoize } from '@desync/use-deep-compare-memoize';

export type AsyncFunctionParams<TParams> = TParams;

export type AsyncFunctionWithParams<TResult, TParams extends object> = (variables: TParams) => Promise<TResult>;
export type AsyncFunctionWithoutParams<TResult> = () => Promise<TResult>;
export type AsyncFunction<TResult, TParams extends object = {}> =
  | AsyncFunctionWithParams<TResult, TParams>
  | AsyncFunctionWithoutParams<TResult>;

export interface UsePromiseOptions<TResult> {
  initialData?: TResult;
  /*
  manual?: boolean;
  retry?: boolean | number;
  retryDelay?: (retryAttempt: number) => number;
  staleTime?: number;
  cacheTime?: number;
  refetchInterval?: false | number;
  refetchIntervalInBackground?: boolean;
  refetchOnWindowFocus?: boolean;
  onError?: (err: any) => void;
  onSuccess?: (data: TResult) => void;
  suspense?: boolean;
  initialData?: TResult;
  */
}

const emptyParams = {};

export function usePromise<TResult, TVariables extends object = {}>(
  promise: AsyncFunction<TResult, TVariables>,
  params: AsyncFunctionParams<TVariables>,
  options?: UsePromiseOptions<TResult>
) {
  const immediate = true;

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TResult | null>(options?.initialData ?? null);
  const [force, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const mounted = useRef<boolean>(true);

  const memoizedParams = useDeepCompareMemoize(params ?? emptyParams);

  const promiseFn = useCallback(() => {
    if (mounted.current) {
      setLoading(true);
      setData(null);
      setError(null);
    }
    return promise(params)
      .then((response) => {
        if (mounted.current) {
          setData(response);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (mounted.current) {
          setError(error);
          setLoading(false);
        }
      });
    // Caution: keep exhaustive deps off here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promise, memoizedParams]);

  useEffect(() => {
    mounted.current = true;
    if (immediate) {
      promiseFn();
    }
    return () => {
      // Loading cannot be safely determined here
      // abort should be a no-op anyway
      // abortController.abort();
      mounted.current = false;
    };
  }, [force, promiseFn, immediate]);

  const reload = useCallback(() => {
    forceUpdate();
  }, []);

  return { data, isLoading: loading, error, reload };
}
