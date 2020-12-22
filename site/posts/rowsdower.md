---
date: 2019-11-04
title: Rowsdower!
---

Eight years ago I had an idea.
What if I could put the silhouette from [Mystery Science Theater 3000][] onto any page on the internet?
So I built [rowsdower][].
`Coffeescript` and `jQuery` delivered the functionality of placing the MST3K silhouette on the page when the script was loaded.
I was very proud of the fact that the script automatically loaded `jQuery` if it wasn't already present.

This weekend I got on a bit of a kick to revisit old projects and shore them up.
Rowsdower depended on `jQuery` to run, made assumptions about where it should be mounted, and had no ability to be cleaned up.
It was very representative of the time it was written.

Now that my site is using <strike>Gatsby</strike> [Rails with Stimulus](/posts/deploying-rails-to-netlify), I wanted to be able to declaratively add and remove the element from the document.
So `rowsdower@2.0.0` has been released.
It now has zero dependencies, and provdes the ability to clean itself up.

Go ahead and give it a try:

<div data-controller="rowsdower">
  <button data-action="click->rowsdower#zap">Zap!</button>
</div>

[mystery science theater 3000]: https://mst3k.com
[rowsdower]: https://github.com/danott/rowsdower
