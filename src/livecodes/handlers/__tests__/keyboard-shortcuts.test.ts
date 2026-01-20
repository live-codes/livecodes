import * as UI from '../../UI/selectors';
import { ctrl } from '../../utils';
import { handleKeyboardShortcuts, type KeyboardShortcutDeps } from '../keyboard-shortcuts';

// Mock the UI selectors module
jest.mock('../../UI/selectors', () => ({
  getConsoleButton: jest.fn(),
  getRunTestsButton: jest.fn(),
  getRunButton: jest.fn(),
  getResultButton: jest.fn(),
  getZoomButton: jest.fn(),
  getFocusButton: jest.fn(),
  getLogoLink: jest.fn(),
  getNewLink: jest.fn(),
  getOpenLink: jest.fn(),
  getImportLink: jest.fn(),
  getShareLink: jest.fn(),
  getForkLink: jest.fn(),
  getSaveLink: jest.fn(),
}));

// Mock the utils module
jest.mock('../../utils', () => ({
  ctrl: jest.fn(),
}));

describe('Keyboard Shortcuts Handler', () => {
  let mockDeps: KeyboardShortcutDeps;
  let mockEventsManager: any;
  let mockActiveEditor: any;
  let mockConfig: any;
  let mockToolsPane: any;
  let mockSplit: any;
  let keydownHandler: (e: KeyboardEvent) => void;

  const simulateKeydown = (eventProps: Partial<KeyboardEvent>) => {
    const mockEvent = {
      preventDefault: jest.fn(),
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      ...eventProps,
    } as any;
    keydownHandler(mockEvent);
    return mockEvent;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockActiveEditor = {
      monaco: {
        trigger: jest.fn(),
      },
      focus: jest.fn(),
    };

    mockConfig = {
      activeEditor: 'script',
      markup: { hideTitle: false },
      style: { hideTitle: false },
      script: { hideTitle: false },
    };

    mockToolsPane = {
      getStatus: jest.fn().mockReturnValue('closed'),
      getActiveTool: jest.fn().mockReturnValue('console'),
    };

    mockSplit = {
      show: jest.fn(),
    };

    mockEventsManager = {
      addEventListener: jest.fn((_, __, handler) => {
        keydownHandler = handler;
      }),
      removeEventListener: jest.fn(),
    };

    mockDeps = {
      eventsManager: mockEventsManager,
      getActiveEditor: jest.fn().mockReturnValue(mockActiveEditor),
      getConfig: jest.fn().mockReturnValue(mockConfig),
      showEditor: jest.fn(),
      run: jest.fn(),
      toolsPane: mockToolsPane,
      split: mockSplit,
      isEmbed: false,
    };

    // Mock ctrl function
    (ctrl as jest.Mock).mockImplementation((e: KeyboardEvent) => e?.ctrlKey || e?.metaKey || false);

    // Mock document.querySelectorAll for menu elements
    document.querySelectorAll = jest.fn().mockReturnValue([{ classList: { add: jest.fn() } }]);
  });

  describe('handleKeyboardShortcuts', () => {
    it('should add event listener to window', () => {
      handleKeyboardShortcuts(mockDeps);

      expect(mockEventsManager.addEventListener).toHaveBeenCalledWith(
        window,
        'keydown',
        expect.any(Function),
        true,
      );
    });

    it('should handle keyboard events and update lastkeys', () => {
      handleKeyboardShortcuts(mockDeps);
      simulateKeydown({ ctrlKey: true, code: 'KeyP' });
      expect(mockActiveEditor.monaco.trigger).toHaveBeenCalled();
    });

    it('should handle non-modifier keys by updating lastkeys', () => {
      handleKeyboardShortcuts(mockDeps);
      // Should not throw
      expect(() => {
        simulateKeydown({ key: 'a' });
      }).not.toThrow();
    });
  });

  describe('Command Palette (Ctrl+P)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should trigger Monaco command palette on Ctrl+P', () => {
      const event = simulateKeydown({ ctrlKey: true, code: 'KeyP' });

      expect(mockActiveEditor.monaco.trigger).toHaveBeenCalledWith(
        'anyString',
        'editor.action.quickCommand',
      );
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should return false when Monaco is not available', () => {
      mockActiveEditor.monaco = null;
      const event = simulateKeydown({ ctrlKey: true, code: 'KeyP' });

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should return false for non-Ctrl+P combinations', () => {
      simulateKeydown({ ctrlKey: false, code: 'KeyP' });
      expect(mockActiveEditor.monaco.trigger).not.toHaveBeenCalled();
    });
  });

  describe('Prevent Bookmark (Ctrl+D)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should prevent default on Ctrl+D', () => {
      const event = simulateKeydown({ ctrlKey: true, code: 'KeyD' });
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should return false for non-Ctrl+D combinations', () => {
      const event = simulateKeydown({ ctrlKey: false, code: 'KeyD' });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('Console Toggle (Ctrl+Alt+C)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should toggle console on Ctrl+Alt+C', () => {
      const mockConsoleButton = { dispatchEvent: jest.fn() };
      (UI.getConsoleButton as jest.Mock).mockReturnValue(mockConsoleButton);

      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyC' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockConsoleButton.dispatchEvent).toHaveBeenCalled();
    });

    it('should handle missing console button gracefully', () => {
      (UI.getConsoleButton as jest.Mock).mockReturnValue(null);

      expect(() => {
        simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyC' });
      }).not.toThrow();
    });
  });

  describe('Console Maximize (Ctrl+Alt+F after Ctrl+Alt+C)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should maximize console on Ctrl+Alt+F after Ctrl+Alt+C', () => {
      const mockConsoleButton = { dispatchEvent: jest.fn() };
      (UI.getConsoleButton as jest.Mock).mockReturnValue(mockConsoleButton);

      // First press Ctrl+Alt+C
      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyC' });
      mockConsoleButton.dispatchEvent.mockClear();

      // Then press Ctrl+Alt+F
      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyF' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockConsoleButton.dispatchEvent).toHaveBeenCalled();
    });

    it('should return false when lastkeys is not Ctrl+Alt+C', () => {
      const mockConsoleButton = { dispatchEvent: jest.fn() };
      (UI.getConsoleButton as jest.Mock).mockReturnValue(mockConsoleButton);
      const mockFocusButton = { click: jest.fn() };
      (UI.getFocusButton as jest.Mock).mockReturnValue(mockFocusButton);

      // Press Ctrl+Alt+F without prior Ctrl+Alt+C (in non-embed mode, this triggers focus mode)
      mockDeps.isEmbed = false;
      handleKeyboardShortcuts(mockDeps);
      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyF' });

      // Console maximize should not be triggered (dblclick event)
      const dblclickCalls = mockConsoleButton.dispatchEvent.mock.calls.filter(
        (call: any) => call[0]?.type === 'dblclick',
      );
      expect(dblclickCalls.length).toBe(0);
    });
  });

  describe('Run Tests (Ctrl+Alt+T)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should run tests on Ctrl+Alt+T', () => {
      const mockRunTestsButton = { click: jest.fn() };
      (UI.getRunTestsButton as jest.Mock).mockReturnValue(mockRunTestsButton);

      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyT' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockRunTestsButton.click).toHaveBeenCalled();
    });

    it('should handle missing run tests button gracefully', () => {
      (UI.getRunTestsButton as jest.Mock).mockReturnValue(null);

      expect(() => {
        simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyT' });
      }).not.toThrow();
    });
  });

  describe('Run Code (Shift+Enter)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should run code on Shift+Enter', () => {
      const mockRunButton = { click: jest.fn() };
      (UI.getRunButton as jest.Mock).mockReturnValue(mockRunButton);

      const event = simulateKeydown({ shiftKey: true, key: 'Enter' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockRunButton.click).toHaveBeenCalled();
    });

    it('should return false for non-Shift+Enter combinations', () => {
      const mockRunButton = { click: jest.fn() };
      (UI.getRunButton as jest.Mock).mockReturnValue(mockRunButton);

      simulateKeydown({ shiftKey: false, key: 'Enter' });
      expect(mockRunButton.click).not.toHaveBeenCalled();
    });
  });

  describe('Result Toggle (Ctrl+Alt+R)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should toggle result on Ctrl+Alt+R', () => {
      const mockResultButton = { click: jest.fn() };
      (UI.getResultButton as jest.Mock).mockReturnValue(mockResultButton);

      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyR' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockResultButton.click).toHaveBeenCalled();
    });
  });

  describe('Zoom Toggle (Ctrl+Alt+Z)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should toggle zoom on Ctrl+Alt+Z', () => {
      const mockZoomButton = { click: jest.fn() };
      (UI.getZoomButton as jest.Mock).mockReturnValue(mockZoomButton);

      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyZ' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockZoomButton.click).toHaveBeenCalled();
    });
  });

  describe('Focus Editor (Ctrl+Alt+E)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should focus editor on Ctrl+Alt+E', () => {
      const event = simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyE' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockActiveEditor.focus).toHaveBeenCalled();
    });
  });

  describe('Escape Key Handling', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should hide menus and return "Esc" on first escape', () => {
      simulateKeydown({ code: 'Escape' });
      expect(document.querySelectorAll).toHaveBeenCalledWith('.menu-scroller');
    });

    it('should focus console button on second escape when tools pane is open', () => {
      mockToolsPane.getStatus.mockReturnValue('open');
      const mockConsoleButton = { focus: jest.fn() };
      (UI.getConsoleButton as jest.Mock).mockReturnValue(mockConsoleButton);

      // First escape
      simulateKeydown({ code: 'Escape' });
      // Second escape
      const event = simulateKeydown({ code: 'Escape' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockConsoleButton.focus).toHaveBeenCalled();
    });

    it('should focus focus button on second escape when tools pane is closed', () => {
      mockToolsPane.getStatus.mockReturnValue('closed');
      const mockFocusButton = { focus: jest.fn() };
      (UI.getFocusButton as jest.Mock).mockReturnValue(mockFocusButton);

      // First escape
      simulateKeydown({ code: 'Escape' });
      // Second escape
      const event = simulateKeydown({ code: 'Escape' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFocusButton.focus).toHaveBeenCalled();
    });

    it('should focus logo link on third escape', () => {
      const mockLogoLink = { focus: jest.fn() };
      (UI.getLogoLink as jest.Mock).mockReturnValue(mockLogoLink);

      // First, second, third escape
      simulateKeydown({ code: 'Escape' });
      simulateKeydown({ code: 'Escape' });
      const event = simulateKeydown({ code: 'Escape' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockLogoLink.focus).toHaveBeenCalled();
    });

    it('should return false for non-escape keys', () => {
      const mockFocusButton = { focus: jest.fn() };
      (UI.getFocusButton as jest.Mock).mockReturnValue(mockFocusButton);

      simulateKeydown({ code: 'KeyA' });
      expect(mockFocusButton.focus).not.toHaveBeenCalled();
    });
  });

  describe('Editor Switching (Ctrl+Alt+1/2/3/Arrow)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should switch to editor 1 on Ctrl+Alt+1', () => {
      const event = simulateKeydown({ ctrlKey: true, altKey: true, key: '1' });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockSplit.show).toHaveBeenCalledWith('code');
      expect(mockDeps.showEditor).toHaveBeenCalledWith('markup');
    });

    it('should switch to editor 2 on Ctrl+Alt+2', () => {
      simulateKeydown({ ctrlKey: true, altKey: true, key: '2' });
      expect(mockDeps.showEditor).toHaveBeenCalledWith('style');
    });

    it('should switch to editor 3 on Ctrl+Alt+3', () => {
      simulateKeydown({ ctrlKey: true, altKey: true, key: '3' });
      expect(mockDeps.showEditor).toHaveBeenCalledWith('script');
    });

    it('should switch to previous editor on Ctrl+Alt+ArrowLeft', () => {
      mockConfig.activeEditor = 'style';
      simulateKeydown({ ctrlKey: true, altKey: true, key: 'ArrowLeft' });
      expect(mockDeps.showEditor).toHaveBeenCalledWith('markup');
    });

    it('should switch to next editor on Ctrl+Alt+ArrowRight', () => {
      mockConfig.activeEditor = 'markup';
      simulateKeydown({ ctrlKey: true, altKey: true, key: 'ArrowRight' });
      expect(mockDeps.showEditor).toHaveBeenCalledWith('style');
    });

    it('should wrap around when switching beyond available editors', () => {
      mockConfig.activeEditor = 'script';
      simulateKeydown({ ctrlKey: true, altKey: true, key: 'ArrowRight' });
      expect(mockDeps.showEditor).toHaveBeenCalledWith('markup');
    });

    it('should handle hidden editors correctly', () => {
      mockConfig.style.hideTitle = true;
      simulateKeydown({ ctrlKey: true, altKey: true, key: '2' });
      // With style hidden, editor 2 should be script
      expect(mockDeps.showEditor).toHaveBeenCalledWith('script');
    });

    it('should return false for non-editor switch combinations', () => {
      simulateKeydown({ ctrlKey: true, altKey: true, key: '5' });
      expect(mockDeps.showEditor).not.toHaveBeenCalled();
    });
  });

  describe('Project Management Shortcuts (non-embed only)', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should create new project on Ctrl+Alt+N when not embed', () => {
      const mockNewLink = { click: jest.fn() };
      (UI.getNewLink as jest.Mock).mockReturnValue(mockNewLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyN' });
      expect(mockNewLink.click).toHaveBeenCalled();
    });

    it('should open project on Ctrl+O when not embed', () => {
      const mockOpenLink = { click: jest.fn() };
      (UI.getOpenLink as jest.Mock).mockReturnValue(mockOpenLink);

      simulateKeydown({ ctrlKey: true, code: 'KeyO' });
      expect(mockOpenLink.click).toHaveBeenCalled();
    });

    it('should import on Ctrl+Alt+I when not embed', () => {
      const mockImportLink = { click: jest.fn() };
      (UI.getImportLink as jest.Mock).mockReturnValue(mockImportLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyI' });
      expect(mockImportLink.click).toHaveBeenCalled();
    });

    it('should share on Ctrl+Alt+S when not embed', () => {
      const mockShareLink = { click: jest.fn() };
      (UI.getShareLink as jest.Mock).mockReturnValue(mockShareLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyS' });
      expect(mockShareLink.click).toHaveBeenCalled();
    });

    it('should fork on Ctrl+Shift+S when not embed', () => {
      const mockForkLink = { click: jest.fn() };
      (UI.getForkLink as jest.Mock).mockReturnValue(mockForkLink);

      simulateKeydown({ ctrlKey: true, shiftKey: true, code: 'KeyS' });
      expect(mockForkLink.click).toHaveBeenCalled();
    });

    it('should save on Ctrl+S when not embed', () => {
      const mockSaveLink = { click: jest.fn() };
      (UI.getSaveLink as jest.Mock).mockReturnValue(mockSaveLink);

      simulateKeydown({ ctrlKey: true, code: 'KeyS' });
      expect(mockSaveLink.click).toHaveBeenCalled();
    });

    it('should toggle focus mode on Ctrl+Alt+F when not embed', () => {
      const mockFocusButton = { click: jest.fn() };
      (UI.getFocusButton as jest.Mock).mockReturnValue(mockFocusButton);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyF' });
      expect(mockFocusButton.click).toHaveBeenCalled();
    });
  });

  describe('Embed Mode Restrictions', () => {
    beforeEach(() => {
      mockDeps.isEmbed = true;
      handleKeyboardShortcuts(mockDeps);
    });

    it('should return false for new project when in embed mode', () => {
      const mockNewLink = { click: jest.fn() };
      (UI.getNewLink as jest.Mock).mockReturnValue(mockNewLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyN' });
      expect(mockNewLink.click).not.toHaveBeenCalled();
    });

    it('should return false for open project when in embed mode', () => {
      const mockOpenLink = { click: jest.fn() };
      (UI.getOpenLink as jest.Mock).mockReturnValue(mockOpenLink);

      simulateKeydown({ ctrlKey: true, code: 'KeyO' });
      expect(mockOpenLink.click).not.toHaveBeenCalled();
    });

    it('should return false for save when in embed mode', () => {
      const mockSaveLink = { click: jest.fn() };
      (UI.getSaveLink as jest.Mock).mockReturnValue(mockSaveLink);

      simulateKeydown({ ctrlKey: true, code: 'KeyS' });
      expect(mockSaveLink.click).not.toHaveBeenCalled();
    });

    it('should return false for import when in embed mode', () => {
      const mockImportLink = { click: jest.fn() };
      (UI.getImportLink as jest.Mock).mockReturnValue(mockImportLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyI' });
      expect(mockImportLink.click).not.toHaveBeenCalled();
    });

    it('should return false for share when in embed mode', () => {
      const mockShareLink = { click: jest.fn() };
      (UI.getShareLink as jest.Mock).mockReturnValue(mockShareLink);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyS' });
      expect(mockShareLink.click).not.toHaveBeenCalled();
    });

    it('should return false for fork when in embed mode', () => {
      const mockForkLink = { click: jest.fn() };
      (UI.getForkLink as jest.Mock).mockReturnValue(mockForkLink);

      simulateKeydown({ ctrlKey: true, shiftKey: true, code: 'KeyS' });
      expect(mockForkLink.click).not.toHaveBeenCalled();
    });

    it('should return false for focus mode when in embed mode', () => {
      const mockFocusButton = { click: jest.fn() };
      (UI.getFocusButton as jest.Mock).mockReturnValue(mockFocusButton);

      simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyF' });
      expect(mockFocusButton.click).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should handle missing UI elements gracefully', () => {
      (UI.getConsoleButton as jest.Mock).mockReturnValue(null);
      (UI.getRunButton as jest.Mock).mockReturnValue(null);
      (UI.getFocusButton as jest.Mock).mockReturnValue(null);

      expect(() => {
        simulateKeydown({ ctrlKey: true, altKey: true, code: 'KeyC' });
        simulateKeydown({ shiftKey: true, key: 'Enter' });
      }).not.toThrow();
    });

    it('should handle missing split gracefully', () => {
      mockDeps.split = undefined;
      handleKeyboardShortcuts(mockDeps);

      expect(() => {
        simulateKeydown({ ctrlKey: true, altKey: true, key: '1' });
      }).not.toThrow();
    });

    it('should handle missing dependencies gracefully', () => {
      const incompleteDeps = {
        ...mockDeps,
        getActiveEditor: jest.fn().mockReturnValue({}),
        toolsPane: undefined,
      };
      handleKeyboardShortcuts(incompleteDeps);

      // Should not throw even with missing toolsPane
      expect(() => {
        simulateKeydown({ code: 'Escape' });
        simulateKeydown({ code: 'Escape' });
      }).not.toThrow();
    });
  });

  describe('Key Combination Validation', () => {
    beforeEach(() => handleKeyboardShortcuts(mockDeps));

    it('should correctly identify Ctrl key combinations', () => {
      const event1 = simulateKeydown({ ctrlKey: true, code: 'KeyD' });
      expect(event1.preventDefault).toHaveBeenCalled();

      jest.clearAllMocks();
      (ctrl as jest.Mock).mockReturnValue(false);
      const event2 = simulateKeydown({ ctrlKey: false, code: 'KeyD' });
      expect(event2.preventDefault).not.toHaveBeenCalled();
    });

    it('should handle complex key combinations correctly', () => {
      const validKeys = ['1', '2', '3', 'ArrowLeft', 'ArrowRight'];

      validKeys.forEach((key) => {
        jest.clearAllMocks();
        (ctrl as jest.Mock).mockImplementation((e) => e?.ctrlKey || e?.metaKey || false);
        simulateKeydown({ ctrlKey: true, altKey: true, key });
        expect(mockDeps.showEditor).toHaveBeenCalled();
      });
    });

    it('should differentiate between similar key combinations', () => {
      const mockSaveLink = { click: jest.fn() };
      const mockForkLink = { click: jest.fn() };
      (UI.getSaveLink as jest.Mock).mockReturnValue(mockSaveLink);
      (UI.getForkLink as jest.Mock).mockReturnValue(mockForkLink);

      // Ctrl+S (save)
      simulateKeydown({ ctrlKey: true, shiftKey: false, code: 'KeyS' });
      expect(mockSaveLink.click).toHaveBeenCalled();

      jest.clearAllMocks();
      (UI.getSaveLink as jest.Mock).mockReturnValue(mockSaveLink);
      (UI.getForkLink as jest.Mock).mockReturnValue(mockForkLink);

      // Ctrl+Shift+S (fork) - fork is checked before save
      simulateKeydown({ ctrlKey: true, shiftKey: true, code: 'KeyS' });
      expect(mockForkLink.click).toHaveBeenCalled();
    });
  });
});
