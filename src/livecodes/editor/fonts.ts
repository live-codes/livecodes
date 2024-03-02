import {
  fontAnonymousProUrl,
  fontAstigmataUrl,
  fontCascadiaCodeUrl,
  fontCodeNewRomanUrl,
  fontComicMonoUrl,
  fontCourierPrimeUrl,
  fontDECTerminalModernUrl,
  fontDejaVuMonoUrl,
  fontFantasqueUrl,
  fontFiraCodeUrl,
  fontFixedsysUrl,
  fontHackUrl,
  fontHermitUrl,
  fontIBMPlexMonoUrl,
  fontInconsolataUrl,
  fontIosevkaUrl,
  fontJetbrainsMonoUrl,
  fontMenloUrl,
  fontMonaspaceBaseUrl,
  fontMonofurUrl,
  fontMonoidUrl,
  fontNotoUrl,
  fontNovaMonoUrl,
  fontOpenDyslexicUrl,
  fontProFontWindowsUrl,
  fontRobotoMonoUrl,
  fontSFMonoUrl,
  fontSourceCodeProUrl,
  fontSpaceMonoUrl,
  fontSudoVarUrl,
  fontUbuntuMonoUrl,
  fontVictorMonoUrl,
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
    url: fontAnonymousProUrl,
  },
  {
    id: 'astigmata',
    name: 'Astigmata',
    url: fontAstigmataUrl,
  },
  {
    id: 'cascadia-code',
    name: 'Cascadia Code',
    url: fontCascadiaCodeUrl,
  },
  {
    id: 'comic-mono',
    name: 'Code New Roman',
    url: fontCodeNewRomanUrl,
  },
  {
    id: 'comic-mono',
    name: 'Comic Mono',
    url: fontComicMonoUrl,
  },
  {
    id: 'courier-prime',
    name: 'Courier Prime',
    url: fontCourierPrimeUrl,
  },
  {
    id: 'dec-terminal-modern',
    name: 'DEC Terminal Modern',
    url: fontDECTerminalModernUrl,
  },
  {
    id: 'dejavu-mono',
    name: 'DejaVu Mono',
    url: fontDejaVuMonoUrl,
  },
  {
    id: 'fantasque-sans-mono',
    name: 'TypoPRO Fantasque Sans Mono',
    label: 'Fantasque Sans Mono',
    url: fontFantasqueUrl,
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    url: fontFiraCodeUrl,
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
    url: fontHackUrl,
  },
  {
    id: 'hermit',
    name: 'Hermit',
    url: fontHermitUrl,
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
    url: fontIosevkaUrl,
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    url: fontJetbrainsMonoUrl,
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
    url: fontMonoidUrl,
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
    url: fontOpenDyslexicUrl,
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
    url: fontRobotoMonoUrl,
  },
  {
    id: 'sf-mono',
    name: 'SF Mono',
    url: fontSFMonoUrl,
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    url: fontSourceCodeProUrl,
  },
  {
    id: 'space-mono',
    name: 'Space Mono',
    url: fontSpaceMonoUrl,
  },
  {
    id: 'sudo-var',
    name: 'Sudo Var',
    url: fontSudoVarUrl,
  },
  {
    id: 'ubuntu-mono',
    name: 'Ubuntu Mono',
    url: fontUbuntuMonoUrl,
  },
  {
    id: 'victor-mono',
    name: 'Victor Mono',
    url: fontVictorMonoUrl,
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
