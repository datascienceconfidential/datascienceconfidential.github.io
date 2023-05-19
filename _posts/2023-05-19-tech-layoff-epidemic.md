---
layout: post
title: "When will the tech bloodbath end?"
date: 2023-05-19
author: Richard
categories: bayesian
published: true
---
I recently became very interested in the layoffs which are sweeping through the tech sector. The number of layoffs has been unusually high for a while, but what really got me interested was losing my job and then finding out that the job market is really tough. Fortunately, I was able to find some work in epidemiology which will keep me going for now.

Then I wondered whether I could combine my interest in layoffs with my new interest in epidemiology, and a paper was born!

The basic idea is to extract data from an online layoff tracker at [layoffs.fyi](https://layoffs.fyi/) and then apply an epidemiological model to it. In other words, treat layoffs as an epidemic using leftover models from the pandemic. The results, despite being pretty dodgy, suggest that at the moment the best prediction is that layoffs will return to a normal level around the end of 2023.

The graph of layoffs by company looks like this:

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2023-05/data_all.png" />
</div>

and the fitted model looks like this:

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2023-05/results.png" />
</div>

All the details are in [my paper.](https://arxiv.org/abs/2305.05210)
