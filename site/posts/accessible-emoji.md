---
date: 2016-03-19
title: Accessible Emoji
eleventyExcludeFromCollections: true
---

---

**UPDATE:** GitHub Pages now supports GitHub Flavored Markdown, so my workaround is no longer needed.

---

Emoji is becoming a de-facto standard of written communication.
Because I use it so liberally in all my other forms of communication, I want to be able to use it on this site.
Doing so would allow me to do really powerful stuff like adding a custom break in thoughts.

<div style="display:flex;justify-content:center;">
  <i style="width:80px;text-align:center;">:pizza:</i>
  <i style="width:80px;text-align:center;">:hamburger:</i>
  <i style="width:80px;text-align:center;">:fries:</i>
</div>

Whoa!
How much deeper did that thought sink in with the forced break in cadence?

<div style="display:flex;justify-content:center;">
  <i style="width:80px;text-align:center;">:fries:</i>
  <i style="width:80px;text-align:center;">:hamburger:</i>
  <i style="width:80px;text-align:center;">:pizza:</i>
</div>

Here's how I can insert an emoji into `danott.co`

```html
<i>:sunglasses:</i>
```

This becomes <i>:sunglasses:</i> through some light use of React.
The text `:sunglasses:` becomes the `alt` attribute on the image tag for screen readers.

I'm definitely not an expert on accessibility.
From the little I do know I think this is at least a step in the right direction.

Overriding all `<i/>` tags is a bit of a tradeoff.
It's original intent was for _italicizing_ content.
The more semantic `<em/>` tag has since replaced it.
`<em/>` is what all the kids authoring HTML5 are using.

Since I own all the content on `danott.co` I'm happy to give new life to this long abandoned tag.

<p style="font-size:48px;text-align:center;">
  <i>:dizzy:</i>
  <i>:sunglasses:</i>
  <i>:tada:</i>
</p>
