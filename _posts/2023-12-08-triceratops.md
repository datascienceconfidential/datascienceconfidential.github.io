---
layout: post
title: "Triceratopic"
date: 2023-12-08
author: Richard
categories: bayesian
published: true
---
<div style="width:70%; margin:0 auto;">
 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Triceratops_prorsus_old_skull002.png" />
</div>

A few weeks ago, I attended a postgraduate seminar about mosquitoes. Although most of the talk went over my head, the student's main idea was that mosquitoes had evolved much later than people had previously assumed. As well as a lot of phylogenetics, the main evidence for this was a lack of mosquito fossils older than a certain date.

At the end of the talk, I plucked up the courage to suggest that you could get a rough estimate of when mosquitoes evolved by using statistics. The student did not agree. He said that, if the oldest fossil is 30 million years old, then all you can say is that mosquitoes evolved at least 30 million years ago.

But actually, you can say a little more. If you assume that fossils are generated uniformly between the time when mosquitoes evolved and now (a questionable assumption) then what you essentially have is an example of the so-called [German Tank Problem](https://en.wikipedia.org/wiki/German_tank_problem), and you can apply statistics to get the desired estimate.

Let's say $T$ is the time (in millions of years ago) that mosquitoes evolved, and we have $n$ fossils. The $i^{th}$ fossil is dated in the interval $[a_i, b_i]$. If we assume that all of the fossils are independent (again, very doubtful) we get that the probability of observing the fossils we got is

$$L(T) = \prod_{i=1}^n \frac{(T \wedge b_i - a_i)}{T}$$

where the wedge symbol $x \wedge y$ denotes the minimum of $x$ and $y$.

If we put a prior on $T$ (usually there is a sensible upper bound for $T$, so we can use a uniform prior) then we can use this likelihood to get a posterior distribution and credible interval for $T$.

I couldn't find much information about fossil mosquitoes online, so instead I tried dinosaurs. I obtained some information on Triceratops fossils from the [Paleobiology Database](https://paleobiodb.org/classic/checkTaxonInfo?taxon_no=63759).

I am really out of my depth here, but let's just assume that each of the "collections" listed there is an instance of a fossil or fossils of *triceratops horridus*, and that they are all independent. Then we can apply the Bayesian methodology using a few lines of code.

```{r}
t.horridus <- data.frame(upper = c(83.5, 72.1, 72.1, rep(70.6, 6)),
                         lower = c(70.6, rep(66, 8)))

L <- function(x, dat){
  if (any(x < dat$lower)){
    return(0)
  }
  prod((pmin(x, dat$upper) - dat$lower)/x)
}

xx <- seq(0, 250, len=1000)
u <- sapply(xx, function(z) L(z, t.horridus))
v <- u/sum(u)
c1 <- xx[which(cumsum(v) > 0.025)[1]]
c2 <- xx[which(cumsum(v) > 0.975)[1]]
print( c(c1, c2) )
```

which suggests a 95\% probability that *t. horridus* evolved between 121 and 72 million years ago. (I chose an upper limit of 250 million years because this is roughly the date of the oldest dinosaur fossil.)

The bad news is that this is an extremely wide interval, and therefore of no practical value whatsoever! Still, I think it is interesting that an estimate can be obtained at all, starting with essentially zero knowledge of the problem. I can imagine that such an estimate could be used to give a useful sanity check for some other questions about the fossil record.

And I can never resist an opportunity to talk about the German Tank Problem!
