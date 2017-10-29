---
layout: post
title: "Creating a blog with Github Pages"
date: 2017-10-29
author: dsc
categories: github jekyll
---

I have been wanting to make a Github blog, and have been putting together a list of posts for the last three years. 
I finally took the plunge, and managed to put a site together, despite not really understanding what I was doing. Github is a site for 
version control, and therefore an excellent place to store code. Each Github user has some free space to make a website. These websites 
are static, which means they are not connected to a database \(so, for example, it would not be possible to save a list of usernames and 
passwords which people could use to log in.\)

However, Github does support a static site generator called <a href="https://jekyllrb.com/">Jekyll</a>, which makes it possible to automate parts of your website. 
For example, if you write a blog post and tell Jekyll what you are doing, you can choose any categories for your post and it will add 
them to its list of categories when the site is generated.

I intend to use the blog as a portfolio of work, record of learning, and place to post tutorials on statistical topics. 
In particular, I have written a large number of posts on Crossvalidated \(Stackoverflow for statistics\) and I would like to elaborate 
on some of these. I also have a few old posts on Blogger which I would like to recycle. \(Although Blogger supports Mathjax, its styles 
are not fully customizable and it has distracting ads.\)

Here are the steps:

* I started with the excellent <a href="http://jmcglone.com/guides/github-pages/">tutorial by Jonathan MacGlone</a> (this is also where I 
learned about the possibility of 
blogging on Github pages in the first place.) I highly recommend following this tutorial to the letter.
I wanted to find a style of blog which looked nice on my laptop and phone, so I searched among existing Github blogs, and found a 
<a href="http://bruceeckel.github.io/">blog 
by Bruce Eckel</a>. I make a fork of the code \(meaning I copied it over to my new Github account verbatim\) 
and then altered some things to get it closer to what I wanted.

This step is also highly recommended! One benefit of open source tools is being able to see what working code looks like.

* Code listings are fairly easy to do in Github pages, but I also wanted support for mathematical equations. The default equation style 
in HTML isn’t too bad, but I wanted to use LaTex if possible. This can be done with Mathjax, and it’s a fairly simple matter of 
including it in a separate file. There are a couple of tutorials available via a Google search \(I can’t remember which one worked for 
me but <a href="http://csega.github.io/mypost/2017/03/28/how-to-set-up-mathjax-on-jekyll-and-github-properly.html">this</a> is useful.)

Here is an example of part of a markdown file including LaTex:

```
The density of $X$ is \[ f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp(-\frac{(x-\mu)^2}{2\sigma^2}) \]
```

and how it is rendered on the page:

The density of $X$ is \[ f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right) \]

* I needed an RSS feed because I want my blog to be indexed \(eventually\) at <a href="https://www.r-bloggers.com/">R-Bloggers</a>. 
This again was very simple. However, be warned that the RSS feed does not display properly in Chrome since it is an XML document.

* Adding comments using <a href="https://disqus.com/">disqus</a>. This is a more complicated process but it worked.

* Adding Google Analytics. This was just a question of signing up and using the appropriate code snippet. However, it did take a while 
for Google Analytics to begin tracking my site, which caused me some frustration.

* I am hoping that friends will contribute content eventually, so I required an authorship system. This is easy, but the difficult step 
was making a page that indexes posts by author. I am not sure that this is working yet.

* I wanted a pair of arrows at the bottom of every post, so that the interested reader can click through to the next and previous posts.

* I wanted to be able to suppress posts so that I can keep them in draft form for a while. After messing around with dates, it turned out that this can be done very easily by setting `published=false` in the front matter of the markdown file containing the post. In future, I will probably look for a markdown 
editor which lets me write the drafts offline.

* Finally, having built the entire blog online, it was time to migrate it to a live version. I was going to create a new Github account 
for this, but it turned out that it is possible to change a username in Github, so the process was much simpler than expected.

The code is quite messy since I do not fully understand what it is doing, and I don’t know how difficult 
it will be to add more functionality in the future. But I’m happy with it for now, and finally ready to add content!
