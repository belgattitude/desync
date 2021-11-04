// Global/Window object Stubs for Jest

(window as any).requestAnimationFrame = (callback: FrameRequestCallback): number => {
  setTimeout(callback);
  return 1;
};

(window as any).localStorage = {
  getItem: (_key: string) => {},
  setItem: (_key: string, _value: any) => {},
  removeItem(_key: string): void {},
};

//Object.values = () => [];

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

// Because it does not work in jsdom
(HTMLMediaElement as any).prototype.play = (): Promise<any> => {
  return new Promise((_resolve, _reject) => {});
};

(HTMLMediaElement as any).prototype.load = () => {
  /* do nothing */
};
(HTMLMediaElement as any).prototype.pause = () => {
  /* do nothing */
};
(HTMLMediaElement as any).prototype.addTextTrack = () => {
  /* do nothing */
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// To comply with typescript isolated modules
export const JestStubsLoaded = true;
