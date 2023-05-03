// this adds a placeholder element to avoid "no ad placements found" error
// when react is loaded, this element is removed and ad is loaded manually

document.addEventListener('DOMContentLoaded', () => {
  const eaPlaceholder = document.createElement('div');
  eaPlaceholder.id = 'ea-placeholder';
  eaPlaceholder.innerHTML =
    '<div data-ea-publisher="livecodesio" style="display:none;" data-ea-manual="true"></div>';
  document.body.appendChild(eaPlaceholder);
});

window.loadAds = function () {
  if (window.ethicalads) {
    window.ethicalads.load();
  } else {
    addEventListener('load', () => {
      window.ethicalads?.load();
    });
  }
};
