const baseUrl = '/localpen';

import(baseUrl + '/index.js').then((module) => {
  module.localpen('#pen', {
    baseUrl,
    autoupdate: true,
  });
});
