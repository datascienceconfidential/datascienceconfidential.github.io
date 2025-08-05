---
layout: post
title: "AI Replacement and Wash Hires"
subtitle: "What could be causing cycles of hiring and firing in the labour market?"
header-img: ""
date: 2025-08-05
author: Richard
categories: ai economics r
published: true
---
I'm going to discuss some horrifying ideas in this post, so let's begin with some good news!

I've [previously studied](https://datascienceconfidential.github.io/bayesian/2023/05/19/tech-layoff-epidemic.html) tech layoffs. According to my main source of data [layoffs.fyi](https://layoffs.fyi/), the weekly number of layoffs has been steadily declining. In the US, this has been compensated by a huge number of layoffs in the government sector, but still, the trend for tech workers seems to be good. However, the number of layoffs remains significantly higher than its low in 2022, meaning that tech workers have less job security than before.

<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/layoffs_to_aug_2025.png" />
</div>

In this post, I want to consider two possible mechanisms which could motivate firms to engage in mass layoffs.

# Hiring and Firing

You might notice that there is some negative autocorrelation in the data. In other words, weeks with a high number of layoffs will tend to be followed by weeks with a low number of layoffs. This is true of the tech sector as a whole, but it can also be true within individual companies. 

A good example is the case of [Brittany Pietsch](https://www.bbc.com/worklife/article/20240118-workers-are-filming-their-layoffs-then-posting-them-to-tiktok-what-could-go-wrong) who in 2024 filmed herself being laid off from Cloudflare. One interesting aspect of the Pietsch case was that HR was unable to provide her with a reason for her termination, since her performance was held to be satisfactory. Taking this at face value leads to a question: why would a company hire someone and then fire them a few months later? What's in it for them?

# Shareholder Value

The principal of shareholder value, also known as the [Friedman Doctrine](https://en.wikipedia.org/wiki/Friedman_doctrine) after Milton Friedman<sup>[1](#myfootnote1), states that the objective of every business is to maximise the profits of its shareholders. This controversial idea has become dogma in the corporate world in the last 40 years, and has led to upper management being paid largely in stock and (especially) stock options. The idea is that the job of the CEO is to make the stock price rise, no matter what. One way of motivating the CEO to do this is to tie total compensation to the stock price. Didn't make the stock price rise this quarter? Tough luck, your options are worthless!

Tradtionally, layoffs are supposed to depress the stock price, because they indicate that a firm is not doing well. But these days this [no longer seems to be the case](https://www.businessinsider.com/tech-layoffs-stock-market-reaction-meta-spotify-wall-street-investors-2024-2). An announcement of layoffs might *increase* the stock price. In the corporate world, *Revenue per employee* is becoming an increasingly popular metric to compare firms against each other. The fewer the employees, the bigger the number.

# Wash Hires

It follows that it might make sense for a firm to lay people off, even if there is business reason to. But you need to hire people before you can lay them off. So, hire people. This is good for your stock price in the long term because your company appears to be growing. Then, do a mass layoff. This is good for your stock price in the short term because it increases your revenue per employee. Rinse, repeat, collect your money!

I call this strategy *wash hiring* because it's analogous to the situation in the stock market where you sell a share to yourself in order to make it look valuable. This idea was used by famous stock manipulators like [Daniel Drew](https://en.wikipedia.org/wiki/Daniel_Drew). It's illegal nowadays, but it still crops up whenever people invent a new financial market. For example, when NFTs were popular, people made money by [selling NFTs to themselves](https://medium.com/@NFTrade/selling-an-nft-to-yourself-how-value-is-created-out-of-thin-air-3361261d7cdb) in order to encourage other people to buy them for an inflated price.

<div style="width:75%; margin:0 auto;">
 <img src="/blog/images/2025/Daniel_Drew_1872.jpg" />
 <center><p style="font-size : 10px;">Daniel Drew, Wikipedia</p></center>
</div>

Are modern-day corporate CEOs doing the same with human lives? Quite possibly. Some firms practice *stack ranking* (or *rank and yank* as Jack Welch<sup>[2](#myfootnote2) called it) in which the bottom x percent of employees are sacrificed in a regular round of layoffs. Wash hires are more or less the same thing only without the ranking part.

If firms are really doing this, is there any problem with it? It has the potential to do a great deal of economic damage. If people are afraid of random layoffs, they are likely to increase their precautionary saving and not be as productive (since they need to spend time making sure that they are prepared for a job search.) As Ha-Joon Chang explains in [23 Things They Don't Tell You about Capitalism](https://en.wikipedia.org/wiki/23_Things_They_Don%27t_Tell_You_About_Capitalism), Thing 10, there are hidden costs to job insecurity which don't usually show up in economic models<sup>[3](#myfootnote3).

# AI Replacement

How would we know whether CEOs are hiring people purely in order to have someone to fire? Well, we could ask them! It turns out that the CEOs of corporate America are more than happy to talk about their mass layoff plans. But [according to the Wall Street Journal](https://www.wsj.com/lifestyle/careers/layoff-business-strategy-reduce-staff-11796d66), the reason why many CEOs want to lay people off is not in order to boost their stock price, but in order to replace people with AI.

So what happens if you replace people with AI? Can this also lead to a cycle of hiring and firing? I did some modelling to find out and it seems that the answer is yes, to an extent.

## A Capital Allocation Model

Suppose a firm has a fixed stock $K$ of capital and produces output according to the Cobb-Douglas production function<sup>[4](#myfootnote4)

$$Y = A K^\alpha L^{1-\alpha}.$$

Suppose the firm is a price taker in the labour market (i.e. workers can be hired at a fixed wage $w$) and the firm wishes to maximise profits. Profits are $Y-wL$ and so the firm will hire an amount of labour

$$L^* = K((1-\alpha)A/w)^{1/\alpha}.$$

Now suppose someone invents an AI and the firm has the option to hire AI labour instead. The AI demands a wage of $0$, so of course the firm will replace all the human labour by AI. But as data scientists, we know that AI models will degrade over time due to data drift. Therefore, assume that the AI labour $U_t$ satisfies an equation of the form<sup>[5](#myfootnote5)

$$U_{t+1} = (1-\delta)U_t + bL_t$$

where $(1-\delta)$ represents the depreciation of AI quality over time, $b$ represents the amount of new training data generated by employees at time $t$, and $U_t$ is the amount of equivalent human labour which the AI can do at time $t$.

The total profit at time $t$ is 

$$\Pi_t = AR_t^\alpha U_t^{1-\alpha} + A(K-R_t)^\alpha L_t^{1-\alpha} - wL_t$$

where $R_t$ is the capital allocated to the AI workers (remember that total capital $K$ is fixed.) We can calculate the choices of $R_t$ and $L_t$ which maximise the firm's profit using calculus. This leads to two possible solutions. Either the firm devotes all its capital to AI workers and $R_t = K, L_t=0$ or else

$$
\begin{aligned}
L_t &= (A(1-\alpha)/w)^{1/\alpha}(K-R_t) \\
R_t &= (w/A(1-\alpha))^{1/\alpha}U_t
\end{aligned}
$$

from which it follows that $\frac{\partial L_t}{\partial L_{t-1}} < 0$. This is how you can get fluctuations in $L_t$, or cycles of hiring and firing.

Here is a numerical example computed in R:

```r
N <- 50 # number of time periods
R <- U <- L <- Y <- Pi <- rep(0, N)
alpha <- 1/3
K <- 1
w <- 0.1
A <- 1
delta <- 0.8
b <- 1

# initial values
L0 <- ((1-alpha)/w)^(1/alpha)
L[1] <- L0
U[1] <- 0 # start with no AI at time 1

for (i in 2:N){
  U[i] <- (1-delta)*U[i-1] + b*L[i-1]
  Rn <- (w/(1-alpha))^(1/alpha) * U[i]
  if (Rn > K){
    R[i] <- K
    L[i] <- 0
  } else {
    R[i] <- Rn
    L[i] <- ((1-alpha)/w)^(1/alpha) * (K-R[i])
  }
  Y[i] <- R[i]^(alpha)*U[i]^(1-alpha) + (K-R[i])^(alpha)*L[i]^(1-alpha)
  Pi[i] <- Y[i] - w*L[i]
}
```

<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/capital_allocation_example.png" />
</div>

At first (at time `t=2` since R indexes vectors starting at 1) everyone gets fired due to being replaced by AI. But since the performance of the AI degrades over time, some people have to be hired back, then fired again, then... In the end, an equilibrium is reached in which less human labour is required but the cycles of hiring and firing no longer happen.

Could something like this occur in the real world? Well, there is some evidence for it! You may recall that buy-now-pay-later firm Klarna [recently announced](https://economictimes.indiatimes.com/news/international/us/company-that-sacked-700-workers-with-ai-now-regrets-it-scrambles-to-rehire-as-automation-goes-horribly-wrong/articleshow/121732999.cms?from=mdr) that it was rehiring workers after sacking them due to AI. Just like in the model, the AI which was supposed to replace the workers turned out not to be everything it was cracked up to be!

# Conclusion

So there you are; two possible reasons why you would expect to see cycles of hiring and firing in the labour market. The idea of wash hires is appealing but it only makes sense for publicly-traded firms<sup>[6](#myfootnote6). The idea of AI replacement is certainly realistic, and also terrifying.

Some economists have written papers about the possible impact of AI on the labour market, for example [this paper by Pascal Stiefenhofer](https://arxiv.org/pdf/2502.07050). But the research tends to focus on where we will end up, not so much on how we will get there in the short run. 

It looks like it could be a bumpy ride!

___________________________


<a name="myfootnote1">1</a>: The following quote comes from [a Youtube interview with Joseph Stiglitz](https://www.youtube.com/watch?v=YViLHG0X0F0)

> I wrote a paper explaining why firms maximising their stock market value would not lead to the general wellbeing of society. [...] About the same time, Milton Friedman was writing a very influential article which was published in the New York Times Magazine about why firms *should* maximise their stock market value. I got invited to the University of Chicago to give a talk on my paper. [...] After the seminar we were sitting outside the seminar room and he said "Joe. You're wrong." I said: "Milt. Tell me where I made a mistake in my analysis." He said : "Joe. You're wrong. I know shareholder maximisation is optimal. It's good for society". I said: "I've worked very hard to show that *you're* wrong. Just explain to me where in my analysis I made a mistake," and he said: "Joe. You're wrong." And it was very clear at that point that he'd become an idealogue. He had very strong beliefs and couldn't engage in an analytic exercise. He was very bright, very congenial, a really very nice guy. Very committed to his ideology.

<a name="myfootnote2">2</a>: Welch, as boss of General Electric, was one of the most controversial and most successful exponents of shareholder value which he later, in a 2009 interview with the *Financial Times*,  called ["The dumbest idea in the world."](https://www.ft.com/content/294ff1f2-0f27-11de-ba10-0000779fd2ac)

<a name="myfootnote3">3</a>: A [1979 model of Jovanovic](https://python.quantecon.org/jv.html) considers how much effort a worker should devote to their job search versus their current job. Clearly, if you expect to be fired without cause at any moment, you might as well put in minimal effort on your current job and devote all your time to learning skills which might help you in your next job.

<a name="myfootnote4">4</a>: The Cobb-Douglas function may not be an appropriate model for an individual firm, but the conclusion would be similar for any reasonable choice of production function.

<a name="myfootnote5">5</a>: Again, the exact equation is not important. We just require that the quality of the AI declines over time if there is no human labour to maintain it or to generate new training data for it.

<a name="myfootnote6">6</a>: My personal experience has been the opposite. The last time I felt like I had a reasonably secure job was when I was working for a publicly-traded firm, whereas subsequent jobs in privately-held companies have never felt particularly secure. But this might just be due to overall economic conditions. 