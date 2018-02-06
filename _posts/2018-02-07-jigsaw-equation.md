---
layout: post
title:  "Jigsaw Equation"
date:   2018-02-07
published: true
author: Richard
categories: puzzle python mathematics
---
The picture below shows <a href="https://www.jigsawpuzzlesdirect.co.uk/prodpage.asp?prodid=5198"><i>Hidden Hideaway</i></a>, a 500-piece jigsaw puzzle published by Gibson's Games. In this post I propose to show, using nothing but some questionable mathematics and some even more questionable image processing, that <i>Hidden Hideaway</i> is, in some sense, the ultimate jigsaw puzzle. How? Read on!

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2018-02/G3033.png" />
</div>

While completing a jigsaw puzzle recently, it occurred to me that much of it ultimately comes down to trial and error. It is possible to  sort pieces into different types such as edge pieces, pieces of a similar colour, etc, but at some point you are left with a pile of pieces which all show sky, for example,  and the only way to complete that part of the puzzle is to try them in every possible configuration until you find one that fits.

In the extreme, a plain jigsaw with no picture at all would be very boring. But a jigsaw with a picture that is too busy would also suffer from the same problem. For example, if all the pieces were a different colour then it would require just as much trial and error as a blank puzzle, and if the puzzle showed a completely random picture, it would probably be almost (but perhaps not quite) as bad. For example, <a href="http://sydneyinstituteonline.net/stglibrary/files/2010/09/smarties-jigsaw.jpg">this jigsaw</a> does not appeal to me very much.

I wondered if somewhere in between these two extremes, there was an optimum, at which the amount of trial and error required to solve the puzzle is minimized.

## Model

Let us ignore the geometry of the situation completely, and assume we have a jigsaw puzzle with $N$ pieces, which is divided into $b$ sections, each of which consists of $n_i$ pieces. The pieces within each section are assumed to have the same colour or pattern, and the different sections are assumed to be distinguishable from each other.

The sections can be permuted among themselves in $b!$ ways, and (ignoring orientations) there are $n_i!$ ways of permuting the pieces in the $i^{th}$ section. So, altogether, the number of possible configurations (or roughly, the amount of trial and error required) is

$$  \left(\prod_{i=1}^b n_i!\right) b! $$

and we would like to minimize this, subject to the condition $\sum_{i=1}^b n_i = N$.

The two extreme cases are $b=1, n_1=N$, which corresponds to a blank picture, and $b=N, n_i=1$ for all $i$, which corresponds to randomly-coloured pieces. Both of these cases give a score of $N!$.

To find a minimum in between, it is better to allow everything to be continuous and take the logarithm, so that we can define

$$ \mathrm{complexity} = \sum_{i=1}^b \log \Gamma(n_i +1) + \log \Gamma (b+1) $$

which we would like to minimize subject to $\sum_{i=1}^b n_i =N$. 

Notice that this is not a conventional calculus problem because $b$ is allowed to vary as well as the $n_i$. However, at a global minimum, regardless of the value of $b$, all the $n_i$ have to be equal. This is because if $n_i < n_j$ for some $j$, then there is some $\varepsilon$ with $n_i + \varepsilon < n_j + \varepsilon$ and then 

$$\log \Gamma (n_i + \varepsilon) + \log \Gamma(n_j - \varepsilon) = \log \Gamma (n_i) + \log \Gamma (n_j) + \varepsilon (\psi(n_i) - \psi(n_j)) + \varepsilon^2 \mathrm{ terms}$$

where $\psi$ is the digamma function. Because $\psi(n_i) < \psi(n_j)$ ($\psi$ is an increasing function; in fact $\psi(x)$ resembles $\log(x)$) we would not have a global minimum.

Therefore, we can assume all the $n_i$ are equal, and since they add up to $N$, we can put $n_i = N/b$ for all $i$. Then

$$ \mathrm{complexity} = b \log \Gamma\left(\frac{N}{b} +1\right) + \log \Gamma (b+1) $$

and now we can let $b$ vary and minimize this using calculus, which gives the equation

<div style="border: 1px solid black;">
$$\log \Gamma\left(\frac{N}{b} + 1\right) - \frac{N}{b} \psi\left(\frac{N}{b} + 1\right) + \psi(b+1) = 0.\tag{1}\label{eq:1}$$
</div>


Recap: the claim is that the amount of trial and error in assembling an $N$-piece jigsaw will be minimized if it is divided into $b$ sections of equal size, where $b$ is related to $N$ by $\eqref{eq:1}$
