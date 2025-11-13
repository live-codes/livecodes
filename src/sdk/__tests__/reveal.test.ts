import { createPlayground } from '../index';
import { LiveCodes } from '../reveal';

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

test('should initializes playground and triggers sdkReady when a livecodes container with config exists', async () => {
  const sdkReady = jest.fn();
  const container = document.createElement('div');
  container.dataset.livecodes = '';
  container.dataset.config = '{"script":{"language":"javascript","content":"console.log(123)"}}';
  document.body.appendChild(container);
  const mockDeck = {
    getConfig: jest
      .fn()
      .mockReturnValue({
        livecodes: { markup: { language: 'markdown', content: '# Hello world' }, sdkReady },
        customStyle: { backgroundColor: 'rgba(255,255,255,0.1)' },
      }),
  } as any;
  LiveCodes.init(mockDeck);
  await new Promise(process.nextTick);
  expect(createPlayground).toHaveBeenCalledTimes(1);
  expect(sdkReady).toHaveBeenCalledTimes(1);
  const calledWith = (createPlayground as jest.Mock).mock.calls[0][1];
  const iframe = document.querySelector('.livecodes') as HTMLIFrameElement | null;
  expect(calledWith.config.script.language).toBe('javascript');
  expect(calledWith.config.script.content).toBe('console.log(123)');
  expect(calledWith.config.markup.language).toBe('markdown');
  expect(calledWith.config.markup.content).toBe('# Hello world');
  expect(iframe?.style.maxWidth).toBe('100%');
  expect(iframe?.style.maxHeight).toBe('100%');
  expect(iframe?.style.backgroundColor).toBe('rgba(255, 255, 255, 0.1)');
});
