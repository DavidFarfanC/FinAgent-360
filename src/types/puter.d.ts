declare global {
  interface Window {
    puter: {
      ai: {
        txt2speech: (text: string, options?: object) => Promise<HTMLAudioElement>;
      };
    };
  }
}

export {};
