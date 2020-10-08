# usePromise

[![Stable Release](https://img.shields.io/npm/v/@desync/use-promise.svg)](https://npm.im/@desync/use-promise)
[![codecov](https://codecov.io/gh/belgattitude/desync/branch/master/graph/badge.svg?flag=useDeepCompareMemoize)](https://codecov.io/gh/belgattitude/desync)
![npm](https://img.shields.io/npm/dt/@desync/use-promise)
[![gzip size](https://badgen.net/bundlephobia/minzip/@desync/use-promise)](https://bundlephobia.com/result?p=@desync/use-promise)
![NPM](https://img.shields.io/npm/l/@desync/use-promise)

Simple hook to call a promise

```
$ yarn add @desync/use-promise
```

Usage:

```tsx
import ky from 'ky';
import { usePromise } from '@desync/use-promise';

type User = {
  userId: number;
  name: string;
  username: string;
  email: string;
};

const loadUsers = async (): Promise<User[]> => {
  return ky
    .get('https://jsonplaceholder.typicode.com/users', {
      credentials: 'include',
    })
    .json<User[]>();
};

const UserList: React.FC = () => {
  const { data, error, isLoading } = usePromise(loadUsers, {});
  return (
    <div>
      {isLoading && <span>loading...</span>}
      {error && <span>{error.message}</span>}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};
```

### Codesandbox

https://codesandbox.io/s/reverent-architecture-r5c11
