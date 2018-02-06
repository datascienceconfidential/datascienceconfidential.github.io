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

Let us ignore the geometry of the situation completely, and assume we have a jigsaw puzzle with \[N\] pieces, which is divided into \[b\] sections, each of which consists of \[n_i\] pieces. The pieces within each section are assumed to have the same colour or pattern, and the different sections are assumed to be distinguishable from each other. 
