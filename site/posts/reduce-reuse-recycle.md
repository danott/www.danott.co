---
title: Reduce, Reuse, Recycle
date: 2017-08-09
tags: medium
---

The sentiment I recall is that recycling will fix all our problems. “Reduce, reuse, recycle” was the parlance of our childhood, and it stuck in my impressionable little millennial brain.

Now my body is bigger, and my little brain still recalls this phrase, but today I’m thinking about React. Specifically, I’m thinking about how resuse is overrated. We overestimate how often we’re going to reuse things. Because everything is a component, we conflate the idea that everything needs to be reused. It doesn’t.

So here’s the plan:

- Reduce the time spent trying to write the generic component. You’re betting on the unknown future, and you aren’t going to need it.
- Reuse less than you think you should. A lot of duplication is incidental.
- Recycle components into new components. Shamelessly copy/paste that render function. In doing so, you’ll see all the unique snow flakes that the panacea would need to serve. Then you’ll have enough information to write that reusable component based on the known use cases.

If you liked this article, be sure to share it on the internet’s social media. It helps my personal brand.
