---
date: 2012-01-20
title: Sharing is Caring About Code
---

Sharing buttons for Twitter, Facebook, Google+ and the like are becoming a frequent request when doing web work. It's a good ask most of the time &mdash; but often it comes at the cost of readable and/or maintainable code.

Things used to be worse. I recall the first time I tried to use a copy/pastable JavaScript snippet from Flickr, and it prevented my entire page from loading. That particular script was a blocking script, using JavaScript's `document.write()` profusely. If Flickr was down, my site was down.

Today's scripts are a lot smarter, They're placed at the bottom of a document, and dynamically insert new scripts into the document `head` to load them asynchronously. This means they don't block the rendering of your webpage, and your site will work independent of the other service(s).

That's an improvement, but I still don't feel good about the huge chunks of copy/pasted code. It can be particularly bad when inheriting a project where scripts were pasted haphazardly with little knowledge of what they're actually doing.

For the major three, I have an improvement that I cooked up using [Modernizr](http://modernizr.com)'s load function.

The old copy/pasted scripts:

```html
<!-- Twitter's copy/paste script -->
<script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>

<!-- Google+'s copy/paste script -->
<script type="text/javascript">
  ;(function () {
    var po = document.createElement("script")
    po.type = "text/javascript"
    po.async = true
    po.src = "https://apis.google.com/js/plusone.js"
    var s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore(po, s)
  })()
</script>

<!-- Facebook's copy/paste script -->
<script>
  ;(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1"
    fjs.parentNode.insertBefore(js, fjs)
  })(document, "script", "facebook-jssdk")
</script>
```

Can be replaced with one finely crafted `Modernizr.load()` call:

```javascript
Modernizr.load([
  "//platform.twitter.com/widgets.js",
  "//apis.google.com/js/plusone.js",
  {
    test: document.getElementById("facebook-jssdk"),
    nope: "//connect.facebook.net/en_US/all.js#xfbml=1",
  },
])
```

20 lines of code replaced with 7. A nice refactor in my opinion. And if you're not the Modernizn' type, you can always use the smaller underlying library, [yepnope.js](http://yepnopejs.com/).
