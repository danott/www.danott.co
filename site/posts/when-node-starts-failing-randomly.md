---
date: 2019-01-04
title: What I Do When Node Starts Failing Randomly
---

Santa gave me the belated gift of a macOS upgrade when returning from Christmas break.
After installing macOS 10.14.2 things in my development environment started failing randomly.
These failures seemed to be orbiting around changes to my JavaScript code.

These things happen.
Mysterious build errors start popping up.
`yarn install` starts failing randomly.
It's a sickness with a few folklore remedies.

## Remedy One

```bash
# Remedy one: rebuild the local package
rm -rf node_modules && yarn install
```

My first recourse is to blow away the `node_modules` folder.
Nine times out of 10, this resolves the issue.

## Remedy Two

```bash
# Remedy two: rebuild node
brew reinstall node
```

My second course of action is to reinstall node.
This of course assumes that you're also using [homebrew][] to manage packages on your Mac.

## Remedy Three

```bash
# Remedy three: clear the caches
yarn cache clean
```

What is cached?
A bogus build?
A build for a previous version of node and macOS?
That's the thing about caching.
Who knows what was cached, why it was cached, and how stale it might be.
Since it's called a cache, let's blow it a way and let it re-warm itself.

This yarn command was new to me.
It seemed to solve my problem today... with a few warnings that Stackoverflow and Github issue folks tell me I can safely ignore errors from `node-gyp` when building `fsevents`.

I'm not one for ignoring loud errors, so I attempted to reinstall everything I could think of.

## Remedy Four

```bash
# Remedy four: uninstall and rebuild everything I can possibly think of

# Four point 1: Remove every node_modules folder I can find
cd ~/Code
find . -name "node_modules" -exec rm -rf '{}' +

# Four point 2: Remove every globall install node module
npm list --global --depth=0
npm uninstall --global [package] [names] [from] [last] [command] [except] [npm]

# Fourn point 3: Reinstall node and yarn
brew reinstall node
brew reinstall yarn
```

Even after this, `node-gyp` is still complaining when building `fsevents`. 🙃

## Remedy Five

Take the same steps as Remedy Four, but step down through node versions.
After trying 11, 10, and nine, I landed on eight.

```bash
brew uninstall node yarn
brew install node@8
brew install yarn --without-node
```

## In Sum

I've been working with node and npm for serveral years now, and I still encounter these upgrade-laden errors all the time.
Especially in the new year after a break, it's a bummer to be working on tooling rather than building awesome things.
I'm writing this down because I'd like to internalize how to quickly move past node environment problems and get productive again.

For now, I'll stick to Node 8.

There are probably better solutions to these post-upgrade problems.
If you know any, please tell me.

[homebrew]: https://brew.sh
