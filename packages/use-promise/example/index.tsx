import React from 'react';

import { usePromise } from '../src';

const getSomething = async () => {
  return 'cool';
};

// @ts-ignore
const Comp: React.FC = () => {
  const { data, error, isLoading } = usePromise(getSomething, {});
  return (
    <div>
      {isLoading && <span>loading...</span>}
      {error && <span>{error.message}</span>}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};
