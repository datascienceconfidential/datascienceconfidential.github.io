---
layout: post
title: "Powers, logs and Lambert W"
subtitle: ""
header-img: ""
date: 2021-03-12
author: Richard
categories: statistics
published: true
---
Before PCA as a tool for data exploration, I often like to apply a transformation to squash feature values and remove outliers. This usually results in PCA producing a nice, evenly-spaced point cloud with fewer outliers, which can be helpful for visualization.

My go-to choice of an outlier-removing transformation is the logarithm, but I have recently noticed that this is often not the best choice.

Everyone knows that the logarithm grows more slowly than every power of $x$. However, this is not the whole story. If you actually graph $x^\alpha$ and $\log(x)$ for small values of $\alpha$, it looks like you actually get more squashing with $x^\alpha$. This is because the crossover point is often a very, very long way along the x-axis.

For example, $x^0.1$ crosses $log(x)$ near $x = 3 \times 10^{15}$, which is probably bigger than any of the values in your data set. Therefore, you are likely to get more squashing with $x^0.1$. Also, powers of $x$ have the advantage that they are continuous at zero, so you don't have to worry about having zeroes in your data, and you can squash negative values as well by using the function $s(x) = \mathrm{sgn}(x)|x|^\alpha$.

The roots of the equation $x^\alpha = \log(x)$ can be found analytically if you are willing to use the [Lambert W-function](https://en.wikipedia.org/wiki/Lambert_W_function), which I [used in my analysis of jigsaws](https://datascienceconfidential.github.io/puzzle/python/mathematics/r/2018/02/07/jigsaw-equation.html). This function is defined as the inverse function of $W^{-1}(x) = xe^x$ and it is multivalued for $x < 0$.

The analytic solution of $x^\alpha = \log(x)$ is $x = e^{-\frac{1}{\alpha}W(-\alpha)}$, which can be approximated using the series in the Wikipedia article.

Just for fun, the bigger solution to $x^\alpha = \log(x)$ for $0 < \alpha < 1/e$ is approximately

$$\left(\frac{1}{\alpha}\log\left(\frac{1}{\alpha}\right)\exp\left(\frac{\log\log(1/\alpha)}{\log(1/\alpha)}\right)\right)^{1/\alpha}$$

This is not the only neat thing you can do with the $W$ function. You can also use it to show that certain functions are not elementary. For example, the inverse of $f(x) = \log\log(x)/\log(x)$ cannot be an elementary function, because it can be epxressed as $f^{-1}(x) = e^{-W(-x)/x}$. Since this is expressed in terms of $W$ and it has been known since 2007 that $W$ is not an elementary function, it follows that $f^{-1}$ is also not an elementary function!
