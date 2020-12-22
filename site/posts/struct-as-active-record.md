---
date: 2013-06-27
title: Struct as ActiveRecord
---

I was working on a small project this evening that required a small set of tightly coupled data, that needed to be easily retrieved by a key. I wanted to able to retrieve and work with objects in a way that is ActiveRecord'esque, without all the overhead.

What I came up with was this.

```ruby
Author = Struct.new(:key, :name, :url, :twitter)
class Author
  class AuthorNotFound < StandardError; end;

  @@authors = Hash.new { raise Author::AuthorNotFound }

  def initialize(*)
    super
    @@authors[self.key.to_s] = self
    return self
  end

  def self.find(key)
    @@authors[key.to_s]
  end
end
```

There are several things going on here to make this work.

Firstly, we declare a standard [Struct](http://www.ruby-doc.org/core-2.0.0/Struct.html) for the coupled attributes we care about. This will provide us with objects that have methods (`author.name`), rather than hashes that have keys (`author[:name]`).

Secondly, the class is re-opened to add methods. I went this route rather than passing a block to `Struct.new`, because the former gave warnings that I didn't care to look at.

`AuthorNotFound` exists to mirror the behavior of `ActiveRecord` raising a `RecordNotFound` error.

`@@authors` acts as the stand-in for the database in ActiveReocrd. This class variable will store all the Author records that are created. It is a simple ruby [Hash](http://www.ruby-doc.org/core-2.0.0/Hash.html), with one exception (pun intended): when a key isn't found, it raises our `AuthorNotFound` error.

Overriding the initializer has a little Ruby magic. We use the [naked splat](http://www.rubytapas.com/episodes/86-Naked-Splat) technique to crete the object as usual, but we then put the new object into our 'data-store' of authors (@@authors) for retrieval later. We then return the object per standard behavior.

And lastly is the `Author.find` method. This will retrieve any created Author by key, or raise an exception.

With all this built, we can start creating small sets of authors and finding them as needed.

```ruby
Author.new(:danott, 'Dan Ott', 'http://danott.co', 'danott')
Author.new(:mattox, 'Mattox Shuler', 'http://mattox.cc', 'mattoxshuler')
Author.new(:jabronus, 'Noah Jacobus', 'http://noahjacobus.com', 'jabronus')

Author.find(:danott) # => #<Struct Author key=:danott, ...>
Author.find(:turd_ferguson) # => raises Author::AuthorNotFound
```

I find this technique to be much more reliable than passing around sets of parallel hashes. The explicit naming of attributes helps define our application's requirements. Objects with methods are much easier to read than hashes with keys at a glance. Throwing the custom exception will more clearly communicate what expectations are not being met to a future developer (myself or otherwise).

Less time spent to understand a piece of code in the future means more time for building cool stuff. I like building cool stuff.
