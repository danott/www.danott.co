---
date: 2020-01-13
title: Seeding a Rails Development Environment with Test Fixtures
summary: How to share default application data across multiple environments. Fast!
tags:
  - ruby
  - rails
---

I'm a big fan of doing things _The Rails Way_.
Sticking with `erb` as the templating language.
Continuing with `minitest` instead of reaching for `rspec`.
Using [ActiveRecord fixtures][] instead of employing the `factorybot`.

This is not an indictment of the alternative solutions.
They have their place, and competition drives innovation.
But I've found leaning hard into _convention over configuration_ has continued to pay dividends, so I'm going to keep investing.

`ActiveRecord` fixtures are typically associated with testing.
But there's a command to load them into any environment...

```bash
RAILS_ENV=development bin/rails db:fixtures:load
```

This will take the test data and shove it into the development environment.

The Rails convention for loading default data into the environment is `bin/rails db:seed`.
This command loads the environment, and executes the file `db/seeds.rb`.

I like the ideal of `bin/rails db:seed` being a command you run one time when setting up a project.
If it's ever being invoked again, it means that I'm wanting to start over from ground zero.

Building on this opinion of the world, this is what a typical `db/seeds.rb` file looks like in one of my Rails projects.

```ruby
# db/seeds.rb
def load_fixtures
  Rake::Task["db:fixtures:load"].invoke
end

def confirmed?
  return true if ENV["CONFIRM_FIXTURE_LOAD"]

  puts <<~EXPLAIN
    ERROR!

    Loading fixtures into the database will clobber all existing data in the tables.
    To confirm this is what you want to do, set the environment variable CONFIRM_FIXTURE_LOAD

        $ CONFIRM_FIXTURE_LOAD=yeppers bin/rails db:seed
  EXPLAIN

  false
end

load_fixtures if confirmed?
```

Now you can have your cake and eat it to.
Where your cake is your test environment.
And eating it is your development environment.

I like this for a few reasons.

1. Loading fixtures is fast. Like, wicked fast.
2. With a great upside of speed, comes the great downside of blowing away any data you might care about. Where the raw `bin/rails db:fixture:load` lacks, wrapping it with confirmation communicates the downside to the future self.
3. It captures the opinion that `bin/rails db:seed` should be for setting up a project, not migrating over time.
4. It's sure to work. If the tests are passing, the fixtures are loading into the test database, which means they'll load into the development environment too.

There is a downside.
Hand-crafted artisinal `YAML` can be a real pain point when dealing with lots of data, complex associations, join tables, etc. I've got some strategies for overcoming that downside, but that's another post.

[activerecord fixtures]: https://api.rubyonrails.org/v6.0.2.1/classes/ActiveRecord/FixtureSet.html
