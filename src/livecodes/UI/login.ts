import type { createEventsManager } from '../events';
import { loginScreen } from '../html';
import type { GithubScope, User } from '../models';
import { getLoginLink, getLogoutLink } from './selectors';

export const createLoginContainer = (
  eventsManager: ReturnType<typeof createEventsManager>,
  loginCallback: (scopes: GithubScope[]) => void,
) => {
  const div = document.createElement('div');
  div.innerHTML = loginScreen;
  const loginContainer = div.firstChild as HTMLElement;

  const reposCheckBox = loginContainer.querySelector('#public_repo') as HTMLInputElement;
  const privateReposCheckBox = loginContainer.querySelector('#repo') as HTMLInputElement;
  const gistsCheckBox = loginContainer.querySelector('#gist') as HTMLInputElement;
  const loginButton = loginContainer.querySelector('#login-btn') as HTMLButtonElement;

  eventsManager.addEventListener(
    reposCheckBox,
    'change',
    () => {
      privateReposCheckBox.checked = reposCheckBox.checked;
    },
    false,
  );

  eventsManager.addEventListener(
    privateReposCheckBox,
    'change',
    () => {
      if (privateReposCheckBox.checked) {
        reposCheckBox.checked = true;
      }
    },
    false,
  );

  eventsManager.addEventListener(
    loginButton,
    'click',
    () => {
      const scopes = [
        ...(reposCheckBox.checked && !privateReposCheckBox.checked
          ? [reposCheckBox.value as GithubScope]
          : []),
        ...(privateReposCheckBox.checked ? [privateReposCheckBox.value as GithubScope] : []),
        ...(gistsCheckBox.checked ? [gistsCheckBox.value as GithubScope] : []),
      ];
      loginCallback(scopes);
    },
    false,
  );

  return loginContainer;
};

export const displayLoggedIn = (user: User) => {
  const loginLink = getLoginLink();
  if (loginLink) {
    loginLink.style.display = 'none';
  }
  const logOutLink = getLogoutLink();
  if (logOutLink) {
    const displayName = user.displayName || user.username;
    logOutLink.innerHTML = `Log out`;
    logOutLink.classList.add('hint--bottom');
    logOutLink.dataset.hint = 'Logged in as ' + displayName;
    logOutLink.style.display = 'block';
  }
};

export const displayLoggedOut = () => {
  const loginLink = getLoginLink();
  if (loginLink) {
    loginLink.style.display = 'block';
  }
  const logOutLink = getLogoutLink();
  if (logOutLink) {
    logOutLink.innerHTML = 'Log out';
    logOutLink.style.display = 'none';
  }
};
