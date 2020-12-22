---
date: 2013-05-23
title: Instant Savings In Vim
---

I save text files hundreds of times every day. I hope to have a long career developing software, so anything I do hundreds of times a day needs to be as efficient as possible.

To speed up this oft-used task I added this little bit to my `.vimrc` today.

```vim
" Save all the things.
nmap <Leader>s :w<CR>
imap <Leader>s <ESC>:w<CR>
```

So what do these mappings do? Whether I'm in insert mode or normal mode, the key sequence `,s` saves the file.

First thing to note, is that I have my [leader key][] set to comma. So when looking at [my .vimrc file][], `<Leader>` can always be interpreted as a comma.

`nmap` defines a mapping in normal mode. `<Leader>s` is the _left hand side_ of this mapping. It's what triggers the mapping. `:w<CR>` is the _right hand side_ of the mapping. This is what is executed when the mapping is triggered.

So when I type `,s` vim executes `:w<CR>`, saving the file.

`imap` defines a mapping in insert mode. When in insert mode, we need to escape to normal mode before writing the file. Hence, the prepending `<ESC>` on the right hand side of the mapping.

To see more that you can do with mapping keys, Vim's `:help map` is a great place to start reading.

[leader key]: http://vimdoc.sourceforge.net/htmldoc/map.html#mapleader
[my .vimrc file]: https://github.com/danott/dotfiles/blob/master/vim/vimrc.symlink
