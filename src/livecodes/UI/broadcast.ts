/* eslint-disable import/no-internal-modules */
import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { AppData } from '../models';
import { broadcastScreen } from '../html';
import { broadcastService } from '../services/broadcast';
import {
  getBroadcastBtn,
  getBroadcastChannelUrl,
  getBroadcastChannelUrlSection,
  getBroadcastForm,
  getBroadcastServerUrlInput,
  getBroadcastSourceCheckbox,
  getBroadcastStatusLabel,
} from './selectors';

export interface BroadcastInfo {
  isBroadcasting: boolean;
  channel: string;
  channelUrl: string;
  channelToken: string;
  broadcastSource: boolean;
}
export type BroadcastData = BroadcastInfo & AppData['broadcast'];
export interface BroadcastResponseData {
  channel: string;
  channelUrl: string;
  channelToken?: string;
}
export interface BroadcastResponseError {
  error: string;
}

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
    getBroadcastData: () => BroadcastData | null;
    setBroadcastData: (broadcastData: BroadcastData) => void;
    broadcast: (
      broadcastData: Partial<BroadcastData>,
    ) => Promise<BroadcastResponseData | BroadcastResponseError | undefined>;
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

  let broadcastData = deps.getBroadcastData();

  const updateBroadcastUI = () => {
    broadcastBtn.disabled = false;
    broadcastData = deps.getBroadcastData();

    if (broadcastData?.isBroadcasting) {
      broadcastStatusLabel.innerText = 'Broadcasting...';
      broadcastServerUrlInput.disabled = true;
      broadcastSourceCheckbox.disabled = true;
      broadcastBtn.innerText = 'Stop broadcast';
      broadcastSourceCheckbox.checked = broadcastData?.broadcastSource === true;
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

    broadcastServerUrlInput.value =
      broadcastServerUrlInput.value.trim() || broadcastData?.serverUrl || broadcastService.getUrl();
  };
  updateBroadcastUI();

  eventsManager.addEventListener(broadcastForm, 'submit', async (ev) => {
    ev.preventDefault();

    broadcastData = deps.getBroadcastData();

    if (broadcastData?.isBroadcasting) {
      const url = broadcastData.serverUrl;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: broadcastData.channel,
          channelToken: broadcastData.channelToken,
          stop: true,
        }),
      }).catch(() => undefined);
      deps.setBroadcastData({
        isBroadcasting: false,
        channel: '',
        channelUrl: '',
        channelToken: '',
        broadcastSource: false,
        serverUrl: url,
      });
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
      channelToken: '', // do not use saved
      broadcastSource: broadcastSourceCheckbox.checked,
    });
    if (!result || 'error' in result) {
      notifications.error('Broadcast failed!');
      updateBroadcastUI();
      return;
    }

    deps.setBroadcastData({
      isBroadcasting: true,
      serverUrl,
      channel: result.channel,
      channelUrl: result.channelUrl,
      channelToken: result.channelToken || '',
      broadcastSource: broadcastSourceCheckbox.checked,
    });
    updateBroadcastUI();
    notifications.success('Broadcasting...');
  });
};
