import { User } from '../models';

export const getGithubHeaders = (user: User) => ({
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  Authorization: 'token ' + user.token,
});
