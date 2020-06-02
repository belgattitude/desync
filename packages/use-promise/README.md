# usePromise

[![Stable Release](https://img.shields.io/npm/v/@desync/use-promise.svg)](https://npm.im/@desync/use-promise) [![gzip size](https://img.badgesize.io/https://unpkg.com/@desync/use-promise@latest/dist/use-promise.umd.production.min.js?compression=gzip)](https://unpkg.com/@desync/use-promise@latest/dist/use-promise.umd.production.min.js) [![codecov](https://codecov.io/gh/belgattitude/desync/branch/master/graph/badge.svg?flag=usePromise)](https://codecov.io/gh/belgattitude/desync)

React hook for promise consumption.

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
