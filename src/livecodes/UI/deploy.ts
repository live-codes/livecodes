import type { createEventsManager } from '../events';
import type { createModal } from '../modal';
import type { createNotifications } from '../notifications';
import type { Config, ContentConfig, Cache, User } from '../models';
import { deployScreen, resultTemplate } from '../html';
import { autoCompleteUrl } from '../vendors';
import { deploy, deployedConfirmation, getUserPublicRepos } from '../deploy';
import {
  getExistingRepoButton,
  getExistingRepoCommitSource,
  getExistingRepoForm,
  getExistingRepoMessageInput,
  getExistingRepoNameInput,
  getNewRepoButton,
  getNewRepoCommitSource,
  getNewRepoForm,
  getNewRepoMessageInput,
  getNewRepoNameError,
  getNewRepoNameInput,
} from './selectors';

const createDeployContainer = (eventsManager: ReturnType<typeof createEventsManager>) => {
  const div = document.createElement('div');
  div.innerHTML = deployScreen;
  const deployContainer = div.firstChild as HTMLElement;

  const tabs = deployContainer.querySelectorAll<HTMLElement>('#deploy-tabs li');
  tabs.forEach((tab) => {
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#deploy-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = deployContainer.querySelector('#' + tab.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  return deployContainer;
};

export const createDeployUI = async ({
  modal,
  notifications,
  eventsManager,
  user,
  getResultPage,
  getCache,
  getConfig,
  getContentConfig,
}: {
  modal: ReturnType<typeof createModal>;
  notifications: ReturnType<typeof createNotifications>;
  eventsManager: ReturnType<typeof createEventsManager>;
  user: User;
  getResultPage: (_: {
    forExport: boolean;
    template: string;
    singleFile: boolean;
  }) => Promise<string>;
  getCache: () => Cache;
  getConfig: () => Config;
  getContentConfig: (config: Config | ContentConfig) => ContentConfig;
}) => {
  const deployContainer = createDeployContainer(eventsManager);

  const newRepoForm = getNewRepoForm(deployContainer);
  const newRepoButton = getNewRepoButton(deployContainer);
  const newRepoNameInput = getNewRepoNameInput(deployContainer);
  const newRepoNameError = getNewRepoNameError(deployContainer);
  const newRepoMessageInput = getNewRepoMessageInput(deployContainer);
  const newRepoCommitSource = getNewRepoCommitSource(deployContainer);
  const existingRepoForm = getExistingRepoForm(deployContainer);
  const existingRepoButton = getExistingRepoButton(deployContainer);
  const existingRepoNameInput = getExistingRepoNameInput(deployContainer);
  const existingRepoMessageInput = getExistingRepoMessageInput(deployContainer);
  const existingRepoCommitSource = getExistingRepoCommitSource(deployContainer);

  const publish = async (
    user: User,
    repo: string,
    message: string,
    commitSource: boolean,
    newRepo: boolean,
  ) => {
    const forExport = true;
    const singleFile = false;
    newRepoNameError.innerHTML = '';

    const resultHtml = await getResultPage({
      forExport,
      template: resultTemplate,
      singleFile,
    });
    const cache = getCache();
    const deployResult = await deploy({
      user,
      repo,
      config: getContentConfig(getConfig()),
      content: {
        resultPage: resultHtml,
        style: cache.style.compiled || '',
        script: cache.script.compiled || '',
      },
      message,
      commitSource,
      singleFile,
      newRepo,
    }).catch((error) => {
      if (error.message === 'Repo name already exists') {
        newRepoNameError.innerHTML = error.message;
      }
    });

    if (newRepoNameError.innerHTML !== '') {
      return false;
    } else if (deployResult) {
      const confirmationContianer = deployedConfirmation(deployResult, commitSource);
      modal.show(confirmationContianer, { size: 'small', closeButton: true });
      return true;
    } else {
      modal.close();
      notifications.error('Deployment failed!');
      return true;
    }
  };

  eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = newRepoNameInput.value;
    const message = newRepoMessageInput.value;
    const commitSource = newRepoCommitSource.checked;
    const newRepo = true;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    newRepoButton.innerHTML = 'Deploying...';
    newRepoButton.disabled = true;

    const result = await publish(user, name, message, commitSource, newRepo);
    if (!result) {
      newRepoButton.innerHTML = 'Deploy';
      newRepoButton.disabled = false;
    }
  });

  eventsManager.addEventListener(existingRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = existingRepoNameInput.value;
    const message = existingRepoMessageInput.value;
    const commitSource = existingRepoCommitSource.checked;
    const newRepo = false;
    if (!name) {
      notifications.error('Repo name is required');
      return;
    }

    existingRepoButton.innerHTML = 'Deploying...';
    existingRepoButton.disabled = true;

    await publish(user, name, message, commitSource, newRepo);
  });

  let autoComplete: any;
  import(autoCompleteUrl).then(async () => {
    autoComplete = (globalThis as any).autoComplete;

    if (!user) return;
    const publicRepos = await getUserPublicRepos(user);

    eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
      existingRepoNameInput.focus();
    });

    const inputSelector = '#' + existingRepoNameInput.id;
    if (!document.querySelector(inputSelector)) return;
    const autoCompleteJS = new autoComplete({
      selector: inputSelector,
      placeHolder: 'Search your public repos...',
      data: {
        src: publicRepos,
      },
      resultItem: {
        highlight: {
          render: true,
        },
      },
    });

    eventsManager.addEventListener(autoCompleteJS.input, 'selection', function (event: any) {
      const feedback = event.detail;
      autoCompleteJS.input.blur();
      const selection = feedback.selection.value;
      autoCompleteJS.input.value = selection;
    });
  });

  modal.show(deployContainer, { isAsync: true });
  newRepoNameInput.focus();
};
