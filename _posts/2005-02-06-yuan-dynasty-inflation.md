---
layout: post
title:  "Inflation in mediaeval China"
subtitle: "Did the Yuan Dynasty's experiment with fiat money really cause a hyperinflationary collapse?"
header-img: "/blog/images/2025/yuan_gibbs_results.png"
date:   2025-02-06
published: true
author: Richard
categories: economics r
---
In this post, I would like to draw attention to a very interesting data set collected by Guan, Palma and Wu as part of the [replication package](https://www.openicpsr.org/openicpsr/project/194606/version/V1/view) for their paper [The rise and fall of paper money in Yuan China, 1260-1368](https://onlinelibrary.wiley.com/doi/10.1111/ehr.13305). The paper describes inflation, money and prices during the Yuan Dynasty era in China.

First, a little historical background.
# The Yuan Dynasty
The immediate predecessors of the Yuan were the Song Dynasty, who ruled China from 960 to the 1270s. The Yuan Dynasty started out as Mongols (the descendants of [Genghis Khan](https://en.wikipedia.org/wiki/Genghis_Khan)) who came from Mongolia<sup>[1](#myfootnote1)</sup>. They waged a bitter 44-year war against the Song, eventually driving them into roughly the area of modern-day Hong Kong<sup>[2](#myfootnote2)</sup>, where the last Song emperor was finally defeated at the Battle of Yamen.

After taking over China, the Yuan<sup>[3](#myfootnote3)</sup> quickly absorbed Chinese culture. The Song had been very technologically advanced, and the Yuan adopted many of their innovations, including paper money. At first, the paper money was exchangeable for silver. From 1276, the money was not fully backed by silver and, in 1310, the government began to issue pure fiat money, just like we use today.

According to Richard von Glahn's book <i>Fountain of Fortune: Money and Monetary Policy in China, 1000-1700</i>, by 1361 the paper money had become valueless. The usual narrative is that excessive money printing had caused hyperinflation, just like in Germany in the early 1920s and Zimbabwe in the 2000s. In their paper, Guan et al use a regression model to conclude that wars were the main factor which tended to lead to excessive issuance of money.
# The Data
The graphs below show<sup>[1](#myfootnote4)</sup> the nominal paper money stock, population and CPI in the period considered by Guan et al. The money stock is calculated under the assumption that the nominal money stock decreases by 10 percent each year. The CPI is one of several inflation measures constructed by Guan et al (see Figure 6 in their paper).

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2025/yuan_plots.png" />
</div>

I was particularly interested in whether anything interesting could be said about the relationship between money, prices and output during the century covered by the data. We don't have reliable data on output, but it seems reasonable to assume that output might be proportional to population in a pre-industrial society. If the velocity of money is assumed to be constant, then the quantity theory of money says that there should be a relationship of the form

$$M \propto PY \tag{1}\label{eq:1}$$

where $M$ is the nominal money stock, $Y$ is population and $P$ is the price level.
# Model
In the following, let $m = \log(M)$, $p = \log(P)$, and $y = \log(Y)$. From $\eqref{eq:1}$ there should be a relationship of the form

$$p = v + m - y$$

for some constant $v$. To account for the fact that monetary expansion sometimes occurred without causing inflation (for example in 1310) assume that $p$ and $y$ adjust slowly to their "correct" values, and that there can be measurement error. To be precise, assume that the observed $p_t$ and $y_t$ follow a process of the form

$$\begin{align*}
p_{t+1} &= (1-\lambda) p_t + \lambda (v + m_t - y_t) + \varepsilon_t\\
y_{t+1} &= (1-\beta) y_t + \beta (v + m_t - p_t) + \varepsilon_t'
\end{align*}$$

with $0 \le \lambda, \beta \le 1$ and $\varepsilon_t, \varepsilon_t'$ are identically-distributed measurement errors which occur independently at each time $t$ and follow a normal distribution with a mean of $0$ and a common variance $\sigma^2$. 

The model was fitted using a Gibbs sampler. The graph below shows 90% credible intervals for the true value of the CPI $P_t = \exp(p_t)$ for each year in the data.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2025/yuan_gibbs_results.png">
</div>

The posterior distributions of $\beta$ and $\lambda$ show that in general $\lambda$ was larger than $\beta$, which makes sense since you would expect that output would be slower to adjust than prices.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2025/yuan_beta_lambda2.png">
</div>

# Hyperinflation?
The reason why I did all this modelling was to see whether it was really plausible that the economy of Yuan China experienced hyperinflation (defined as inflation of 50% or more *per month*). If we suppose that the amount of new money created in the year after the data ends was at its maximum historical value, it's possible to get a distribution of the expected rate of inflation for the next year.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2025/yuan_inflation.png">
</div>

Clearly, it seems very unlikely that the inflation ever really became "hyper" in the twentieth-century sense. Possibly the Yuan rulers even understood that printing money would cause inflation and refrained from doing it too much, except in an emergency.

However, it's also clear from the historical record that their currency did eventually lose almost all of its value. But it seems unlikely that this was *because* of money printing. It seems more plausible that people lost confidence in the money issued by a government which they didn't like and which was facing an internal rebellion. Once the government lost its grip on power, the value of its money dwindled to nothing.

Anyway, whatever the conclusions, it's really interesting to have access to data on a pre-modern experiment with fiat money!

___________________________

<a name="myfootnote1">1</a>: At this point, the obvious question is why the Great Wall didn't keep them out? That's because the north of China had already been conquered by the Jin, who were another Mongolian people. The Jin did indeed have a wall, but it wasn't what we nowadays recognise as the Great Wall (that was built later, by the Ming) and it wasn't enough to stop the Mongols, who defeated the Jin in 1211 at the intriguingly-named [Battle of the Badger's Mouth](https://en.wikipedia.org/wiki/Battle_of_Yehuling).

<a name="myfootnote2">2</a>: Surprisingly, some echoes of this time still remain. One of the newest stations on Hong Kong's light railway is called [Sung Wong Toi](https://en.wikipedia.org/wiki/Sung_Wong_Toi), which means "The Terrace of the Song Emperors". It's named after a rock which was supposed to have been a favourite sitting-place of one of the last Song Emperors.

<a name="myfootnote3">3</a>: Confusingly, the dynasty shares its name 元 (both in English and Chinese) with the name of China's modern-day currency.

<a name="myfootnote4">4</a>: This post is the first time I have used the ggplot R package in my own work and, as you can see, I'm new to it. I still don't see how it's superior to base graphics, although it has [really good documentation](https://ggplot2.tidyverse.org/).
