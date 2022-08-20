import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { Code, UserData } from '../models';
import { broadcastScreen } from '../html';
import {
  getBroadcastBtn,
  getBroadcastChannelUrl,
  getBroadcastChannelUrlSection,
  getBroadcastForm,
  getBroadcastServerUrlInput,
  getBroadcastSourceCheckbox,
  getBroadcastStatusLabel,
} from './selectors';

export const createBroadcastUI = async ({
  modal,
  notifications,
  eventsManager,
  deps,
}: {
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  deps: {
    getBroadcastData: () => Promise<UserData['data']['broadcast'] | null>;
    setBroadcastData: (broadcastData: UserData['data']['broadcast']) => Promise<void>;
    getBroadcastStatus: () => boolean;
    setBroadcastStatus: (status: boolean) => void;
    broadcast: ({
      serverUrl,
      channel,
      broadcastSource,
    }: {
      serverUrl?: string | undefined;
      channel?: string | undefined;
      broadcastSource?: boolean | undefined;
    }) => Promise<
      | {
          channel: string;
          url: string;
        }
      | undefined
    >;
  };
}) => {
  const div = document.createElement('div');
  div.innerHTML = broadcastScreen;
  const broadcastContainer = div.firstChild as HTMLElement;
  modal.show(broadcastContainer);

  const broadcastStatusLabel = getBroadcastStatusLabel(broadcastContainer);
  const broadcastForm = getBroadcastForm(broadcastContainer);
  const broadcastServerUrlInput = getBroadcastServerUrlInput(broadcastContainer);
  const broadcastSourceCheckbox = getBroadcastSourceCheckbox(broadcastContainer);
  const broadcastBtn = getBroadcastBtn(broadcastContainer);
  const broadcastChannelUrlSection = getBroadcastChannelUrlSection(broadcastContainer);
  const broadcastChannelUrl = getBroadcastChannelUrl(broadcastContainer);

  let broadcastData = await deps.getBroadcastData();

  const updateBroadcastUI = () => {
    broadcastBtn.disabled = false;

    if (deps.getBroadcastStatus()) {
      broadcastStatusLabel.innerText = 'Broadcasting...';
      broadcastServerUrlInput.disabled = true;
      broadcastSourceCheckbox.disabled = true;
      broadcastBtn.innerText = 'Stop broadcast';
      if (broadcastData?.channelUrl) {
        broadcastChannelUrlSection.style.display = 'unset';
        broadcastChannelUrl.innerText = broadcastData.channelUrl;
        broadcastChannelUrl.href = broadcastData.channelUrl;
      }
    } else {
      broadcastStatusLabel.innerText = '';
      broadcastServerUrlInput.disabled = false;
      broadcastSourceCheckbox.disabled = false;
      broadcastBtn.innerText = 'Broadcast';
      broadcastChannelUrlSection.style.display = 'none';
    }
    if (broadcastData?.serverUrl) {
      broadcastServerUrlInput.value = broadcastData.serverUrl;
    }
  };
  updateBroadcastUI();

  eventsManager.addEventListener(broadcastForm, 'submit', async (ev) => {
    ev.preventDefault();

    if (deps.getBroadcastStatus()) {
      deps.setBroadcastStatus(false);
      updateBroadcastUI();
      return;
    }

    const serverUrl = broadcastServerUrlInput.value.trim();
    if (!serverUrl) {
      notifications.error('Server URL is required!');
      return;
    }

    broadcastBtn.disabled = true;
    broadcastBtn.innerText = 'Connecting...';

    const result = await deps.broadcast({
      serverUrl,
      channel: '', // do not use saved
      broadcastSource: broadcastSourceCheckbox.checked,
    });
    if (!result) {
      notifications.error('Broadcast failed!');
      updateBroadcastUI();
      return;
    }
    deps.setBroadcastStatus(true);
    broadcastData = {
      serverUrl,
      channel: result.channel,
      channelUrl: result.url,
      broadcastSource: broadcastSourceCheckbox.checked,
    };
    updateBroadcastUI();
    await deps.setBroadcastData(broadcastData);
    notifications.success('Broadcasting...');
  });
};
