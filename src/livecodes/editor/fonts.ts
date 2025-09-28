import {
  fontAnonymousProBaseUrl,
  fontAstigmataBaseUrl,
  fontCascadiaCodeBaseUrl,
  fontCodeNewRomanUrl,
  fontComicMonoBaseUrl,
  fontCourierPrimeBaseUrl,
  fontDECTerminalModernUrl,
  fontDejaVuMonoBaseUrl,
  fontFantasqueBaseUrl,
  fontFiraCodeBaseUrl,
  fontFixedsysUrl,
  fontHackBaseUrl,
  fontHermitBaseUrl,
  fontIBMPlexMonoUrl,
  fontInconsolataUrl,
  fontIosevkaBaseUrl,
  fontJetbrainsMonoBaseUrl,
  fontMenloUrl,
  fontMonaspaceBaseUrl,
  fontMonofurUrl,
  fontMonoidBaseUrl,
  fontNotoUrl,
  fontNovaMonoUrl,
  fontOpenDyslexicBaseUrl,
  fontProFontWindowsUrl,
  fontRobotoMonoBaseUrl,
  fontSFMonoUrl,
  fontSourceCodeProBaseUrl,
  fontSpaceMonoBaseUrl,
  fontSudoVarUrl,
  fontUbuntuMonoBaseUrl,
  fontVictorMonoBaseUrl,
} from '../vendors';

export interface Font {
  id: string;
  name: string;
  label?: string;
  url: string;
}

export const fonts: Font[] = [
  {
    id: 'anonymous-pro',
    name: 'Anonymous Pro',
    url: fontAnonymousProBaseUrl + 'index.css',
  },
  {
    id: 'astigmata',
    name: 'Astigmata',
    url: fontAstigmataBaseUrl + 'index.css',
  },
  {
    id: 'cascadia-code',
    name: 'Cascadia Code',
    url: fontCascadiaCodeBaseUrl + 'index.css',
  },
  {
    id: 'comic-mono',
    name: 'Code New Roman',
    url: fontCodeNewRomanUrl,
  },
  {
    id: 'comic-mono',
    name: 'Comic Mono',
    url: fontComicMonoBaseUrl + 'index.css',
  },
  {
    id: 'courier-prime',
    name: 'Courier Prime',
    url: fontCourierPrimeBaseUrl + 'index.css',
  },
  {
    id: 'dec-terminal-modern',
    name: 'DEC Terminal Modern',
    url: fontDECTerminalModernUrl,
  },
  {
    id: 'dejavu-mono',
    name: 'DejaVu Mono',
    url: fontDejaVuMonoBaseUrl + 'index.css',
  },
  {
    id: 'fantasque-sans-mono',
    name: 'TypoPRO Fantasque Sans Mono',
    label: 'Fantasque Sans Mono',
    url: fontFantasqueBaseUrl + 'TypoPRO-FantasqueSansMono.css',
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    url: fontFiraCodeBaseUrl + 'fira_code.css',
  },
  {
    id: 'fixedsys',
    name: 'Fixedsys 62',
    label: 'Fixedsys',
    url: fontFixedsysUrl,
  },
  {
    id: 'hack',
    name: 'Hack',
    url: fontHackBaseUrl + 'hack.css',
  },
  {
    id: 'hermit',
    name: 'Hermit',
    url: fontHermitBaseUrl + 'index.css',
  },
  {
    id: 'ibm-plex-mono',
    name: 'IBM Plex Mono',
    url: fontIBMPlexMonoUrl,
  },
  {
    id: 'inconsolata',
    name: 'Inconsolata',
    url: fontInconsolataUrl,
  },
  {
    id: 'iosevka',
    name: 'Iosevka',
    url: fontIosevkaBaseUrl + 'index.css',
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    url: fontJetbrainsMonoBaseUrl + 'index.css',
  },
  {
    id: 'menlo',
    name: 'Menlo',
    url: fontMenloUrl,
  },
  {
    id: 'monaspace-argon',
    name: 'Monaspace Argon',
    url: fontMonaspaceBaseUrl + 'argon.css',
  },
  {
    id: 'monaspace-krypton',
    name: 'Monaspace Krypton',
    url: fontMonaspaceBaseUrl + 'krypton.css',
  },
  {
    id: 'monaspace-neon',
    name: 'Monaspace Neon',
    url: fontMonaspaceBaseUrl + 'neon.css',
  },
  {
    id: 'monaspace-radon',
    name: 'Monaspace Radon',
    url: fontMonaspaceBaseUrl + 'radon.css',
  },
  {
    id: 'monaspace-xenon',
    name: 'Monaspace Xenon',
    url: fontMonaspaceBaseUrl + 'xenon.css',
  },
  {
    id: 'monofur',
    name: 'Monofur',
    url: fontMonofurUrl,
  },
  {
    id: 'monoid',
    name: 'TypoPRO Monoid',
    label: 'Monoid',
    url: fontMonoidBaseUrl + 'TypoPRO-Monoid.css',
  },
  {
    id: 'noto-sans-mono',
    name: 'Noto Sans Mono',
    url: fontNotoUrl,
  },
  {
    id: 'nova-mono',
    name: 'Nova Mono',
    url: fontNovaMonoUrl,
  },
  {
    id: 'opendyslexic',
    name: 'OpenDyslexic',
    url: fontOpenDyslexicBaseUrl + 'index.css',
  },
  {
    id: 'profontwindows',
    name: 'ProFontWindows',
    label: 'ProFont',
    url: fontProFontWindowsUrl,
  },
  {
    id: 'roboto-mono',
    name: 'Roboto Mono',
    url: fontRobotoMonoBaseUrl + 'index.css',
  },
  {
    id: 'sf-mono',
    name: 'SF Mono',
    url: fontSFMonoUrl,
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    url: fontSourceCodeProBaseUrl + 'index.css',
  },
  {
    id: 'space-mono',
    name: 'Space Mono',
    url: fontSpaceMonoBaseUrl + 'index.css',
  },
  {
    id: 'sudo-var',
    name: 'Sudo Var',
    url: fontSudoVarUrl,
  },
  {
    id: 'ubuntu-mono',
    name: 'Ubuntu Mono',
    url: fontUbuntuMonoBaseUrl + 'index.css',
  },
  {
    id: 'victor-mono',
    name: 'Victor Mono',
    url: fontVictorMonoBaseUrl + 'index.css',
  },
];

export const getFontFamily = (font: string | undefined) => {
  const defaultFonts =
    'Consolas, ' + // windows
    '"Roboto Mono", ' + // android
    '"Ubuntu Mono", ' + // ubuntu
    'ui-monospace, ' + // SF Mono on mac & ios
    'monospace';
  if (!font) return defaultFonts;
  const fontName = fonts.find((f) => [f.id, f.name, f.label].includes(font))?.name;
  return fontName ? `"${fontName}", ${defaultFonts}` : defaultFonts;
};
