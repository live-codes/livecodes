// eslint-disable-next-line import/no-internal-modules
import { getParams } from './livecodes/config';

import('/livecodes/' + 'index.js').then((module) => {
  module.livecodes(
    '#livecodes',
    {
      autoupdate: true,
    },
    getParams(location.search).embed === true,
  );
});
