---
layout: post
title: "Bad Statistical Terminology 1: Confidence Level"
subtitle: ""
header-img: ""
date: 2020-07-23
author: Richard
categories: statistics probability
published: true
---
Let's look at a typical example of calculating a confidence interval, and then discuss what's wrong with it.

Here's an example from the first page of Google results for "confidence interval calculation example".

>Descriptive statistics on variables measured in a sample of a n=3,539
participants are shown below.

|Characteristic|n|Sample Mean|Standard Deviation (s)|
|---|---|---|---|
|Systolic Blood Pressure|3,534|127.3|19.0|

>Because the sample is large, we can generate a 95% confidence interval for systolic blood pressure using the following formula:
>
>$$\overline{X} \pm t\frac{s}{\sqrt{n}}$$
>
>The $Z$ value for 95% confidence is $Z=1.96$. Substituting the sample statistics and the $Z$ value for 95% confidence, we have
>
>$$121.2 \pm 2.262\frac{11.1}{\sqrt{10}}$$
>
>So the confidence interval is $(126.7,127.9)$.
>
>A point estimate for the true mean systolic blood pressure in the 4 population is 127.3, and we are 95% confident that the true mean is between 126.7 and 127.9.

Now, this is all calculated correctly according to the books. Where I object is the final sentence.

>We are 95% confident that the true mean is between...

The meaning of the confidence interval is as follows. A level $\alpha$ confidence interval for a population parameter is a procedure for calculating an interval from a sample from the population with the property that a proportion $\alpha$ of such intervals contain the true value of the parameter.

In this example, it's not clear what the population is, but let's just suppose that it is everybody in the city and we are pretending that these 3534 people were a random sample from that population.

The population parameter of interest is the mean systolic blood pressure of everybody in the city. We calculated an interval which has the property that 95% of intervals calculated in this way contain the population mean.

Are we therefore 95% confident that *our* interval contains the true mean? I would say, no.

For example, here's another way to calculate a confidence interval. Let's go with the same procedure which we used above except that, for this one particular sample, we'll take the empty interval. This is also a 95% confidence interval (because one particular sample doesn't matter in the long run) but now our particular interval is empty! So it definitely doesn't contain the true mean. Yet we are 95% confident that it does!

Or, taking things to extremes, let's follow a different procedure. We take the entire real line with probability 95%, and the empty interval with probability 5%. Not only is this a valid confidence interval, but it has perfect coverage and it works for any problem!

(During my last academic job, I once showed this example to an ornithologist (now data scientist) who I was helping with some statistical consulting. She covered her ears and shouted: "Shut up! Shut up! Shut up!")

Now, the silly confidence interval above is obviously not very useful. It's desirable for confidence intervals to have good properties, like being narrow, so we don't want to take the whole real line as our confidence interval.

Well, how narrow do you want? What if I told you that there was a way to calculate a 95% confidence interval for systolic blood pressure which *always has length zero?*

How to do it? Simply take the usual confidence interval, as in the blood pressure example, whenever the sample mean happens to be an irrational number, and the empty interval whenever the sample mean is a rational number. 

Of course, this interval doesn't *always* have length zero. In fact, since the rationals have zero measure, it has zero probability of being empty. But in practice, the sample mean is always a rational number because of the finite precision of our measuring instruments, so the confidence interval calculated from this procedure will always be empty in practice... yet we are 95% confident that it contains the population mean!

Clearly, confidence intervals are not working as advertised.

Do all statistical education resources contain statements like "We are 95% confident that..."? When writing this post, I originally wanted to go to the first hit on Google and explain why it was wrong. But the first hit on Google turned out to be [mathisfun.com](https://www.mathsisfun.com/data/confidence-interval.html), which contains the following explanation for a problem about heights.

>The 95% Confidence Interval (we show how to calculate it later) is:
>
>175cm ± 6.2cm
>
>This says the true mean of ALL men (if we could measure all their heights) is likely to be between 168.8cm and 181.2cm.
>
>But it might not be!
>
>The "95%" says that 95% of experiments like we just did will include the true mean, but 5% won't.
>
>So there is a 1-in-20 chance (5%) that our Confidence Interval does NOT include the true mean.

This looks like a very accurate explanation!

Still, the term *confidence interval* does appear to be rather unreasonable. It's very hard to explain why this is something you would want, unless you are doing a repeatable experiment.

Usually, what you actually want is a credible interval, and I suspect that the reason why the confidence intervals for a mean or a proportion work well in practice is simply because they happen to coincide with certain credible intervals in these cases.

Perhaps a better name for confidence interval would be "frequential interval", or "replication interval", or some other name which emphasises that there is some assumption of replicability hiding behind the concept.

By the way, [here is an excellent example by Keith Winstein](https://stats.stackexchange.com/questions/2272/whats-the-difference-between-a-confidence-interval-and-a-credible-interval/2287) which explains the difference between confidence and credible intervals in great detail. It is one of the best things I have found on the subject!

Winstein's example has to do with receiving jars containing different assortments of cookies and trying to determine which kind of jar it is based on a sample of cookies. However, I would like to mention that the whole scenario relies on the fact that the jars are being delivered repeatedly. If they weren't, then the whole notion of confidence interval would not make sense.
