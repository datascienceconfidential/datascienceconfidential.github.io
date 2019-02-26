---
layout: post
title: "A cautionary tale about SMOTE"
date: 2019-02-26
author: Richard
categories: predictive-models
published: true
---
Here is something that I have seen people get wrong often in machine learning: a lot of metrics for evaluating models only work on the
assumption that training examples are independent of one another.

A few years ago, I was asked to evaluate a model which a colleague of mine built using 
[SMOTE](https://en.wikipedia.org/wiki/Oversampling_and_undersampling_in_data_analysis). The model was a random forest, and SMOTE is
a technique whereby rows are added to a data set in order to increase the incidence of a minority class (useful, in theory, in a two-class
classification problem in which one class is very uncommon). The colleague noticed that the out-of-bag error indicated 97% classification
accuracy.

In fact, when the model was trained on a subset of the training data and then used to classify the remaining, unseen, data, its accuracy
dropped to about 50%. It was no better than random guessing!

Why did this happen? Well, the problem is that SMOTE adds rows to your data set which are based on linear combinations of existing rows. 
In particular, the new rows are not independent of the existing rows. Out-of-bag error is a measure of the accuracy of a random forest 
(or other ensemble of models) whereby models are evaluated by seeing how accuractely they predict examples which they did not see during
training. But it is possible that the model could be trained on one of the new training examples, and then have to predict a very similar
example which had been introduced using SMOTE.

Here is an example of what can go wrong. The following code generates some completely random data in the form of a $100 \times 10$ matrix,
and a target variable $y$. Then $X$ and $y$ are doubled, so that every row is duplicated. A random forest fitted to this garbage data has
a classification accuracy of 80%! 

```python
# Python version
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

np.random.seed(19022019)

sim_X = np.random.randn(100, 10)
sim_y = np.random.binomial(1, 0.5, 100)

X = np.vstack((sim_X, sim_X))
y = list(sim_y) + list(sim_y)

train_X, test_X, train_y, test_y = train_test_split(X, y, train_size=0.5, test_size=0.5)

rf = RandomForestClassifier(n_estimators=500)
rf.fit(train_X, train_y)

rf.score(test_X, test_y)
```

```r
# R version
library(randomForest)
set.seed(19022019)

sim_X <- matrix(rnorm(100*10), nr=100)
sim_y <- sample(0:1, 100, replace=T)
X <- rbind(sim_X, sim_X)
y <- as.factor(c(sim_y, sim_y))
dat <- cbind(data.frame(X), y)

trainrows <- sample(1:nrow(dat), 100)
testrows <- (1:nrow(dat))[-trainrows]
train <- dat[trainrows,]
test <- dat[testrows,]

rf <- randomForest(y~., data=train, ntree=500)
pred <- predict(rf, test)
sum(pred==test$y)/length(test$y)
```
People make this mistake all the time, for example [here](https://www.kaggle.com/rahultej/tomek-links-smote-cv-99-96-to-100-recall). As
for my story, my colleague didn't believe me and ended up presenting the 97% result at a conference, so at least there was a happy ending
for someone...

Moral: the best way to assess a model is to repeat the entire training process on a random subset of your data, and evaluate on the held-out
data. Easy to say, but can be hard to do in practice.
