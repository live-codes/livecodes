# Bookmarklet

LiveCodes allows [importing code](./features/import.html.md) from a [wide variety of sources](./features/import.html.md)#sources).

Instead of manually copy/pasting URLs to import, adding **"Edit in LiveCodes"** bookmarklet to the browser bookmarks bar can be a more convenient way. It opens LiveCodes in a new window and imports the current webpage URL.

## Add Bookmarklet

Drag this link to the browser bookmarks bar:

<div
  dangerouslySetInnerHTML={{
    __html: `<a href='javascript:(()=>{window.open("https://livecodes.io/?x="+encodeURIComponent(location.href),"_blank");})();'>Edit in LiveCodes</a>`,
  }}
/>

<br />

or manually create a new bookmark in your browser and add this code as its URL:

<!-- prettier-ignore -->
```js
javascript:(()=>{window.open("https://livecodes.io/?x="+encodeURIComponent(location.href),"_blank");})();
```

## Example Usage

After adding the bookmarklet to your browser (see above), open this GitHub directory:

https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards

Then click on the bookmarklet.

LiveCodes playground should open in a new window and [import](./features/import.html.md) the directory files (each file in the appropriate editor). It just works!