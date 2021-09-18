import { createNotifications } from '../create-notifications';

describe('createNotifications', () => {
  test('createNotifications', () => {
    const notifications = createNotifications();

    expect(notifications).toHaveProperty('info');
    expect(notifications).toHaveProperty('success');
    expect(notifications).toHaveProperty('warning');
    expect(notifications).toHaveProperty('error');
    expect(notifications).toHaveProperty('confirm');
  });
});
