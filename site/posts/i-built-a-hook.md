---
date: 2019-01-18
title: I Built a Hook
---

The React 16.8 alpha introduces [hooks][]!
I've used them, and they're everything I've dreamt about for composing state and side effects.

But that's not what I'm talking about today.
I'm talking about [Git hooks][].

Specifically, I'm talking about using a git pre-commit hook to automatically format all my code.

Why would I want to do this? It starts with `go fmt`.

A few years ago, I was writing [Golang][] (Go).
One thing I loved about Go was the opinionated, automatic formatting of code with `go fmt`.
It was baked into the language.
There were no configuration options.
Most importantly, it eliminated an entire category of preference motivated bike-shedding that gets in the way of shipping useful tools to people.

In more recent years the Javascript community caught wind of this idea.
[James Long][] (and a whole bunch of contributors) gave us [Prettier][].
It wasn't baked into the language.
But it was opinionated.
I was happy to embrace these opinions to reap the benefits I'd discovered in Go.

I spend most of my time in Ruby.
I want the experience I've found in Go and Javascript in Ruby.
In very recent history, [Justin Searls][] proposed [standardrb][] for Ruby code.
With my postive experience embracing formatters, I am ready to go all in on standardrb.

I've run into one hurdle formatting Ruby code.
It's comparatively slow.
While `go fmt` and `prettier` have been fast enough to format-on-save in VS Code, `standardrb` seems to be just slow enough to make the experience jarring.

So with Ruby, I decided formatting my code on commit is good enough.

I borrowed from [prettier's example pre-commit hook][], and built the equivalent for `standardrb`.
I then combined the two to make my one pre-commit hook to rule them all.

They're all wrapped up in [a gist][].
I'll probably be dropping this into many of my projects going forward.
So far as an individual contributor, it just works!

[hooks]: https://reactjs.org/docs/hooks-intro.html
[git hooks]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
[golang]: http://golang.org
[prettier]: http://golang.org
[test double]: https://testdouble.com
[justin searls]: https://mobile.twitter.com/searls
[standardrb]: https://github.com/testdouble/standard
[james long]: https://mobile.twitter.com/jlongster
[prettier's example pre-commit hook]: https://prettier.io/docs/en/precommit.html#option-5-bash-script
[a gist]: https://gist.github.com/danott/25c2bcb76697747f8ada23bd7c1d52d0
