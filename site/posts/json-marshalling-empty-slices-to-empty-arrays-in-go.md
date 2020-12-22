---
date: 2014-06-02
title: JSON Marshalling empty slices to empty arrays in Go
---

Today I came across a small gotcha in Golang.

I'm building a small JSON service that returns an array of IDs. Sometimes it is
acceptable for this array to be empty, and in turn the service should return an
empty array.

On the Go side of things, I am using a slice of integers (`[]int64`) to
represent my ids. When my slice was empty, the endpoint was returning
`{"ids":null}` rather than the desired `{"ids":[]}`.

The reason for this, had to do with how my `[]int64` was initialized.

I was initializing with `var ids []int64`. This is in fact, a nil pointer, so it
makes sense that when it is automatically `json.Marshal`'d, it goes to `null`
instead of `[]`.

The solution was to initialize with `ids := make([]int64], 0)`.

The difference in these two ways of initializing a variable can be seen [on the
go playground](http://play.golang.org/p/zDLyXcc8ie).
