---
layout: post
title: "Is logistic regression regression?"
subtitle: "Questionable definitions in machine learning"
header-img: "/blog/images/2026/logistic_regression_example.png"
date: 2026-05-14
author: Richard
categories: r predictive-models
published: true
citable: true
---
I came across a post recently by a machine learning engineer who made the bold claim that logistic regression is the worst name for an algorithm ever, or something along those lines<sup>[1](#myfootnote1)</sup>. Many statisticians of the more old-school type seemed to disagree. This led me to think a bit more deeply about the subject. I've already written several posts on bad terminology in statistics (see [confidence level]({{site.baseurl}}/statistics/probability/2020/07/23/confidence-intervals.html), [line of best fit]({{site.baseurl}}/statistics/linear-regression/2020/08/16/line-of-best-fit.html), [r squared]({{site.baseurl}}/statistics/linear-regression/python/2021/06/01/r-squared.html)) so I might have been expected to agree with the machine learning view, but in this case I agree with the statisticians, and I would like to explain why.

(Edit: while searching for the title of this post I noticed that there is a [post by Adrian Olszewski on Medium](https://medium.com/@r.clin.res/is-logistic-regression-a-regression-46dcce4945dd) from two years ago which says very much the same thing. Since this post has recently received a relatively large number of visitors, I thought I should mention it. Hopefully the lesson can't be repeated too often!)

# What data scientists think regression is

In data science classes, students are taught that there are two kinds of predictive modelling. In both cases, the aim is to predict a response $Y$ given a vector of features $X$. If $Y$ is real-valued (`numeric` in R terminology) then it's a *regression* problem. If $Y$ is categorical then it's a *classification* problem. I'm not sure where this terminology originated, but it's certainly been propogated very widely by Hastie and Tibshirani's classic [*The Elements of Statistical Learning*](https://hastie.su.domains/ElemStatLearn/).

In logistic regression, your data consists of some feature values $X$ and a response $Y \in \lbrace 0, 1 \rbrace$. In this case, the response is definitely categorical, so someone trained in data science would indeed call this a classification problem. But if you look more closely at the output produced by logistic regression, its predicted values are numbers, namely the probability of each data point being in the class labelled $1$. You need to do something to these numbers (for example, use a cutoff) in order to get a predicted class.

For example, in R:

```r
set.seed(100)
N <- 100
a <- -1
b <- 1
x <- 2 * rnorm(N)

# simulated binary data
y <- rbinom(N, 1, 1/(1 + exp(-a -b * x)))

# plot observed values in grey
plot(x, y, pch=19, xlab="x", ylab="y",
     col=rgb(0, 0, 0, 0.3), las=1)

# fit logistic regression
model <- glm(y ~ x, family="binomial")

# plot predicted values in red
points(x, 
       predict(model, data.frame(x=x), 
                  type="response"),
       col=rgb(1, 0, 0, 0.3),
       pch=19)
```

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/logistic_regression_example.png">
</div>

In fact, it's quite hard to think of a machine learning algorithm which directly predicts class membership rather than some sort of measure of how strongly a data point is a member of a class. Even Naive Bayes is making some sort of attempt to predict the probability of class membership. The simplest algorithm which directly predicts the class instead of the probability of class membership is the [1-nearest neighbour algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm). (But if you used a larger number of neighbours, say 20, you would get some sort of estimate of how confident you were in your prediction.)

# What statisticians think regression is

The term *regression* comes from Galton's idea of *regression to the mean* (which I have written about [here]({{site.baseurl}}/statistics/probability/2024/12/02/mount-everest.html)). Originally this was the observation that tall parents tend to have children who are shorter than them, and vice versa. The heights of children seem to regress towards the mean of the whole population.

More generally, the values of the response $Y$ corresponding to some fixed value of the features $x_0$ will follow some probability distribution. The mean of this distribution is $E[Y \vert x_0]$. The observed values of $Y$ will cluster around this mean. If you repeatedly draw values of $Y$, a large value will tend to be followed by a smaller value, and vice-versa. Thus, $E[Y \vert X]$ will tend to be smaller than $Y$ if $Y$ is unusually large, and larger than $Y$ if $Y$ is unusually small<sup>[2](#myfootnote2)</sup>. You can see this if you use linear regression to predict $Y$ given $X$, as in the following example.

```r
set.seed(100)
N <- 500

x <- rnorm(N)
y <- 0.4 * x + 0.8 * rnorm(N)
plot(x, y)
abline(coef(lm(y~x)), col="red")
```

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/regression_example.png">
</div>

(Note how the slope of the regression line is shallower than the "slope" which the eye perceives in the cloud of data points, which is the [principal axis](https://en.wikipedia.org/wiki/Principal_axis_theorem).)

But some algorithms don't give you any regression effect. For example, an overfitted decision tree (a.k.a 1-NN regressor) will not show any regression to the mean, as in the following example. Note that the blue line does not under- or over-predict for the extreme values of $x$.

```r
x <- c(1:9)
y <- c(-10, seq(-1,1, length=7), 10)
pred_nn <- function(xx) y[which.min(abs(xx - x))[1]]

plot(x, y)
abline(coef(lm(y~x)), col="red")
xx <- seq(1, 9, length=1000)
lines(xx, sapply(xx, pred_nn), type="s", lty=2, col="blue")
```

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/regression_example_2.png">
</div>

In this case, you have an algorithm which is predicting a numerical value, so data scientists would call it a regression, but it's not actually exhibiting any regression. How annoying!

# What regression actually is

Although it's too late to rewrite the textbooks, maybe it could be argued that regression and classification should have been defined in the following way. If a predictive model directly predicts a response $Y$ given features $X$, then it should be called a classification model (even if $Y$ is numeric, as in the previous example). But if the model predicts $E[Y \vert X]$, then it should be called a regression model.

What about logistic regression? In this case, the model is predicting $P(Y=1 \vert X)$ which is just $E[Y \vert X]$. So the statisticians were right in the first place! Logistic regression *is* a regression model. It only becomes a classification model if you apply a second model to it. Usually this takes the form of a decision tree which predicts $Y=1$ if $E[Y \vert X] > p_0$ for some choice of $p_0$ and $Y=0$ otherwise. This decision tree *is* a classification model. But logistic regression itself isn't.

___________________________

<small>
<a name="myfootnote1">1</a>: I'm a little wary of calling myself a data scientist these days, partly because I think the profession has been devalued by various attempts to cash in on its popularity (leading to a glut of people with high confidence and low experience) and partly because I think data science is becoming a bit of a toxic brand with all the [real-world harm]({{site.baseurl}}/economics/ai/llm/r/2026/01/07/so-how-much-does-openai-owe-us.html) being done by AI, data centres, mass surveillance, etc.
</small>

<small>
<a name="myfootnote2">2</a>: Anecdote time: at one of my old jobs we had to entertain a vendor who was basically selling a Kaggle-style workflow as a software-as-a-service product. The sales rep built a model on some of our data and presented it. In their write-up they included the observation that "interestingly, we noticed that the model tends to underpredict for large values of $x$ and overpredict for small values of $x$". Well, that's not very surprising because that's what *every* predictive model does!
</small>
