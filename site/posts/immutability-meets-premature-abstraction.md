---
title: Immutability, Meet Premature Abstraction
date: 2020-12-22
layout: default.njk
redirect_from: /immutability-meets-premature-abstraction/
---

# Immutability, Meet Premature Abstraction

[Cool URLs don't change][].
One could say, they're immutable.
Publishing _something_ at a URL is a commitment to maintaining it forever, if you want to be _cool_.
So up front design of URLs is worth the investment?

Observing the cool URLs of other websites in [my blogroll][], there's a ton of freedom in how to structure a URLs.
[Derek Sivers' blog][] contains an index of entries, but clicking into an individual entry is _just_ a `/:slug`, such as [/250k][].
[Frank Chimero's blog][] prepends only the year, resulting in `/:year/:slug/`.
[Hans Gerwitz's writing][] and [notes][] both expand to `/:year/:month/:date/:slug`.

There's no _right_ way to design a URL.
Considering the things I want to bring over to this site, along with those I want to produce in the future, it feels like abstracting up front is necessary.

Making everything look the same is the easiest path towards abstraction.
But for many writings, I don't really care about _when_ it was written.
But I also acknowledge that associating dates with content is valuable for establishing context.
Again, with the resistance towards blogging assumptions of a date-based URL structure.

There's some content I've produced that is very journal-like.
"Today I Learned" entries have historically lived at `/today-i-learned/:year-:month-:day/`.
Because of highly productive seasons, granularity down to the day is necessary.
Transitioning to a `/:year/:month/:day/today-i-learned` format seems like it could be useful.

There's other writings that depend less on the day.
These have lived at `/posts/:slug`.
They haven't historically contained the date, but they could.
I'd lean towards a year as the only necessary context.
But adding the month and the day could make everything look the same.

An idea on my back burner has been adding a place to publish tweet'ish notes.
A stream of small thoughts, that is very time dependent.
Borrowing the "Today I Learned" format of `/:year/:month/:day/note` breaks down if I ever want more than one in a single day.
It could be expanded to `/:year/:month/:day/:24_hour_time/note`.
Maybe something as dumb as `/notes/:unixtimestamp` is sufficient?
Also, why make `/:year` the root?
Maybe the current structure of `/today-i-learned/*` is better, and `/notes/:some_identifier` would be better suited?

Defining the buckets up front can be problematic.
The thinking gets constrained to having to produce entries that fit in existing buckets.
Or spin up an entire new bucket, that may only have one entry.

Time is always passing.
No matter what is being written, it happens at a moment in time.
Perhaps a reverse chronological listing of content by the date it was produced is the lowest cost organizational solution.

My deep-established roots of web development have me preferring URLs that are as useful for humans as they are for computers.
Establishing context when reading a URL is potentially helpful.
If I text a link to `/2006/03/14/pi-day`, there's a lot of information.
Telling someone "go to slash two-thousand and six, slash zero three, slash fourteen, slash pi day, without the e, on my website" when sharing away from computer is exhausting.
It'd be much easier to say "go to slash pi day, without the e".

It's all kind of moot.
Those situations are hypothetical.
And redirects are another building block of the internet.
As long as I maintain a file of redirects, I can establish and change URLs whenever the design demands it.

[cool urls don't change]: https://www.w3.org/Provider/Style/URI.html
[my blogroll]: /blogroll/
[derek sivers' blog]: https://sive.rs/blog/
[/250k]: https://sive.rs/blog/
[frank chimero's blog]: https://frankchimero.com/blog/2020/now/
[hans gerwitz's writing]: https://hans.gerwitz.com/writing/
[notes]: https://hans.gerwitz.com/notes/
