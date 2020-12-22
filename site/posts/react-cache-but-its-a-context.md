---
date: 2019-09-30
title: Using React Context for Suspenseful Data Fetching
---

[react-cache][] is the future of `Suspense`-ready data fetching in React.
[Moving to Suspense][] from React Conf 2018 is a great place to get familiarized with these concepts.

Once the excitement sets in the readme of `react-cache` immediately brings you back to the ground:

> A basic cache for React applications. It also serves as a reference for more advanced caching implementations.
>
> This package is meant to be used alongside yet-to-be-released, experimental React features. It's unlikely to be useful in any other context.
>
> **Do not use in a real application.** We're publishing this early for
> demonstration purposes.
>
> **Use it at your own risk.**
>
> # No, Really, It Is Unstable
>
> The API ~~may~~ will change wildly between versions.

So the reference material is unstable. Can we satisfy the `Suspense` contract of throwing a `Promise` that will eventually resolve to a value using stable APIs?

The idea is to replace defining the cache, and reading from it with components and hooks.

```diff
-import { createCache, createResource } from "react-cache"
+import { CreateCache, createResource, useResourceRead } from "react-cache-but-its-a-context"

// Define a cache by mounting a parent
-var cache = createCache()
+<CreateCache>

// Defining a resource can stay the same
const Resource = createResource((id) => /* async work */)

// Read from the cache using a hook
- Resource.read(cache, id)
+ useResourceRead(Resource, id)
```

For a working baseline of `Suspense` I started from a [MVP][] that my partner-in-code [@chantastic][] made when introducing me to `Suspense`.
This MVP has suspensful data fetching working with `react-cache`.

Employing `React.createContext`, `useContext`, and `useReducer`, I arrived at [a working prototype][]!

<iframe src="https://codesandbox.io/embed/react-cache-but-its-a-context-701hz?fontsize=14" title="React Cache, but it&#039;s a context" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Here's what I think is cool about this approach.

### It works

Having something that sounds just stupid enough to work actually working is always a first point of satisfaction.

### It's not using unstable APIs

As forwarned, the `react-cache` API is going to change. Instead of forking the project, we _spoon_ it. If and when a blessed release of `react-cache` is made available, the integration points of `CreateCache`, `createResource` and `useResourceRead` are well defined for a transition from the home-grown solution to the community solution.

### Clearing the cache is solved 🤞

It's one of the hardest problems in computer science.
It's something I still don't know how to do with `react-cache`.

Since our cache is a object where the attribute names are cache keys and the attribute values are the resolved-or-resolving cache values, clearing the cache key is equivalent to deleting an attribute from an object.
Now, it's a little more complex than that to trigger a re-render, so I've added a cache clearing mechansim with the `useResourceClear` hook.
This hook returns a function that will clear the resource from the cache.

If we need to blow the entire cache away, React idoms have us covered. Re-rendendering `<CreateCache key={nextKey}>` with a new key creates a new instance of the component with fresh state.

### Caching layer cake 🍰

I didn't demonstrate this, but there's nothing stopping us from having layers of caching.
There would need to be some more wiring to pass cached key/values from an ancestor to a descendant.
I omitted such a utility to keep the example grokkable.
But because it's the composition, state, props, and context we're familiar with from React, it's all possible!

### Wrapping up

Should you use this in production?
_Maybe_.
It depends on your risk tolerance.

[Officially][], `Suspense` only supports `React.lazy`.
Unofficially it catches a thrown `Promise` and re-renders when resolved.
This strategy for data fetching is working on `react@16.10.1`.

If it were to stop working, our spooning integration points offer some solice.
`useResourceRead` could be re-implemented as a local-to-the component `useEffect` that loads data after the first render.
This would, of course, require changes to how the component renders since it would no longer be suspending...

That's the risk assesment.
How willing are you to re-solve this problem if `Suspense` changes how it resolves a thrown `Promise`?
The core team has been previewing `Suspense` long enough that I'm willing to accept what I perceive as low risk.

As with mileage, your tolerance may vary.

[react-cache]: https://github.com/facebook/react/tree/05dc814cf061796c54e3aab7dd18a1b54615fc6b/packages/react-cache
[moving to suspense]: https://www.youtube.com/watch?v=SCQgE4mTnjU
[mvp]: https://codesandbox.io/embed/jl67r9o2pv?fontsize=14
[@chantastic]: https://twitter.com/chantastic
[a working prototype]: https://codesandbox.io/embed/react-cache-but-its-a-context-701hz?fontsize=14
[officially]: https://reactjs.org/docs/react-api.html#reactsuspense
