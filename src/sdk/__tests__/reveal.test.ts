import { createPlayground } from '../index';
import { LiveCodes } from '../reveal';

function expectIframeDefaultStyle(iframe: HTMLIFrameElement | null) {
  expect(iframe?.style.maxWidth).toBe('100%');
  expect(iframe?.style.maxHeight).toBe('100%');
}

function expectCreatePlaygroundAndSdkFn(sdkReady: jest.MockedFunction<() => void>) {
  expect(createPlayground).toHaveBeenCalledTimes(1);
  expect(sdkReady).toHaveBeenCalledTimes(1);
}

function createContainer(config: string = "") {
  const container = document.createElement('div');
  container.dataset.livecodes = '';
  if (config.length > 0) container.dataset.config = config;
  document.body.appendChild(container);
}

function getIframe() {
  return document.querySelector<HTMLIFrameElement>('.livecodes');
}

jest.mock('../index', () => ({
  createPlayground: jest.fn().mockImplementation((container) => {
    const iframe = document.createElement('iframe');
    iframe.className = 'livecodes';
    container.appendChild(iframe);
    return Promise.resolve({ playground: 'mocked' });
  }),
}));

beforeEach(() => {
  document.body.innerHTML = '';
  jest.clearAllMocks();
});

test('should do nothing when no [data-livecodes] element exists', async () => {
  const mockDeck = { getConfig: jest.fn().mockReturnValue({ livecodes: {} }) } as any;
  LiveCodes.init(mockDeck);
  expect(createPlayground).not.toHaveBeenCalled();
});

test('should initializes playground and triggers sdkReady when a livecodes container with all configs exists', async () => {
  const sdkReady = jest.fn();
  createContainer('{"config":{"script":{"language":"javascript","content":"console.log(123)"}}}');
  const mockDeck = {
    getConfig: jest.fn().mockReturnValue({
      livecodes: {
        config: { script: { language: 'javascript', content: 'console.log(456)' } },
        sdkReady,
      },
      customStyle: { backgroundColor: 'rgba(255,255,255,0.1)' },
    }),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expectCreatePlaygroundAndSdkFn(sdkReady);
  const calledWith = (createPlayground as jest.Mock).mock.calls[0][1];
  const iframe = getIframe();
  expect(calledWith.config.script.language).toBe('javascript');
  expect(calledWith.config.script.content).toBe('console.log(123)');
  expectIframeDefaultStyle(iframe);
  expect(iframe?.style.backgroundColor).toBe('rgba(255, 255, 255, 0.1)');
});

test('should initializes playground and triggers sdkReady when a livecodes container with global config exists', async () => {
  const sdkReady = jest.fn();
  createContainer();
  const mockDeck = {
    getConfig: jest.fn().mockReturnValue({
      livecodes: {
        config: { script: { language: 'javascript', content: 'console.log(456)' } },
        sdkReady,
      },
      customStyle: { backgroundColor: 'rgba(255,255,255,0.1)' },
    }),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expectCreatePlaygroundAndSdkFn(sdkReady);
  const calledWith = (createPlayground as jest.Mock).mock.calls[0][1];
  const iframe = getIframe();
  expect(calledWith.config.script.language).toBe('javascript');
  expect(calledWith.config.script.content).toBe('console.log(456)');
  expectIframeDefaultStyle(iframe);
  expect(iframe?.style.backgroundColor).toBe('rgba(255, 255, 255, 0.1)');
});

test('should initializes playground and triggers sdkReady when a livecodes container with custom config exists', async () => {
  createContainer('{"config":{"script":{"language":"javascript","content":"console.log(123)"}}}');
  const mockDeck = {
    getConfig: jest.fn().mockReturnValue({}),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expect(createPlayground).toHaveBeenCalledTimes(1);
  const calledWith = (createPlayground as jest.Mock).mock.calls[0][1];
  const iframe = getIframe();
  expect(calledWith.config.script.language).toBe('javascript');
  expect(calledWith.config.script.content).toBe('console.log(123)');
  expectIframeDefaultStyle(iframe);
});

test('should Apply Custom Config Over Global Config And Trigger Sdk Ready', async () => {
  const sdkReady = jest.fn();
  createContainer('{"config":{"script":{"language":"javascript","content":"console.log(123)"}}}');
  const mockDeck = {
    getConfig: jest.fn().mockReturnValue({
      livecodes: {
        config: { script: { language: 'javascript', content: 'console.log(456)' } },
        sdkReady,
      },
      customStyle: { backgroundColor: 'rgba(255,255,255,0.1)' },
    }),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expectCreatePlaygroundAndSdkFn(sdkReady);
  const calledWith = (createPlayground as jest.Mock).mock.calls[0][1];
  const iframe = getIframe();
  expect(calledWith.config.script.language).toBe('javascript');
  expect(calledWith.config.script.content).toBe('console.log(123)');
  expectIframeDefaultStyle(iframe);
  expect(iframe?.style.backgroundColor).toBe('rgba(255, 255, 255, 0.1)');
});

test('should initializes playground and triggers sdkReady when a livecodes container with no config', async () => {
  createContainer();
  const mockDeck = {
    getConfig: jest.fn().mockReturnValue({}),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expect(createPlayground).toHaveBeenCalledTimes(1);
  const iframe = document.querySelector('.livecodes') as HTMLIFrameElement | null;
  expectIframeDefaultStyle(iframe);
});
