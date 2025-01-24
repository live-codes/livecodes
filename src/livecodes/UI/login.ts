import { loginScreen } from '../html';
import type { EventsManager, GithubScope, User } from '../models';
import { getLoginLink, getLogoutLink } from './selectors';

export const createLoginContainer = (
  eventsManager: EventsManager,
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
  const logOutText = logOutLink?.querySelector('span');
  if (logOutLink && logOutText) {
    const displayName = user.displayName || user.username;
    logOutText.innerHTML = window.deps.translateString('login.logout', 'Log out');
    logOutLink.title = window.deps.translateString('login.loginAs', 'Logged in as {{name}}', {
      name: displayName!,
    });
    logOutLink.style.display = 'flex';
  }
};

export const displayLoggedOut = () => {
  const loginLink = getLoginLink();
  if (loginLink) {
    loginLink.style.display = 'flex';
  }
  const logOutLink = getLogoutLink();
  const logOutText = logOutLink?.querySelector('span');
  if (logOutLink && logOutText) {
    logOutText.innerHTML = window.deps.translateString('login.logout', 'Log out');
    logOutLink.style.display = 'none';
  }
};
