---
layout: post
title: "ROC versus CAP"
date: 2018-04-18
author: Richard
categories: validation predictive-models r javascript
published: true
---
Recent consulting work in the banking sector has led me to take a closer look at the ROC and CAP curves and their associated accuracy measures, AUC and AR. I was rather surprised to learn that there is a simple relationship between these measures. However, it seems that it is also not quite as simple as people think.

## Introduction

The ROC and CAP curves measure the quality of a ranking or rating system. They are not defined for an arbitrary predictive model, but rather for models which output some kind of numerical score which is supposed to be predictive of some characteristic of interest. This means, for example, that a random forest or naive Bayes classifer can have an ROC curve, but a black-box classifier which merely produces a prediction will not have one.

The application which I will have in mind in this post is credit scoring. A credit scorecard outputs a number called a credit score. Every borrower is assigned a credit score. Some borrowers are "bad", for example, those who default. It is hoped that the credit score will be related to the probability that a borrower is bad. The ROC and CAP curves provide a way to test this.

## The ROC curve

The ROC curve is more widely known than the CAP curve. The idea behind the ROC curve is that we can build various different predictive models by choosing a cutoff, with scores below the cutoff being classified as bad and those above the cutoff being classified as good.

This involves a tradeoff. If the cutoff is too low, then everyone will be classified as good. This means that none of the goods will be misclassified, but none of the bads will be detected. On the other hand, if the cutoff is too high, then everyone will be classified as bad. This means that all of the bads will be detected, but all of the goods will be misclassified as well, which is undesirable. The cutoff must be chosen somewhere in between.

Originally, the ROC curve was developed for radar applications. ROC stands for "Receiver Operating Characteristic". I believe the original application was something like deciding whether to shoot down a plane. If the cutoff is too low, then enemy planes get through, but if it is too high, then you shoot down your own planes.

(By the way, shooting down your own planes is called a Type 1 error, and letting enemy planes through is called a Type 2 error. There is an easy way to remember which is which if you know the story of the boy who cried wolf. The boy who cried wolf when there was no wolf was committing a Type 1 error, and this happened *first*. The villagers who refused to believe that there was a wolf when there really was a wolf were committing a Type 2 error.)

Here is an example. Say there are 5 cases, with scores of 100, 200, 300, 400, 500, and the cases with scores of 100 and 300 are bad. Then if we choose a cutoff of 150 (so we predict that everyone below 150 is bad) then we correctly predict one bad and incorrectly let one bad slip through. We correctly identified 50% of the bads, and we misclassified 0% of the goods.

On the other hand, if we choose a cutoff of 350, then we would correctly identify 100% of the bads, but we would also misclassify 33% of the goods. 

The ROC curve is constructed by considering every possible cutoff, and plotting the proportion of misclassified goods (also called the False Positive Rate, or Type 1 error rate) on the x-axis and the proportion of correctly classified bads (also called the True Positive Rate) on the y-axis.

In our example, by considering every possible cutoff, we get the following table:

| cutoff         | <100 | 100-200 | 200-300 | 300-400 | 400-500 | >500 |
|----------------|-----:|--------:|--------:|--------:|--------:|-----:|
|  bads < cutoff |    0 |       1 |       1 |       2 |       2 |    2 |
| goods < cutoff |    0 |       0 |       1 |       1 |       2 |    3 |
| tpr            |    0 |     1/2 |     1/2 |     2/2 |     2/2 |  2/2 |
| fpr            |    0 |       0 |     1/3 |     1/3 |     2/3 |  3/3 |

and the ROC curve looks like this:

<canvas id="theCanvas" height="320" width="320" border="1px solid"></canvas>

<script type="text/javascript" src="/blog/scripts/roc_animation.js"></script>
