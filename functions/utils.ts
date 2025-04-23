import { decompress } from './vendors/compression';
import { starterTemplates } from './vendors/templates';

interface ProjectInfo {
  title?: string;
  description?: string;
}

const isCompressedCode = (url: string) => url.startsWith('code/');

const importCompressedCode = (url: string) => {
  const code = url.slice(5);
  let config: ProjectInfo;
  try {
    config = JSON.parse(decompress(code) || '{}');
  } catch (error) {
    config = {};
  }
  return config;
};

const isProjectId = (url: string) => url.startsWith('id/');

const importProject = async (url: string): Promise<ProjectInfo> => {
  const id = url.slice(3);
  const apiUrl =
    id.length < 11
      ? 'https://dpaste.com/' + id + '.txt' // for backward compatibility
      : 'https://api2.livecodes.io/share?id=' + id;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return {};
    return JSON.parse(await res.text());
  } catch (error) {
    return {};
  }
};

export const getProjectInfo = async (url: URL): Promise<ProjectInfo> => {
  const imports = url.searchParams.get('x') || url.hash.slice(1);
  if (isCompressedCode(imports)) {
    const config = importCompressedCode(imports);
    return {
      title: config.title || '',
      description: config.description || '',
    };
  }
  if (isProjectId(imports)) {
    const config = await importProject(imports);
    return {
      title: config.title || '',
      description: config.description || '',
    };
  }
  const template = url.searchParams.get('template');
  const templateName = template ? starterTemplates.find((t) => t.name === template)?.title : '';
  if (templateName) {
    return {
      title: templateName,
      description: templateName + ' Template on LiveCodes',
    };
  }
  return {
    title: '',
    description: '',
  };
};
