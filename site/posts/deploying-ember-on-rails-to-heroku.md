---
date: 2013-06-20
title: Deploying Ember On Rails To Heroku
---

Working with the [ember-rails][] gem and [Heroku][] require some application settings that aren't immediately intuative.

For ember-rails, you need to tell Rails which variant of ember to use. This is done in your application config.

```ruby
# config/application.rb

Sample::Application.configure do
  # ember-rails requires this setting in the Rails application.
  config.ember.variant = :production
end
```

Heroku doesn't play nice with the default Rails asset pipeline settings. You'll need to configure your Rails app to serve up the assets in production.

```ruby
# config/environments/production.rb

Sample::Application.configure do
  # Defaults to false. Heroku needs to serve the assets,
  # as there is no file system in Heroku.
  config.serve_static_assets = true
end
```

Also, in `config/environments/development.rb` you can set ember to use the development variant.

```ruby
# config/environments/development.rb

Sample::Application.configure do
  config.ember.variant = :development
end
```

And with that, deployment is as easy as `git push heroku master`.

[ember-rails]: https://github.com/emberjs/ember-rails
[heroku]: https://www.heroku.com/
