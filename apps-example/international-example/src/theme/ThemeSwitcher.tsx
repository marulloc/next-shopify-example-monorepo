'use client';

import { classNames } from '@marulloc/components-library/utils';
import { useEffect, useState } from 'react';
import { localTheme } from './local-theme';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  // 테마를 토글하는 함수
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // localStorage에 테마 저장
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // 컴포넌트 마운트 시 사용자의 테마 선호도를 확인하고 적용
  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className={classNames(
        localTheme.fill.primary.main,
        localTheme.fill.primary.hover,
        localTheme.border.primary.main,
        localTheme.border.primary.hover,
        localTheme.text.color.base.main,
        localTheme.text.color.base.hover,
      )}
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeSwitcher;
