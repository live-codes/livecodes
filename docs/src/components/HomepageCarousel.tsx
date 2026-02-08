import { Carousel } from 'react-responsive-carousel';
import styles from './HomepageCarousel.module.css';

const screenshots = [
  {
    label: 'A large collection of languages',
    url: './img/screenshots/languages-3.jpg',
  },
  {
    label: 'Lots of features',
    url: './img/screenshots/export-1.jpg',
  },
  {
    label: 'Even more features',
    url: './img/screenshots/snippets-1.jpg',
  },
  {
    label: 'Starter templates for new projects',
    url: './img/screenshots/templates-1.jpg',
  },
  {
    label: '... many starter templates',
    url: './img/screenshots/templates-2.jpg',
  },
  {
    label: 'Welcome screen - for a quick start',
    url: './img/screenshots/welcome-1.jpg',
  },
  {
    label: 'Keep your projects organized',
    url: './img/screenshots/saved-projects-1.jpg',
  },
  {
    label: 'Add external resources',
    url: './img/screenshots/resources.jpg',
  },
  {
    label: 'CSS Processors',
    url: './img/screenshots/css-processors.jpg',
  },
  {
    label: 'IntelliSense (autocomplete)',
    url: './img/screenshots/intellisense-3.jpg',
  },
  // {
  //   label: 'AI Code Assistant',
  //   url: './img/screenshots/ai-1.jpg',
  // },
  {
    label: 'Console for quick inspection',
    url: './img/screenshots/console-1.jpg',
  },
  {
    label: 'View compiled code',
    url: './img/screenshots/compiled-code-1.jpg',
  },
  {
    label: 'Import code from many sources',
    url: './img/screenshots/import-2.jpg',
  },
  {
    label: 'Embed projects into your web pages',
    url: './img/screenshots/embed-1.jpg',
  },
  {
    label: 'Share your projects with others',
    url: './img/screenshots/share-1.jpg',
  },
  {
    label: 'Deploy to GitHub Pages',
    url: './img/screenshots/deploy-1.jpg',
  },
  {
    label: 'Broadcast real-time code changes',
    url: './img/screenshots/broadcast-1.jpg',
  },
  {
    label: 'Project info',
    url: './img/screenshots/project-info.jpg',
  },
  {
    label: 'Assets manager',
    url: './img/screenshots/assets-2.jpg',
  },
  {
    label: 'Code snippets',
    url: './img/screenshots/snippets-list.jpg',
  },
  {
    label: 'Run automated tests!',
    url: './img/screenshots/tests.jpg',
  },
  {
    label: 'Sync with your other devices',
    url: './img/screenshots/sync.jpg',
  },
  {
    label: 'Backup and restore your data',
    url: './img/screenshots/backup-restore-1.jpg',
  },
  {
    label: 'Fine-tune your editor settings',
    url: './img/screenshots/editor-settings-1.jpg',
  },
  {
    label: 'Emmet support and Vim/Emacs modes',
    url: './img/screenshots/editor-settings-3.jpg',
  },
  {
    label: 'Select your favorite theme/color',
    url: './img/screenshots/themes-5.jpg',
  },
  {
    label: 'Change UI language to your preferred one',
    url: './img/screenshots/i18n-1.jpg',
  },
  {
    label: 'Responsive layout',
    url: './img/screenshots/responsive.jpg',
  },
];

function CarouselItem({ label, url }) {
  return (
    <div>
      <img src={url} alt={label} />
      <p className="legend">{label}</p>
    </div>
  );
}

export default function HomepageCarousel() {
  return (
    <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} className={styles.carousel}>
      {screenshots.map((props, idx) => (
        <CarouselItem key={idx} {...props} />
      ))}
    </Carousel>
  );
}
