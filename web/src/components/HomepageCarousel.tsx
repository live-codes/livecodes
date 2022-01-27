import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './HomepageCarousel.module.css';

const screenshots = [
  {
    label: 'Languages',
    url: './img/screenshots/languages.jpg',
  },
  {
    label: 'Settings',
    url: './img/screenshots/settings-export.jpg',
  },
  {
    label: 'Saved Projects',
    url: './img/screenshots/saved-projects.jpg',
  },
  {
    label: 'Starter Templates',
    url: './img/screenshots/starter-templates.jpg',
  },
  {
    label: 'Starter Templates',
    url: './img/screenshots/starter-templates-2.jpg',
  },
  {
    label: 'Console',
    url: './img/screenshots/console.jpg',
  },
  {
    label: 'Compiled Code Viewer',
    url: './img/screenshots/compiled-code.jpg',
  },
  {
    label: 'Assets',
    url: './img/screenshots/assets.jpg',
  },
  {
    label: 'External CSS/JS',
    url: './img/screenshots/external-css-js.jpg',
  },
  {
    label: 'Restore unsaved project',
    url: './img/screenshots/restore.jpg',
  },
  {
    label: 'SCSS/Autoprefixer',
    url: './img/screenshots/SCSS-Autoprefixer.jpg',
  },
  {
    label: 'CSS Processors',
    url: './img/screenshots/tailwindcss.jpg',
  },
  {
    label: 'Light theme',
    url: './img/screenshots/light-theme.jpg',
  },
];

function CarouselItem({ label, url }): JSX.Element {
  return (
    <div>
      <img src={url} alt={label} />
      <p className="legend">{label}</p>
    </div>
  );
}

export default function HomepageCarousel(): JSX.Element {
  return (
    <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} className={styles.carousel}>
      {screenshots.map((props, idx) => (
        <CarouselItem key={idx} {...props} />
      ))}
    </Carousel>
  );
}
