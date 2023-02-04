import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from './HomepageCarousel.module.css';

const screenshots = [
  {
    label: 'A large collection of languages',
    url: './img/screenshots/languages.jpg',
  },
  {
    label: 'Lots of features',
    url: './img/screenshots/settings-export.jpg',
  },
  {
    label: 'Keep your projects organized',
    url: './img/screenshots/saved-projects.jpg',
  },
  {
    label: 'Starter templates for quick start',
    url: './img/screenshots/starter-templates.jpg',
  },
  {
    label: '... a large number of starter templates',
    url: './img/screenshots/starter-templates-2.jpg',
  },
  {
    label: 'Developer console for quick inspection',
    url: './img/screenshots/console.jpg',
  },
  {
    label: 'View compiled code',
    url: './img/screenshots/compiled-code.jpg',
  },
  {
    label: 'Assets manager',
    url: './img/screenshots/assets.jpg',
  },
  {
    label: 'Add external resources',
    url: './img/screenshots/external-resources.jpg',
  },
  {
    label: 'Restore unsaved projects',
    url: './img/screenshots/restore-project.jpg',
  },
  {
    label: 'CSS Processors',
    url: './img/screenshots/SCSS-Autoprefixer.jpg',
  },
  {
    label: '... and of course, a light theme :)',
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
