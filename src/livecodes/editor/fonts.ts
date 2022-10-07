import {
  fontAnonymousProUrl,
  fontCascadiaCodeUrl,
  fontComicMonoUrl,
  fontCourierPrimeUrl,
  fontDejaVuMonoUrl,
  fontFantasqueUrl,
  fontFiraCodeUrl,
  fontHackUrl,
  fontHermitUrl,
  fontIBMPlexMonoUrl,
  fontInconsolataUrl,
  fontIosevkaUrl,
  fontJetbrainsMonoUrl,
  fontMonoidUrl,
  fontNotoUrl,
  fontRobotoMonoUrl,
  fontSourceCodeProUrl,
  fontSpaceMonoUrl,
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
    id: 'cascadia-code',
    name: 'Cascadia Code',
    url: fontCascadiaCodeUrl,
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
    id: 'roboto-mono',
    name: 'Roboto Mono',
    url: fontRobotoMonoUrl,
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
    'Consolas, ui-monospace, "Ubuntu Mono", "Roboto Mono", "Courier New", monospace';
  if (!font) return defaultFonts;
  const fontName = fonts.find((f) => [f.id, f.name, f.label].includes(font))?.name;
  return fontName ? `"${fontName}", ${defaultFonts}` : defaultFonts;
};
