---
layout: post
title: "Reading 'Radical Uncertainty'"
subtitle: "A book review with a digression into astrology"
header-img: ""
date: 2026-07-19
author: Richard
categories: r economics book-reviews
published: true
citable: true
---
I recently read John Kay and Mervyn King’s book *Radical Uncertainty* as part of an economics book club and I thought I would share some thoughts on the book here.

I’ve never read anything by John Kay before, but this is the second book by King which I have read, after [*The End of Alchemy*](https://en.wikipedia.org/wiki/The_End_of_Alchemy), which is about banking regulation. *Radical Uncertainty* is about statistics, and especially about the problems with assuming that we can make probabilistic calculations while neglecting the possibility of things which we haven’t even contemplated happening. I was pretty fascinated by the first half of the book, but it does become quite long-winded in the second half, and repeats many of its points over and over again.

The book makes a lot of good points, but I would also like to point out some mistakes which it makes when talking about statistical modelling.

In the language of the book, Radical Uncertainty means Knightian Uncertainty. Knightian Uncertainty is named after Frank Knight, who made a distinction between uncertainty and risk. The basic idea is that you have a probability space $(X, \mu, \Sigma)$ where $X$ is a set, $\mu$ is a probability measure on $X$ and $\Sigma$ is the sigma-algebra of events. There’s absolutely no reason not to assume that $X$ is finite, so really we have a finite set $X$ and a probability $\mu(x)$ attached to each element $x \in X$. Suppose we make a draw from $X$

$$x \sim (X, \mu)$$

According to Knight’s definition, risk is “we don’t know $x$” and uncertainty is “we don’t know $X$”. One point which the book likes to hammer on is that in a lot of real-life situations, we really can't possibly know $X$. So probability calculations (such as those made by bankers prior to 2008) are invariably wrong since they ignore "off-model events". In 2008, this led to disastrous consequences.

I would like to mention at this point that there is a third kind of uncertainty. What if you know $X$ but don’t know $\mu$? This kind of uncertainty arises in a lot of gambling problems, for example when a bookmaker wants to make odds on the World Cup. You know exactly which outcomes are possible (all possible tournament brackets) but you need to assign a probability to each one. I was not able to find a name for this kind of uncertainty, but since it is exactly the situation faced in Bayesian statistics, it could be called Bayesian Uncertainty.

Kay and King make a pretty convincing case that Knightian uncertainty is important. However, I do think they slip up when talking about probability. For example, describing [a calculation by Nate Silver](https://math.stackexchange.com/questions/270093/bayes-theorem-example-in-nate-silvers-the-signal-and-the-noise) of the probability of the 9/11 attacks, they say (Chapter 11)

> So Silver’s calculation of probability was meaningless.

It doesn’t make sense to say that a probability calculation is meaningless. Every probability calculation is conditional on a probability model $(X, \mu)$. Given a model, you can calculate the probability of any subset of $X$ (or any event in $\Sigma$ in the continuous case). So you could say that Silver’s *model* was meaningless. But, in the context of the model, any probability he calculated makes perfect sense.

There is a temptation (to which Kay and King appear to succumb) to assume that there are some sort of "true" probabilities of things which modellers are attempting to calculate. But there are no such true probabilities, because there are no true probability models. A probability model is just an expression of what you don’t know. Different people can have different models because they are ignorant of different things. Thus, they can assign different probabilities to the same event, and this is fine. In some toy examples, such as rolling a die, everybody probably agrees more or less on the same probability model. But not so in the real world.

A similar error crops up when describing Keynes’ objection to the Principle of Indifference in Chapter 1

> If, to take an example, we have no information whatever as to the area or population of the countries of the world, a man is as likely to be an inhabitant of Great Britain as of France, there being no reason to prefer one alternative to the other. He is also as likely to be an inhabitant of Ireland as of France. And on the same principle he is as likely to be an inhabitant of the British Isles as of France. And yet these conclusions are plainly inconsistent. For our first two propositions together yield the conclusion that he is twice as likely to be an inhabitant of the British Isles as of France. Unless we argue, as I do not think we can, that the knowledge that the British Isles composed of Great Britain and Ireland is a ground for supposing that a man is more likely to inhabit them than France, there is no way out of the contradiction.

Here the original probability model is 

$$p(\text{France}) = p(\text{Ireland}) = p(\text{GB}) = \cdots$$ 

If you add the knowledge that the British Isles consists of GB + Ireland, the of course $p(\text{British Isles}) = 2p(\text{France})$. There is no contradiction here, but merely a failure to imagine that you could be ignorant of the fact that BI = GB + Ireland in the first place. New knowledge leads you to update your model, as it should.

It also seems that Kay and King may not be familiar with Bayesian statistics. For example, right at the end of the book they quote Savage:

> There is some temptation to introduce probabilities of a second order so that the person would find himself saying such things as 'the probability that B is more probable than C is greater than the probability that F is more probable than G.' But such a program seems to meet insurmountable difficulties [...] once second order probabilities are introduced, the introduction of an endless hierarchy seems inescapable. Such a hierarchy seems very difficult to interpret, and it seems at best to make the theory less realistic, not more.

Well, the prior distribution used in every Bayesian statistics problem is a probability distribution over probability distributions, so you definitely *can* consider probabilities of probabilities!

Anyway, these are minor points. Kay and King make a convincing argument, at great length, that in general you don’t know $X$ and therefore can’t construct a very good probability model. I don’t have any problem with this. But what should you do if you can’t make a probability model? To their credit, they propose an alternative approach, which they describe as choosing a "reference narrative" and essentially acting as though it is going to happen, while also taking some time to think about what you will do if the reference narrative doesn’t happen.

This process of choosing a reference narrative could also be described in terms of probability. In this case, instead of trying to construct the whole probability space $(X, \mu)$, you simply consider some set of plausible outcomes $X$, choose whichever $x \in X$ is the most probable and assign a probability weight of $1$ to it. In other words, you just choose the likeliest outcome and assume that it’s going to happen. This is much easier than constructing a probability space, and I think that Kay and King make a convincing case/ that this is generally how people act in real life. As Stigler says in [The Epic Story of Maximum Likelihood](https://arxiv.org/pdf/0804.2996)

> At a superficial level, the idea of maximum likelihood must be prehistoric[...]

I wondered whether I could understand *why* this approach works. Why would it be better, in a world of radical uncertainty, to take the likeliest outcome and run with it rather than trying to be a Bayesian?

To make a calculation, we need some sort of measure of how well a model performs versus reality. I found a very interesting [paper](https://www.sciencedirect.com/science/article/pii/S0039368125000159) by Süskind which makes a distinction between probability (the degree to which we believe something) and verisimilitude (the degree to which something is actually true). Probability is conditional on a probability model; verisimilitude is a property of the model itself. One of Süskind’s examples concerns black swans. Suppose there are 99 white swans for every black swan. The model "all swans are white" is wrong, but it makes a correct prediction 99 out of 100 times. The model "all swans are green" never makes a correct prediction. Therefore, "all swans are white" is not a great model, but it does have high verisimilitude.

Süskind is at pains to point out that verisimilitude is not the same as predictive accuracy. For example, assuming that [Paul Daniels](https://en.wikipedia.org/wiki/Paul_Daniels) has magical powers predicts the outcome of his tricks very well, but it is [not a model with high verisimilitude](https://www.youtube.com/watch?v=nnz7LApE0PY) because it is not close to the truth. This is sort-of similar to the idea in machine learning where accuracy often doesn’t measure the thing which you’re actually interested in, and it’s better to use other measures of predictive performance instead.

Let’s suppose the true world has $4$ possible states with true probabilities $(p_1, p_2, p_3, 0)$ (the reason for adding a fourth state is to have a "junk" state which a model is allowed to predict but which actually never happens).<sup>[1](#myfootnote1)</sup> Suppose $p_2 > p_1$. Suppose that observers have only observed states $1$ and $2$ in the past (due to non-stationarity, aka data drift, state $3$ has never happened yet, but in fact is quite likely). A Bayesian would get the probability distribution 

$$(p_1/(p_1+p_2), p_2/(p_1+p_2), 0, 0).$$ 

A maximum-likelihoodist would get the distribution $(0, 1, 0, 0)$. And a conservative maximum-likelihoodist who assumes that their reference narrative (state $2$) is likely to happen but they should also make allowances for the unknowable might choose the distribution $(0, 1/2, 0, 1/2)$.

Now suppose we decide to measure the verisimilitude of a our probability model $(x_1, x_2, x_3, x_4)$ by 

$$V(x) = 1 - \sum_{i=1}^4 (x_i – p_i)^2.$$ 

You can check that the Bayesian always does better than the maximum-likelihoodist. But the conservative maximum-likelihoodist who follows the Kay-King recipe (follow your reference narrative while trying to hedge against the unknowable) can actually get a higher verisimilitude than the Bayesian who fails to take radical uncertainty into account, for example if $p_1=1/30, p_2=2/30$.

```r
p1 <- 1/30
p2 <- 2/30
p_true <- c(p1, p2, 1-p1-p2, 0)
1-sum((c(p1/(p1+p2), p2/(p1+p2), 0, 0) - p_true)^2) # -0.26
1-sum((c(0, 1, 0, 0) - p_true)^2) # -0.68 (worse)
1-sum((c(0, 0.5, 0, 0.5) - p_true)^2) # -0.25 (better!)
```

Although this example is rather contrived, hopefully it does show that in the presence of Knightian Uncertainty, it can indeed be better just to take the likeliest outcome and run with it (while looking over your shoulder at the same time). 

# Economic Forecasts

As you would expect, the book is particularly focussed on economics. One of its conclusions is that you can’t expect to make reliable economic forecasts due to radical uncertainty. Your forecast has to be "I don’t know" and your actions have to be in accordance with whatever scenario you think is likeliest, given whatever set of scenarios you can imagine.

This all seems very reasonable. Countless studies have shown that [long-range economic forecasts are no better than random guessing](https://newsroom.haas.berkeley.edu/why-forecasts-by-elite-economists-are-usually-wrong/). So why do we believe them? What are forecasts *for*?

An interesting answer to this problem is suggested in [a book by Jens Beckert](https://www.hup.harvard.edu/books/9780674088825). The key idea is that economic activity depends on coordination. People can’t coordinate their actions unless they can agree on the future. It doesn’t matter what number they agree on; they just have to agree on *something*. Economic forecasts, even when they are meaningless, give people something to agree about. Ancient priests predicted the future using divination. They probably got it wrong most of the time, which leads to the question of why people didn’t simply get rid of the priests or switch to a new religion? Why didn't incidents like [the sacred chickens being thrown overboard](https://en.wikipedia.org/wiki/Battle_of_Drepana) happen more often?

One possible answer is that it didn’t matter whether their predictions were true. It also didn’t matter whether people really believed their predictions. All that mattered was that people acted *as if* the predictions were true. The purpose of a long-range economic forecast is not, for example, to give an accurate guess at China's benchmark interest rate in 2036. Everyone knows that the guess is wrong.<sup>[2](#myfootnote2)</sup> But lots of people making deals and plans involving China in 2036 have to agree on a number, and it might as well be the one obtained by some arcane economic modelling exercise with relatively high academic stature. In this sense, it would not be right to say that economic forecasts serve a quasi-religious role in our society. Rather, it seems that forecasting literally *is* a religion. It works because people have faith in it. Or rather, not because people have faith in it, but because people agree to act as if they do. If people could be convinced to have faith in a computer which spits out random numbers, that would probably work just as well (and, intriguingly, be more economically efficient).<sup>[3](#myfootnote3)</sup>

___________________________

<small>
<a name="myfootnote1">1</a>: I know above I said there were no true probability models, but this is just a theoretical world.
</small>

<small>
<a name="myfootnote2">2</a>: Most predictive models would result in extremely wide confidence/credible intervals if uncertainty was properly taken into account. For example, when I worked in public health, models were based on ["contact matrices"](https://www.simid.be/masterthesis2/) which had been compiled "using surveys". There was no uncertainty in these matrices; they were just taken as-is as a model input. Even so, the modellers insisted on using 80% (or sometimes even 50%) credible intervals for their predictions because the 95% intervals were so wide that they were just silly. In practice, the end user don’t care about intervals anyway. The intervals are only for academic papers. All the public wants is a point prediction.
</small>

<small>
<a name="myfootnote3">3</a>: If you take this point of view, astrology begins to make a lot of sense. Why did astrology used to be such a popular form of divination? Perhaps because everybody could agree on the raw data from which the predictions were being made (namely, the positions of the stars and planets). At the same time, the predictions themselves were constructed by following arcane mathematical rules such as those described in the early editions of W. W. Rouse Ball's [*Mathematical Recreations*](https://www.gutenberg.org/ebooks/26839). These rules were difficult to follow, and variances in predictions from the same raw material could therefore be explained by errors in following the recipe. So astrology itself behaved as a sort of seedable random number generator which produced predictions upon which everyone could agree, which also leaving open the possibility that the predictions could be wrong. Perhaps this is why economic forecasting *has* to be complicated. If it wasn't, then it would be too easy for everyone to realise that it doesn't work?
</small>

___________________________

A comment on comments: I recently removed the Disqus-powered comments section from the blog because it started injecting ads. I may replace it by an alternative such as [Giscus](https://chocapikk.com/posts/2025/setting-up-giscus-comments/).