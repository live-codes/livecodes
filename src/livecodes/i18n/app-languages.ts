import type { AppLanguage } from '../models';

export const appLanguages: { [key in Exclude<AppLanguage, 'auto'>]: string } = {
  en: 'English',
  'zh-CN': '中文（简体）',
  // ar: 'العربية',
};
