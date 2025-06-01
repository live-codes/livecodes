import type { Notifications } from '../models';
import { createNotifications } from './create-notifications';

let notifications: Notifications | null = null;

export function getNotifications() {
  if (!notifications) {
    notifications = createNotifications();
  }
  return notifications;
}
