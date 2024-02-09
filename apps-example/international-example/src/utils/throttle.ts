export const throttle = <T extends (...args: any[]) => void>(callback: T, limit: number) => {
  let inThrottle: boolean;
  let lastFunc: ReturnType<typeof setTimeout> | undefined;
  let lastRan: number;

  return (...args: Parameters<T>) => {
    const runCallback = () => {
      callback(...args);
      lastRan = Date.now();
      lastFunc = undefined;
    };

    if (!inThrottle) {
      runCallback();
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(runCallback, Math.max(limit - (Date.now() - lastRan), 0));
    }
  };
};
