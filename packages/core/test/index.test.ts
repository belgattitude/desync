import { Result } from '../src';

describe('@desync/core', () => {
  it('should correctly import the Result package', async () => {
    expect(Result.ok({ username: 'Name' }).isError()).toBeFalsy();
  });
});
