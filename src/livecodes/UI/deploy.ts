import type {
  Config,
  ContentConfig,
  Cache,
  Modal,
  Notifications,
  User,
  EventsManager,
} from '../models';
import type {
  getLanguageCompiler as getLanguageCompilerFn,
  getLanguageExtension as getLanguageExtensionFn,
} from '../languages';
import { deployScreen, resultTemplate } from '../html';
import { autoCompleteUrl } from '../vendors';
import { deploy, deployFile, deployedConfirmation } from '../deploy/deploy';
import { getUserRepos } from '../services/github';
import { generateQrCode } from './qrcode';
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

export { deployFile };

const createDeployContainer = (eventsManager: EventsManager, repo: string | undefined) => {
  const div = document.createElement('div');
  div.innerHTML = deployScreen;
  const deployContainer = div.firstChild as HTMLElement;

  const tabs = deployContainer.querySelectorAll<HTMLElement>('#deploy-tabs li');
  tabs.forEach((tab) => {
    const link = tab.querySelector('a');
    if (!link) return;
    eventsManager.addEventListener(tab, 'click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('#deploy-screens > div').forEach((screen) => {
        screen.classList.remove('active');
      });
      const target = deployContainer.querySelector('#' + link.dataset.target);
      target?.classList.add('active');
      target?.querySelector('input')?.focus();
    });
  });

  if (repo) {
    setTimeout(() => {
      tabs[1].click();
      const existingRepoNameInput = getExistingRepoNameInput(deployContainer);
      const existingRepoMessageInput = getExistingRepoMessageInput(deployContainer);
      existingRepoNameInput.value = repo;
      existingRepoMessageInput.focus();
    });
  }

  return deployContainer;
};

export const createDeployUI = async ({
  modal,
  notifications,
  eventsManager,
  user,
  deployRepo,
  deps,
}: {
  modal: Modal;
  notifications: Notifications;
  eventsManager: EventsManager;
  user: User;
  deployRepo: string | undefined;
  deps: {
    getResultPage: (_: {
      forExport: boolean;
      template: string;
      singleFile: boolean;
    }) => Promise<string>;
    getCache: () => Cache;
    getConfig: () => Config;
    getContentConfig: (config: Config | ContentConfig) => ContentConfig;
    getLanguageExtension: typeof getLanguageExtensionFn;
    getLanguageCompiler: typeof getLanguageCompilerFn;
    setProjectDeployRepo: (repo: string) => Promise<void>;
  };
}) => {
  const deployContainer = createDeployContainer(eventsManager, deployRepo);

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
    const scriptType = deps.getLanguageCompiler(deps.getConfig().script.language)?.scriptType;
    const singleFile = scriptType != null && scriptType !== 'module';
    newRepoNameError.innerHTML = '';

    const resultHtml = await deps.getResultPage({
      forExport,
      template: resultTemplate,
      singleFile,
    });
    const cache = deps.getCache();
    const deployResult = await deploy({
      user,
      repo,
      config: deps.getContentConfig(deps.getConfig()),
      content: {
        resultPage: resultHtml,
        style: cache.style.compiled || '',
        script: cache.script.compiled || '',
      },
      message,
      commitSource,
      singleFile,
      newRepo,
      deps: { getLanguageExtension: deps.getLanguageExtension },
    }).catch((error: any) => {
      if (error.message === 'Repo name already exists') {
        newRepoNameError.innerHTML = window.deps.translateString(
          'deploy.error.repoNameExists',
          'Repo name already exists',
        );
      }
    });

    if (newRepoNameError.innerHTML !== '') {
      return false;
    } else if (deployResult) {
      await deps.setProjectDeployRepo(repo);
      const confirmationContainer = deployedConfirmation(deployResult, commitSource);
      modal.show(confirmationContainer, { size: 'small' });
      await generateQrCode({
        container: confirmationContainer.querySelector('#deploy-qrcode') as HTMLElement,
        url: deployResult.url,
        title: repo,
      });
      return true;
    } else {
      modal.close();
      notifications.error(
        window.deps.translateString('deploy.error.generic', 'Deployment failed!'),
      );
      return true;
    }
  };

  eventsManager.addEventListener(newRepoForm, 'submit', async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = newRepoNameInput.value.replace(/[^A-Za-z0-9_.-]/g, '-');
    const message = newRepoMessageInput.value;
    const commitSource = newRepoCommitSource.checked;
    const newRepo = true;
    if (!name) {
      notifications.error(
        window.deps.translateString('deploy.error.repoNameRequired', 'Repo name is required'),
      );
      return;
    }

    newRepoButton.innerHTML = window.deps.translateString(
      'deploy.generic.deploying',
      'Deploying...',
    );
    newRepoButton.disabled = true;

    const result = await publish(user, name, message, commitSource, newRepo);
    if (!result) {
      newRepoButton.innerHTML = window.deps.translateString('deploy.generic.deployBtn', 'Deploy');
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
      notifications.error(
        window.deps.translateString('deploy.error.repoNameRequired', 'Repo name is required'),
      );
      return;
    }

    existingRepoButton.innerHTML = window.deps.translateString(
      'deploy.generic.deploying',
      'Deploying...',
    );
    existingRepoButton.disabled = true;

    await publish(user, name, message, commitSource, newRepo);
  });

  modal.show(deployContainer, { isAsync: true, autoFocus: false });
  newRepoNameInput.focus();

  if (!user) return;

  if (!(globalThis as any).autoComplete) {
    await import(autoCompleteUrl);
  }
  const autoComplete = (globalThis as any).autoComplete;

  const publicRepos = await getUserRepos(user);

  eventsManager.addEventListener(existingRepoNameInput, 'init', () => {
    if (!deployRepo) {
      existingRepoNameInput.focus();
    }
  });

  const inputSelector = '#' + existingRepoNameInput.id;
  if (!document.querySelector(inputSelector)) return;
  const autoCompleteJS = new autoComplete({
    selector: inputSelector,
    placeHolder: window.deps.translateString('deploy.searchRepo', 'Search your public repos...'),
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
};
