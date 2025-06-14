import type { AppLanguage } from '../models';

export const appLanguages: { [key in Exclude<AppLanguage, 'auto'>]: string } = {
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  hi: 'हिंदी',
  it: 'Italiano',
  ja: '日本語',
  pt: 'Português',
  ru: 'Ру́сский',
  ur: 'اردو',
  'zh-CN': '中文（简体）',
};
