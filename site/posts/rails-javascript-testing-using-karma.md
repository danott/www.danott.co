---
date: 2013-06-12
title: Rails Javascript Testing Using Karma
---

Employing [Guard][] and [Rspec][] for test driven development is a regular part of our workflow while building [Planning Center Resources][]. Our test coverage in Ruby is good, and we want to bring that same level of quality assurance and productivity to our JavaScript code. We set out to establish test coverage with the following requirements.

1. **Readable** &mdash; readable tests act as an enforced requirements document as you add team members or return to code long after you've written it.
2. **Writable** &mdash; writable tests empower you to actually grow your test suite as your source grows.
3. **Fast** &mdash; fast tests increase developer productivity.

The first two requirements are easily satisfied using [Jasmine][]. I compared Jasmine and [QUnit][], and Jasmine wins out for the natural readability of it's assertions. Side-by-side with Rspec, Jasmine feels like a consistent test suite for our application.

To make things fast, we're using [Karma][]. Karma is a project birthed out of [Angular][], with a goal of running fast tests. Good fit.

## Installing Karma

Karma is distributed using Node and npm. Utilize [Homebrew][] to make this step simple.

```bash
brew install node
npm install -g karma
```

Run `karma start` to check if Karma successfully installed. If it didn't, check your `PATH` and the usual unixy stuff.

## Configuring Karma

Karma ships with a nice helper for generating a configuration file. But before you generate it, you'll want to create a little structure for your tests.

We created the following folders:

```bash
spec/javascripts/
spec/karma/config/
```

This is all a matter of preference, but having all our files live under spec folder makes sense for us.

`spec/javascripts/` will hold our Jasmine tests.

`spec/karma/config/` will hold our Karma configuration files

You can now generate your configuration using Karma's init helper:

```bash
karma init spec/karma/config/unit.js
```

You'll get all the standard fare here. Karma has great documentation for their configuration file. If you want to get up and running with Karma, it is worth your time to see all the options available. A basic file will look something like this.

```js
// spec/karma/config/unit.js

// set basePath to Rails project root
basePath = __dirname + '../../../';

autoWatch = true;

files = [
  JASMINE,
  JASMINE_ADAPTER,
  http://rails.dev/assets/application.js,
  spec/javascripts/*_spec.js
]
```

Go ahead and create a dummy test file to run and see things are working.

```js
// spec/javascripts/sample_spec.js

describe("RegExp", function () {
  it("should match", function () {
    expect("string").toMatch(new RegExp("^string$"))
  })
})
```

Run your tests using `karma start spec/karma/config/unit.js`. Assuming you're serving up your Rails app using [pow][] at `http://railsapp.dev`, this works as expected. You can edit `spec/javascripts/sample_spec.js` file to see that the tests will automatically re-run. Cool.

For TDD, we also want tests to run when source files in `app/assets/javascripts/` change. This won't happen with our setup, because Karma has no way to watch the file served over HTTP. Your first thought might be to change the `files` configuration to load `app/assets/javascripts/application.js`, but that won't work because Karma has no concept of [Sprockets][] or its require directives.

## Bridging the Gap

Taking a closer look at the Karma file configuration docs, a solution to get things talking is pretty simple.

```javascript
// spec/karma/config/unit.js
files = [
  JASMINE,
  JASMINE_ADAPTER,
  http://rails.dev/assets/application.js,
  spec/javascripts/*.js,
  { pattern: 'app/assets/javascripts/*.js',
    watched: true,
    included: false,
    served: false }
]
```

We add a pattern for files that are not loaded into the test suite, but are watched for changes to re-run the tests. With this addition, now whenever something in `app/assets/javascripts/` changes, the Karma tests are re-run automatically. Cool.

## What's Next

Right now all the tests are super fast, running in under half a second. As the test suite grows, we'll want to put more logic around matching source files to test files so we can run only those tests related to what we're editing for fast TDD.

For starting a JavaScript test suite, this is great solution to get us up and running with room to grow.

[guard]: http://guardgem.org/
[rspec]: http://rspec.info/
[planning center resources]: http://get.planningcenteronline.com/resources/
[jasmine]: http://pivotal.github.io/jasmine/
[qunit]: http://qunitjs.com/
[karma]: http://karma-runner.github.io
[angular]: http://angularjs.org/
[homebrew]: http://mxcl.github.io/homebrew/
[pow]: http://pow.cx
[sprockets]: https://github.com/sstephenson/sprockets
