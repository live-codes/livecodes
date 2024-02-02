import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './HomepageCarousel.module.css';

const screenshots = [
  {
    label: 'A large collection of languages',
    url: './img/screenshots/slider/languages.jpg',
  },
  {
    label: 'Lots of features',
    url: './img/screenshots/slider/export.jpg',
  },
  {
    label: 'Starter templates for new projects',
    url: './img/screenshots/slider/templates1.jpg',
  },
  {
    label: '... many starter templates',
    url: './img/screenshots/slider/templates2.jpg',
  },
  {
    label: 'Welcome screen - for a quick start',
    url: './img/screenshots/slider/welcome.jpg',
  },
  {
    label: 'Keep your projects organized',
    url: './img/screenshots/slider/saved-projects.jpg',
  },
  {
    label: 'Add external resources',
    url: './img/screenshots/slider/external-resources.png',
  },
  {
    label: 'CSS Processors',
    url: './img/screenshots/slider/css-processors.jpg',
  },
  {
    label: 'IntelliSense (autocomplete) - format code',
    url: './img/screenshots/slider/intellisense.jpg',
  },
  {
    label: 'Console for quick inspection',
    url: './img/screenshots/slider/console.jpg',
  },
  {
    label: 'View compiled code',
    url: './img/screenshots/slider/compiled-code.jpg',
  },
  {
    label: 'Import code from many sources',
    url: './img/screenshots/slider/import.png',
  },
  {
    label: 'Embed projects into your web pages',
    url: './img/screenshots/slider/embed.jpg',
  },
  {
    label: 'Share your projects with others',
    url: './img/screenshots/slider/share.jpg',
  },
  {
    label: 'Deploy to GitHub Pages',
    url: './img/screenshots/slider/deploy.jpg',
  },
  {
    label: 'Broadcast real-time code changes',
    url: './img/screenshots/slider/broadcast.png',
  },
  {
    label: 'Project info',
    url: './img/screenshots/slider/project-info.png',
  },
  {
    label: 'Assets manager',
    url: './img/screenshots/slider/assets.jpg',
  },
  {
    label: 'Code snippets',
    url: './img/screenshots/slider/snippets.jpg',
  },
  {
    label: 'Run automated tests!',
    url: './img/screenshots/slider/tests.jpg',
  },
  {
    label: 'Sync with your other devices',
    url: './img/screenshots/slider/sync.png',
  },
  {
    label: 'Backup and restore your data',
    url: './img/screenshots/slider/backup-restore.png',
  },
  {
    label: 'Fine-tune your editor settings',
    url: './img/screenshots/slider/editor-settings.png',
  },
  {
    label: 'Emmet support and Vim/Emacs modes',
    url: './img/screenshots/slider/editor-settings2.png',
  },
  {
    label: 'Light theme',
    url: './img/screenshots/slider/light-theme.jpg',
  },
  {
    label: 'Responsive layout',
    url: './img/screenshots/slider/responsive.jpg',
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
