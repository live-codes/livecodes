import type { AppLanguage } from '../models';

export const appLanguages: { [key in Exclude<AppLanguage, 'auto'>]: string } = {
  ar: 'العربية',
  bn: 'বাংলা',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fa: 'فارسی',
  fr: 'Français',
  hi: 'हिंदी',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  ja: '日本語',
  nl: 'Nederlands',
  pt: 'Português',
  ru: 'Ру́сский',
  tr: 'Türkçe',
  ur: 'اردو',
  'zh-CN': '中文（简体）',
};
