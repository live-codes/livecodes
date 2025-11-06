import { defaultConfig } from '../../config/default-config';
import type { Config, FormatFn } from '../../models';
import { modulesService } from '../../services/modules';
import { pkgInfoService } from '../../services/pkgInfo';
import { prettierEsmUrl } from '../../vendors';

(self as any).createRippleFormatter = async (initialConfig: Config): Promise<FormatFn> => {
  const version =
    initialConfig.customSettings?.ripple?.version ||
    (await pkgInfoService.getPkgLatestVersion('ripple'));
  const pluginUrl =
    version.startsWith('pr:ripple@') || version.startsWith('pkg.pr.new:ripple@')
      ? modulesService.getModuleUrl(version.replace('ripple', '@ripple-ts/prettier-plugin'))
      : modulesService.getModuleUrl('@ripple-ts/prettier-plugin@' + version);

  const [prettier, ripplePlugin] = await Promise.all([import(prettierEsmUrl), import(pluginUrl)]);
  return async (code, cursorOffset, formatterConfig) =>
    prettier.formatWithCursor(code, {
      parser: 'ripple',
      plugins: [ripplePlugin],
      cursorOffset,
      useTabs: formatterConfig?.useTabs ?? defaultConfig.useTabs,
      tabWidth: formatterConfig?.tabSize ?? defaultConfig.tabSize,
      semi: formatterConfig?.semicolons ?? defaultConfig.semicolons,
      singleQuote: formatterConfig?.singleQuote ?? defaultConfig.singleQuote,
      trailingComma: formatterConfig?.trailingComma === false ? 'none' : 'all',
    });
};
