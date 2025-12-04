---
layout: post
title: "Embedding a Quarto presentation in a blog post"
subtitle: ""
header-img: "https://quarto.org/quarto.png"
date: 2025-12-04
author: Richard
categories: r
published: true
---
This post is a simple demo of how to embed a Quarto presentation in your website.

[Quarto](https://quarto.org/) is a pretty nice open-source scientific publishing system which enables you to make presentations (powered by [revealjs](https://revealjs.com/)). It's available by default in recent versions of RStudio. I was recently invited to present one of my models at the [Ministry of Transport Te Manatū Waka](https://www.transport.govt.nz/) in New Zealand, and I thought it was a good opportunity to take Quarto for a spin, as I haven't used it before.

It was quite easy to create a slide deck with a mixture of R, html, markdown, and LaTex. But how to share the slides? Well, it turns out that this is quite easy too. [Following a tip from Scott Veirs](https://econscience.org/blog/2018/03/27/starving-sea-pandas-at-the-festschrift-of-russ-mcduff/) you can simply place a link to your Quarto document inside an html `iframe` element. In my case the relevant code is:

```html
<div style="width:90%; margin:0 auto;">
    <iframe src="https://rtrvale.github.io/Talks/mot.html" 
    style="height: 400px; width:100%; border:5px solid #2a76dd; border-radius:15px;"></iframe>
</div>
```

and here is how it looks:

<div style="width:90%; margin:0 auto;">
    <iframe src="https://rtrvale.github.io/Talks/mot.html" 
    style="height: 400px; width:100%; border:5px solid #2a76dd; border-radius:15px;"></iframe>
</div>

In particular, the embedded HTML5 animations seem to run without any issues (at least on the browsers and platforms which I have tested so far).

If you'd like to learn more about the actual content of the presentation, I've written a longer blog post about it [here](https://datascienceconfidential.github.io/economics/r/javascript/fermi-estimation/2025/10/02/2d-growth-model.html).