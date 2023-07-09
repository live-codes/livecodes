# Bookmarklet

LiveCodes allows [importing code](./features/import.md) from a [wide variety of sources](./features/import.md#sources).

Instead of manually copy/pasting URLs to import, adding **"Edit in LiveCodes"** bookmarklet to the browser bookmarks bar can be a more convenient way. It opens LiveCodes in a new window and imports the current webpage URL.

## Add Bookmarklet

Drag this link to the browser bookmarks bar:

<a href='javascript:(()=>{window.open("https://livecodes.io/?x="+encodeURIComponent(location.href),"_blank");})();'>Edit in LiveCodes</a>

<br /><br />

or manually create a new bookmark in your browser and add this code as its URL:

<!-- prettier-ignore -->
```js
javascript:(()=>{window.open("https://livecodes.io/?x="+encodeURIComponent(location.href),"_blank");})();
```
