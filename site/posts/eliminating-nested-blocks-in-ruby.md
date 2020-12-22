---
date: 2013-09-13
title: Eliminating nested blocks while looping through Arrays in Ruby
---

Today I learned a new trick in Ruby that is useful for minimizing nested blocks.

Let's say you are trying to create a list of mutant animals from two arrays. One
array contains animals. The other array contains modifiers on those animals.
Here's how you might generate them using two `Enumberable#collect` calls:

```ruby
animals = ["Platypus", "Tiger", "Squirrel"]
modifiers = ["Duck-billed", "Bengal", "Flying"]

animals.collect do |animal|
  modifiers.collect do |modifier|
    "#{modifier} #{animal}"
  end
end.flatten
# => ["Duck-billed Platypus",
#     "Bengal Platypus",
#     "Flying Platypus",
#     "Duck-billed Tiger",
#     "Bengal Tiger",
#     "Flying Tiger",
#     "Duck-billed Squirrel",
#     "Bengal Squirrel",
#     "Flying Squirrel"]
```

That works just fine, but nested blocks can quickly become hard to follow. Also, that trailing `.flatten` can be easily missed when scanning the code.
This is where [`Array#product`](http://www.ruby-doc.org/core-1.9.3/Array.html#method-i-product) comes into play. `Array#product` gives every possible
combination of elements from all arrays. With this, your mutant-animal generator
can be re-written:

```ruby
animals = ["Platypus", "Tiger", "Squirrel"]
modifiers = ["Duck-billed", "Bengal", "Flying"]

animals.product(modifiers).collect do |animal, modifier|
  "#{modifier} #{animal}"
end
# => ["Duck-billed Platypus",
#     "Bengal Platypus",
#     "Flying Platypus",
#     "Duck-billed Tiger",
#     "Bengal Tiger",
#     "Flying Tiger",
#     "Duck-billed Squirrel",
#     "Bengal Squirrel",
#     "Flying Squirrel"]
```

The nested block is eliminated, and that easy-to-miss trailing `.flatten` is gone. Hooray.

I still don't quite understand how `collect` knows to look at array elements when the passed block takes two arguments instead of one. Can't find anything that alludes to this in the [docs](http://www.ruby-doc.org/core-1.9.3/Array.html).

It's [some kind of magic](http://rd.io/x/QVtm-TcYPEk/).
