---
date: 2019-11-09
title: Good Enough to Ship
---

In 2011 there were two technologies I was fairly excited about.
Mobile Safari’s ability to add a bookmark to your home screen and the (now defunct) [HTML5 Application Cache][] were getting me hyped about building small web apps that could live side by side with native apps on the home screen of iOS.

The idea I decided to pursue was **Scabbard**: a tool for memorizing passages of scripture.

## A working prototype

The first version was a few HTML files, some jQuery, the hand-rolled manifest file, and a PHP script to find passages using the ESV’s API.
It was FTP’able to Dreamhost, and it worked, for the most part.
Manually handling the Application Cache was, as predicted, very painful and hard to diagnose when things behaved weirdly.
But I could install to my home screen, and it worked offline, barring some bugs in understanding the manifest file.

## Ambitions

For motivations I cannot recall anymore I decided this was _not good enough_.
I felt compelled to add complexity.
I wanted to add user accounts so others could use the tool and sync their list of passages between devices.
I wanted to gracefully upgrade from a guest account on one device to a full blown account with a password.
I wanted to make sure the app was never impacted by API throttling under hypothetical heavy load.

So in 2013 I ran `rails new scabbard` and got to work.
Viewing the commit history of [scabbard-rails][] is both nostalgic and disheartening for me.
It provided a small domain to play with different ideas, both client side and server side.
Experiments in hypothetical scaling were fun, but I was no longer actually using the tool to form the habit of memorizing passages.

The commit history tells the story of going from EmberJS to BatmanJS to “Rails Sprinkles” to React.
It also tells the story of introducing Ruby objects to solve the hypothetical load problems of others beginning to use the web app.
I never got around to offline support which was the chief motivation when I initially set out to build this small utility.

While I had shipped this app to Heroku, in all this time I hadn’t really been making use of it.
The cold start of Heroku was just annoying enough to not want to launch the app.
This could have been solved with offline support, but I never got around to it.

Another tangent along the way was building [scabbard-api][] in `Golang`.
The idea was to replace the PHP script with something even faster (as if the runtime was the bottleneck in calling a remote API 🙃).
I never did anything with this.

## Revisiting

Recently I recalled the desire to form this habit.
I was flying solo with my kids while my wife was enjoying a weekend away.
On Saturday afternoon I ran `create-react-app scabbard`.
I built a single [Netlify Function][] to look up passages of scripture using the ESV’s API.
By the time I laid my head on the pillow, I had a fully deployable, offline capable web app installed to my home screen.

It is intentionally limited in scope.
My goals for day one were:

- It should work online and offline
- It should launch to whatever screen I was looking at when I last visited the app

This speed from desire to shipping is a testament to a few things.

- The tooling around [Progressive Web Apps][] that is baked into `create-react-app` carried a huge amount of the load. This is an amazing tool, and I cannot believe this is the first time I’ve ever used it. I’ve been missing out!
- [Netlify][] has made deploying a static sites painless. The templates provided by `netlify functions:create` are very helpful for getting a first lambda function up-and-running.
- My approach to solving problems has changed in the last 8 years. I used to try to imagine every possible problem and feature, and solve them up front. Now I optimize for getting the smallest possible win shipped, then iterate with small steps.

There are a few niceties I could add such as updating the screen when there’s no network connection and searching is absolutely going to fail.
I'd like to refine the UI a bit for aesthetic purposes.
My mind is already generating ideas about how I could use the [HTML5 FileReader][] API to export and re-import a list when changing devices.
But for a weekend of solo parenting, shipping the bare bones was good enough.

- [scabbardapp.com](https://www.scabbardapp.com)
- [danott/scabbardapp on GitHub](https://github.com/danott/scabbardapp)

[html5 application cache]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[scabbard-rails]: https://github.com/danott/scabbard-rails
[scabbard-api]: https://github.com/danott/scabbard-api
[netlify function]: https://functions.netlify.com
[progressive web apps]: https://developers.google.com/web/progressive-web-apps
[netlify]: https://www.netlify.com
[html5 filereader]: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
