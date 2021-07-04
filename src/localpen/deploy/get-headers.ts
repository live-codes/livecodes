import { User } from '../models';

export const getHeaders = (user: User) => ({
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  Authorization: 'token ' + user.token,
});
