import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './HomepageCarousel.module.css';

const screenshots = [
  {
    label: 'A large collection of languages',
    url: './img/screenshots/languages.png',
  },
  {
    label: 'Lots of features',
    url: './img/screenshots/export.png',
  },
  {
    label: 'Starter templates for new projects',
    url: './img/screenshots/templates1.png',
  },
  {
    label: '... many starter templates',
    url: './img/screenshots/templates2.png',
  },
  {
    label: 'Welcome screen - for a quick start',
    url: './img/screenshots/welcome.png',
  },
  {
    label: 'Keep your projects organized',
    url: './img/screenshots/saved-projects.png',
  },
  {
    label: 'Add external resources',
    url: './img/screenshots/external-resources.png',
  },
  {
    label: 'CSS Processors',
    url: './img/screenshots/css-processors.png',
  },
  {
    label: 'IntelliSense (autocomplete) - format code',
    url: './img/screenshots/intellisense.png',
  },
  {
    label: 'Console for quick inspection',
    url: './img/screenshots/console.png',
  },
  {
    label: 'View compiled code',
    url: './img/screenshots/compiled-code.png',
  },
  {
    label: 'Import code from many sources',
    url: './img/screenshots/import.png',
  },
  {
    label: 'Embed projects into your web pages',
    url: './img/screenshots/embed.png',
  },
  {
    label: 'Share your projects with others',
    url: './img/screenshots/share.png',
  },
  {
    label: 'Deploy to GitHub Pages',
    url: './img/screenshots/deploy.png',
  },
  {
    label: 'Broadcast real-time code changes',
    url: './img/screenshots/broadcast.png',
  },
  {
    label: 'Project info',
    url: './img/screenshots/project-info.png',
  },
  {
    label: 'Assets manager',
    url: './img/screenshots/assets.png',
  },
  {
    label: 'Code snippets',
    url: './img/screenshots/snippets.png',
  },
  {
    label: 'Run automated tests!',
    url: './img/screenshots/tests.png',
  },
  {
    label: 'Sync with your other devices',
    url: './img/screenshots/sync2.png',
  },
  {
    label: 'Backup and restore your data',
    url: './img/screenshots/backup-restore.png',
  },
  {
    label: 'Fine-tune your editor settings',
    url: './img/screenshots/editor-settings.png',
  },
  {
    label: 'Emmet support and Vim/Emacs modes',
    url: './img/screenshots/editor-settings2.png',
  },
  {
    label: '... and of course, a light theme :)',
    url: './img/screenshots/light-theme.png',
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
