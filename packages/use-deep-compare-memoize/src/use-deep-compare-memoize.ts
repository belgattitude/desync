import { default as deepEqual } from 'dequal';
import { useRef } from 'react';

type SupportedValue = string | boolean | object | null;

export function useDeepCompareMemoize(value: SupportedValue): SupportedValue {
  const ref = useRef<SupportedValue>(null);
  if (value !== ref && !deepEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}
