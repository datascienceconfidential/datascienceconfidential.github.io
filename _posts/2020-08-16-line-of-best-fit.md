---
layout: post
title: "Bad Statistical Terminology 2: Line of Best Fit"
subtitle: ""
header-img: ""
date: 2020-08-16
author: Richard
categories: statistics linear-regression
published: true
---
Here's a quote from the top Google result for the very common term "Line of Best Fit", from [Investopedia](https://www.mathsisfun.com/data/confidence-interval.html)

>Line of best fit refers to a line through a scatter plot of data points that best expresses the relationship between those points. Statisticians typically use the least squares method to arrive at the geometric equation for the line, either though manual calculations or regression analysis software.

It's correct, so why do I have a problem with this? Well, it's simply that there is something very misleading here. The term *Line of Best Fit* is symmetric in $x$ and $y$, but *Line of Regression of $y$ on $x$* is not. And, if we are talking about linear regression, then we should not be using a term which is symmetric in $x$ and $y$ to refer to a concept that isn't.

Recall what regression is. It's a predictive model. In the simplest case, we have a variable $x$ and we want to predict another variable $y$. We do this by finding a function

$$\hat{y} = f(x)$$

which gives our predicted value $\hat{y}$ of $y$ given a value of $x$. This predicted value of $y$ will not in general be the same as the actual value of $y$.

If we did things in the opposite order, trying to predict $x$ given $y$, we would have another function $g$

$$\hat{x} = g(y)$$

and it's clear that there's no reason why we would expect that $g = f^{-1}$. They might be close, but they won't be the same unless we can make a perfect prediction.

In the case of a straight line, we are specifically looking for a function $f$ or $g$ which is of the form $a + bx$. (Perhaps this explains how some of the confusion enters in; the inverse of a linear function is linear, so we get straight lines for both $f$ and $g$. It's natural to expect that they would be related in some way, and they are; just not in the most obvious way.)

There's another thing, which isn't regression, which we might be doing with a straight line and a two-variable data set. This is finding a linear model which describes the data set, perhaps with a view to summarizing the data set by collapsing it down into something simpler or smaller, in the same way that a map summarizes a part of the earth's surface.

A natural way of doing this might be to fit a bivariate normal distribution via maximum likelihood; this method is symmetric with respect to $x$ and $y$. The line of best fit would then be the major axis of the ellipse-shaped contours of this normal distribution, which is the line through $(\overline{x}, \overline{y})$ with slope $\pm \sigma_y/\sigma_x$, known as the [SD line.](https://www.stat.berkeley.edu/~stark/SticiGui/Text/regression.htm)

An alternative might be to find the line which minimizes the orthogonal distances of points to itself. That is, instead of minimizing

$$\sum_{i=1}^n (y_i - (a + bx_i))^2$$

you would minimize

$$\sum_{i=1}^n \mathrm{dist}((x_i, y_i), y = a + bx)$$

which leads to the idea of *orthogonal regression*. The slope of the resulting line is simply

$$\sqrt{\sum_{i=1}^n (x_i - \overline{x})^2 + (y_i - \overline{y})^2}.$$

I thought I had never used this in practice, until I found out that it's actually the same as taking the first principal component, which is indeed an extremely useful data reduction technique.

As evidence that calling the regression line a Line of Best Fit really does confuse people, here is a [Stackexchange question](https://stats.stackexchange.com/questions/332819/line-of-best-fit-does-not-look-like-a-good-fit-why) on the topic. There is also the [Siegel Paradox](https://en.wikipedia.org/wiki/Siegel%27s_paradox) in finance, which comes down to the fact that $E[Y|X] \neq 1/E[X|Y]$, which is exactly the problem with the slope of the regression line of $x$ on $y$ not being the reciprocal of the slope of the regression line of $y$ on $x$.

I have no problem using the term "Line of Best Fit" to describe a regression line as long as it's clear, even implicitly, which variable is being predicted from the other. But in principal, it's not a good idea to use a term that is symmetric with respect to $x$ and $y$ to describe a concept that isn't!
