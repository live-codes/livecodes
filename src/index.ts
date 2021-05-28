import('/localpen/' + 'index.js').then((module) => {
  module.localpen('#pen', {
    autoupdate: true,
  });
});
