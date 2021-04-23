---
date: 2020-12-11
title: Starting Over
layout: default.njk
redirect_from: /starting-over/
---

# Starting over

I've had a personal website in one form or another since the previous millennium.
That's a dramatic way to phrase it.
But it is true.

1999 is when I first book-ended a "p" with magnitude comparison symbols, creating an HTML paragraph tag.
I then surrounded a sentence of words with a pair of opening and closing paragraph tags.
Semantic markup.

Paragraphs.
Headings.
Lists.
Images, even.

It was exhilarating.
The thoughts in my head traveled through my fingers to become words on a screen.
Not only _my_ screen.
I could send a link in AOL Instant Messenger, and now my buddies could see my thoughts on their screen.
And we could dialogue about it.

Somewhere along the way, things got overly complicated.
The baggage started weighing me down.
Because [cool urls don't change][], I became hesitant to put anything out there.

1. Honoring this axiom meant each contribution was a commitment to endless support.
2. Living this virtue meant each systemic change required not only introducing something new, but migrating everything that already existed.

Now, now.
These are just HTML files on a server.
I'm making a bigger deal of this than necessary.
But the resistance is real.

I've spent the last [unquantifiable but more than I'd like to admit] years tinkering with the system.
Textpattern, to Wordpress, to Jekyll, to Gatsby, to Rails, to Eleventy, to indecision.
All in service of _the perfect writing system_.
All the while, not much of the writing!

I'd get to something that feels decent.
But it was optimized for bringing along everything that already existed.
Publishing new ideas was an afterthought.
Optimization for feeling stuck.

My happy middle ground, for now, is to use a different domain.
My historical content lives on at `https://www.danott.co`, so I don't break links to the few things that have found utility in the lives of others.
Maybe they will migrate over here at some point in the future.
With 301 redirects to boot.

Maybe not.
Maybe I'll be a bad Internet citizen, and leave a legacy of some uncool URLs.
It's a personal website, not the Library of Congress.

## Constraints

As I embark on this exploration, I feel it will be helpful to set some constraints to avoid the endless cycle of noble procrastinations.
If you see me breaking these constraints, you have permission to ask me why.

### [Eleventy][] is going to be my build tool.

All these static site generators have their tradeoffs.
I've messed with with them enough to know that.
The time has come to make a decision, accept the trades, and go.

I keep _wanting_ to reach for [Nanoc][] or [Jekyll][], because I'm a Rubyist at heart.
But Eleventy's data cascade has won me over.
The wide support for async operations within the system will be sufficient for any non filesystem data needs I dream up in a bout of constrained resistance.
I'm comfortable with my competence in JavaScript, even if I still prefer Ruby.

### Develop in the open.

My entire career hinges on the existence of `View Source` in the early days of the internet.
It's what got me excited in the early days.
I've wanted to have a publicly accessible git repository for my personal website for a while, to pay it forward.
But because of all the _baggage_ in my existing repositories, I've hesitated to open them up.

Maybe I accidentally committed API credentials years ago before I knew that was a bad idea, and they'd be leaked.
Hypothetically I had some non-indexable pages that were published for limited audiences, living in the git history.

By starting in the open, I'll have a mindset of being publicly available on the internet shaping things as a I go.
Anything that needs to be private will incur the cost of privacy, without weighing down the open system.

### Small commits.

It's the way I work everywhere else.
But in personal projects, it's easy to fall out of the habits that drive successful communication elsewhere.
I'd like to keep commits small.
Showing the thought process is a great teaching tool.

I'd also like to consume them as actual content on the website.
Perhaps as the CHANGELOG or the source of an RSS feed.

## Okay, now what?

This is the first Markdown file of many.
I've resisted the label, but I think what I'm building towards is a _weblog_.
"Call it _articles_; or _notes_...anything but _blog_!" is what my inner self screams.
But I want to foster a writing habit.
One that is open to any subject that has captured my attention that day.
So I'm resigned to the fact that I'm starting a blog, even if I resist the word.

"Digital garden! Dates don't matter" is another flare fired off to resist publishing.
But dates do matter.
The author's intended meaning hinges on the historical context.
So while I don't necessarily want to restrict display to chronological order, I do want to keep the context of when things were written, and how thoughts changed over time.
Availability of dates, without emphasis on them, seems to be a happy middle ground.

## Okay, but now what, really?

We'll see.
The time has come to hit git commit on this first post.
With a little bit of configuration in Netlify and GitHub, this page will be available at [www.danott.co][], and it's source at [github.com/danott/www.danott.co][].

[cool urls don't change]: https://www.w3.org/Provider/Style/URI.html
[eleventy]: https://www.11ty.dev/
[jekyll]: https://jekyllrb.com
[nanoc]: https://nanoc.ws
[www.danott.co]: https://www.danott.co
[github.com/danott/www.danott.co]: https://github.com/danott/www.danott.co
