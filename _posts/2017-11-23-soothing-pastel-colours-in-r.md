---
layout: post
title: "Soothing Pastel Colours in R"
date: 2017-11-23
author: Richard
categories: r graphics
published: false
---
While writing a report recently, I made a series of bar charts like the following one.

```r
dat <- rep(1:5, 2)
barplot(dat, col=rep(c("red", "blue"), each=2))
```

Upon review, the colours looked rather harsh, so I decided to convert them to something more soothing and professional-looking.
This led me to read about [pastel colours](https://en.wikipedia.org/wiki/Pastel_(color)) which Wikipedia describes as

> the family of colors which, when described in the HSV color space, have high value and low to intermediate saturation.

I had vaguely heard of the [HSV colour space](https://en.wikipedia.org/wiki/HSL_and_HSV), but this was my first attempt to use it. I 
usually work with rgb values, in which a colour is described by a triple of red, green and blue, with the values of each running from 
0 to 1. In HSV, colours are arranged on a cylinder as in the following picture from the Wikiepdia page.

<img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/HSV_color_solid_cylinder_alpha_lowgamma.png" />

It seems that pastellizing a colour will be a simple task. First, convert from rgb to HSV. Second, decrease the saturation. Third, 
convert back.

R features a handy `rgb2hsv` function which converts rgb values into HSV values. Unfortunately, in typical fashion, there is no
`hsv2rgb` function. However, the algorithm for this conversion is described on the Wikipedia page as well, so it can be implemented
in R.

```r
hsv2rgb <- function(x){  
# convert an hsv colour to rgb  
# input:  a 3 x 1 matrix (same as output of rgb2hsv() function)  
# output: vector of length 3 with values in [0,1]    

# recover h, s, v values  
h <- x[1,1]  s <- x[2,1]  v <- x[3,1]    # follow the algorithm from Wikipedia  C <- s*v    # in R, h takes values in [0,1] rather than [0, 360], so dividing by  # 60 degrees is the same as multiplying by six  hdash <- h*6  X <- C * (1 - abs(hdash %% 2 -1))
  if (0 <= hdash & hdash <=1) RGB1 <- c(C, X, 0)  if (1 <= hdash & hdash <=2) RGB1 <- c(X, C, 0)  if (2 <= hdash & hdash <=3) RGB1 <- c(0, C, X)  if (3 <= hdash & hdash <=4) RGB1 <- c(0, X, C)  if (4 <= hdash & hdash <=5) RGB1 <- c(X, 0, C)  if (5 <= hdash & hdash <=6) RGB1 <- c(C, 0, X)    # the output is a vector of length 3. This is the most convenient  # format for using as the col argument in an R plotting function  RGB1 + (v-C)}
```
