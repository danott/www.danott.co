---
date: 2019-10-05
title: Server-generated React Responses
---

[Server-generated JavaScript Responses][] is the most foundational Rails idiom you've possibly never read.
Six years later it remains informative for weighing the cost of going with (or against) the grain of what Rails is good at.
Rails reigns as the best tool for rendering structured forms, processing the submission of those forms, and responding with the new state of the world.
Providing a partial `DOM` update with a server-generated JavaScript response delivers on the pitch of making experiences feel fast enough without requiring your team to add a new technology to your stack.

## Six Years Later

This approach begins to feel uneasy when an `app/views/dodads/update.js.erb` template gains more and more imperative responsibilities.
In addition to adding the new `@message` record to the list and highlighting it, what if we wanted to clear the form?
What if saving `@message` fails, and we want to communicate errors?
I've written, approved, and shipped plenty of `update.js.erb` templates that end up looking something like:

```erb
<% if @message.persisted? %>
  $('#messages').prepend('<%=j render @message %>');
  $('#<%= dom_id @message %>').highlight();
  $('form#<%= dom_id Message.new %>').reset()
<% else %>
  $('#<%= dom_id @message, 'errors' %>').replace(
    '<%= j render partial: "generic_errors", errors: @message.errors %>'
  )
<% end %>
```

Add a few more conditionals or animations and you'll arrive at the crossroads where a team wants to exchange the imperative management of `DOM` nodes with a declarative tool like React.

## Introducing React

Something unintentional happens when the decision gets made to introduce React.
The Server-generated JavasScript Response baby gets thrown out for the new hotness bathwater.
An assumption creeps in that moving views from server rendered `ERB` templates to client rendered React components implies replacing our battle tested (and integration tested) Rails CRUD controllers with yet-to-be built `JSON` apis.

This assumption is mistaken.

So what might Server-generated React responses look like?
Let's take the `index.html.erb` and `update.js.erb` templates from the original post and change it to render a React component.
Let's call this hypothetical component `MessageList`.

```diff
 <%# app/views/messages/index.html.erb %>
 <h1>All messages:</h1>
-<%# renders messages/_message.html.erb %>
-<%= render @messages %>
+<div id="messages"></div>
+<% javascript_tag do %>
+  ReactDOM.render(React.createElement(
+    MessageList, {
+      messages: <%= @messages.map(&:attributes).to_json %>
+    }
+  ), document.getElementById("messages"));
+<% end %>

 <%# app/views/messages/update.js.erb %>
-<%# renders messages/_message.html.erb %>
-$('#messages').prepend('<%=j render @message %>');
-$('#<%= dom_id @message %>').highlight();
+ReactDOM.render(React.createElement(
+  MessageList, {
+    messages: <%= @messages.map(&:attributes).to_json %>
+  }
+), document.getElementById("messages"));
```

Immediately the `index.html.erb` and `update.js.erb` start to look very similar.
Rails traded away the responsibility of knowing what to insert, where to insert it, what to highlight, and how to highlight it.
Rails gained the responsibility of reloading the entire state of the `Message.all` world into the `@messages` instance variable.

Now let's address our product's need to communicate errors if the `@message` doesn't save.

```diff
 <%# app/views/messages/index.html.erb %>
 <h1>All messages:</h1>
 <div id="messages"></div>
 <% javascript_tag do %>
   ReactDOM.render(React.createElement(
     MessageList, {
+      errors: <%= @message.errors.full_messages.to_json %>,
       messages: <%= @messages.map(&:attributes).to_json %>
     }
   ), document.getElementById("messages"));
 <% end %>

 <%# app/views/messages/update.js.erb %>
 ReactDOM.render(React.createElement(
   MessageList, {
+    errors: <%= @message.errors.full_messages.to_json %>,
     messages: <%= @messages.map(&:attributes).to_json %>
   }
 ), document.getElementById("messages"));
```

Now a pattern is emerging.
We're passing the state of the world from Rails to React.
Rails is the brain where application logic and state lives.
React is the dumb renderer.

## Why does this matter?

All we did was move some rendering from an `ERB` partial to a React component.
We didn't fundamentally change the server/client communication of our Rails application.
We never had to `bin/rails generate controller api/messages` or `require("axios")` to begin producing and consuming an api.
We dipped our toes into a client-side rendering experiment for one high-fidelity view.

When the JavaScript sprinkles start melting the answer is not a sprawling project to build a `JSON` api.
Selling your team on rewriting the application to a `JSON` api is too large a bet, and you're likely to introduce regressions.
Replacing the rendering responsibilities of two `ERB` templates with one component is a low-risk move that gives React the opportunity to prove it can carry it's own weight as you add it to your stack.

You don't have to ditch [Rails UJS][] and `data-remote="true"` to get started.
My team has written high-fidelity forms that are rendered with `ReactDOM.render`, submitted using `data-remote="true"`, and respond with a `ReactDOM.render` to communicate the result.
These forms have been chugging along for a few years now, serving our customer's needs.
This hybrid approach of Rails UJS and React is not going to win any awards for functional paradigm purity.
But we're not submitting for that award.
Our reward is customers paying us because they trust the reliability, and our team feeling confident to make changes with deterministic results.

## ⚠️️️ Security ⚠️

A quick note about security.
The `diffs` above are presented to be minimal.
If you ever begin rendering `<%= @record.to_json %>` within `ERB` templates, do it securely by wrapping it with `<%= raw(json_escape(@record.to_json)) %>`.

If you think you'll be calling `ReactDOM.render` a lot, feel free to grab this [ReactHelper][] that I've found useful.

## What's next?

There's a few React idioms and happy accidents to share that make this approach very powerful.

Try experimenting with React state and multiple calls to `ReactDOM.render`.
I was blown away when I learned the state is maintained between calls, because React doesn't care if you're re-rendering and diffing props at a root, or deep in a tree.
Watch the state get blown away when you need it to by calling `ReactDOM.render` with a new [key prop][].

Explore the concept of controlled and uncontrolled components.
With an idiomatic prop such as `defaultMessages`, some React state, and a little hook around diffing a `candidateMessage` prop, we could revert form passing the entire `@messages` collection to passing the maybe-created `@message` and earn back our performance gain.

Try building a high-fidelity form that doesn't submit to a `JSON` api, but submits to a Susan-boring-stories<sup>[^1]</sup> Rails controller using [react-rails-form-helpers][] and [Rails UJS][].

Dive deeper into the Rails way and build your props with [JBuilder][].

## Too Long; Scrolled to the Bottom:

There's a lot of ground to explore for integrating React and Rails without assuming a Single Page App and a `JSON` api.
When you want to employ React for high-fidelity views, don't trade away the things Rails has become extremely good at over the last fifteen years.
Take smaller steps.

[server-generated javascript responses]: https://signalvnoise.com/posts/3697-server-generated-javascript-responses
[@dhh]: https://twitter.com/dhh
[reacthelper]: https://gist.github.com/danott/6fadcb5ac8dba6ec539f8bdafceaa123
[jbuilder]: https://github.com/rails/jbuilder
[react-rails-form-helpers]: https://github.com/danott/react-rails-form-helpers
[rails ujs]: https://github.com/rails/rails/tree/master/actionview/app/assets/javascripts
[key prop]: https://reactjs.org/docs/lists-and-keys.html

[^1]: _"Susan Boring Stories"_ is a Tom Haverford'ism from [Parks & Recreation 203 ("Beauty Pageant")](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?tv-show=parks-and-recreation&episode=s02e03). The Susans of the world, like Rails, get overlooked because they lack the flash and pomp of other contestants.
