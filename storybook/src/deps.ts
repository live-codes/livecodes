declare global {
  interface Window {
    deps: {
      translateString: (key: string, value: string) => string;
    };
  }
}

window.deps = {
  translateString: (_key: string, value: string) => value,
};

export {};
