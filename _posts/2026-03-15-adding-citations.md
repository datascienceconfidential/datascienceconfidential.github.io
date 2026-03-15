---
layout: post
title: "Adding a citation system"
subtitle: ""
header-img: ""
date: 2026-03-15
author: Richard
categories: jekyll
published: true
---
I recently found a [useful tutorial on AWS S3 in R](https://blog.djnavarro.net/posts/2022-03-17_using-aws-s3-in-r/) at a blog called [Notes from a Data Witch](https://blog.djnavarro.net/). One thing I liked about this blog is that includes a BibTeX citation for each post in case a reader wants to copy and paste the citation information. Some students at Auckland University recently told me that they have been using [my DSGE tutorial](https://datascienceconfidential.github.io/economics/r/2025/04/28/how-the-dsge-sausage-is-made.html) so I decided that it would be a good idea if I had a citation system too.

To implement the system, I simply added the following lines to my `post.html` file in the `_layouts` directory.

```html
  {% if page.citable == true %} 
    {{author.surname}}, {{author.name_short}}, {{ page.date | date: "%Y" }}. "{{ page.title }}", 
    {{ page.date | date_to_string }}. {{ page.url | absolute_url }}
  {% endif %}
  ```

This piece of code prints the author, date and URL, but only if the `citable` flag is set to `true`. For most posts (like this one) I don't set it at all, and then the citation option does not appear. 

I also created a separate piece of code to print the BibTeX citation. It mostly works, but I couldn't find a way to put curly braces around the capital letters in the post title. I think it can be done with a regex in jekyll but I couldn't get it to work, so if someone can help with that, please let me know!

So if you find something useful on this site, feel free to cite it! After all, if [academics aren't taking enough risks](https://pmc.ncbi.nlm.nih.gov/articles/PMC11326573/) in their research, then maybe blogs have a role to play too?