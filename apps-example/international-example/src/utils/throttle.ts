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

export const debounce = <T extends (...args: any[]) => void>(callback: T, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

export const delay = (ms: number) => {
  // Promise 객체를 반환합니다.
  return new Promise((resolve) => {
    // setTimeout을 사용하여 지정된 시간(ms) 후에 resolve 함수를 호출합니다.
    // 이는 Promise가 성공적으로 완료되었음을 나타냅니다.
    setTimeout(resolve, ms);
  });
};
