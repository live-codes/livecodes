// eslint-disable-next-line import/no-extraneous-dependencies
import { useColorMode } from '@docusaurus/theme-common';
import { useState } from 'react';
import LiveCodes from './LiveCodes';
import styles from './ThemeDemo.module.css';

export default function ThemeDemo() {
  const { colorMode } = useColorMode();
  const themeColors = [
    { name: 'blue', themeColor: 'lightblue' },
    { name: 'cyan', themeColor: 'hsl(192, 40%, 50%)' },
    { name: 'green', themeColor: 'rgb(77, 179, 114)' },
    { name: 'amber', themeColor: '#b38d4d' },
    { name: 'red', themeColor: 'hsl(0, 40%, 50%)' },
    { name: 'violet', themeColor: 'rgb(114, 77, 179)' },
    { name: 'slate', themeColor: '#667799' },
  ];
  const [theme, setTheme] = useState<'light' | 'dark'>(colorMode);
  const [themeColor, setThemeColor] = useState(themeColors[0].themeColor);
  return (
    <form className={styles.form}>
      <p>
        Theme:
        <input
          type="radio"
          name="theme"
          id="light-theme"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        <label htmlFor="light-theme">Light</label>
        <input
          type="radio"
          name="theme"
          id="dark-theme"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        <label htmlFor="dark-theme">Dark</label>
      </p>

      <p>
        Theme Color:
        <select name="themeColor" id="" onChange={(e) => setThemeColor(e.target.value)}>
          {themeColors.map(({ name, themeColor }) => (
            <option key={name} value={themeColor}>
              {name}
            </option>
          ))}
        </select>{' '}
        <span className={styles.colorValue}>"{themeColor}"</span>
      </p>
      <LiveCodes showCode={false} config={{ theme, themeColor }} template="react" />
    </form>
  );
}
