---
layout: post
title: "Ashby's Law of Requisite Variety"
subtitle: "A review of two books on cybernetics"
header-img: "/blog/images/2026/i_fp355.jpg"
date: 2026-09-05
author: Richard
categories: economics book-reviews
published: true
citable: false
---
This post was inspired by an intriguing book by Dan Davies called [*The Unaccountability Machine*](https://en.wikipedia.org/wiki/The_Unaccountability_Machine) which I recently borrowed from the library. I enjoyed the book very much, but did not fully understand its conclusions. I therefore started looking at the references, and worked my way through [*An Introduction to Cybernetics*](https://ashby.info/Ashby-Introduction-to-Cybernetics.pdf) by W. Ross Ashby, which has kindly been made freely available by the Ashby estate.

Two things drew me into *The Unaccountability Machine*. Firstly, it's an economics book (by an economist) which acknowledges that there is a crisis. Most books on economics seem doggedly determined that there isn't. Secondly, it proposes two simple remedies, one of which I think is a great idea, and the other of which I think is a terrible idea. Again, this isn't something which most economics books do (for example, the otherwise excellent *The Land Trap* by Mike Bird doesn't actually suggest anything which could be done about high land prices, but that's a subject for some other post).

I knew that I was going to enjoy *The Unaccountability Machine* when I encountered a fascinating idea on the very first page. Davies pointed out that a code of laws, such as the Code of Hammurabi, the Ten Commandments, or the Common Law of England and Wales, can itself be viewed as a sort of model, namely a rules-based classifier which tells you how to make a decision in any particular case requiring a legal judgement. Of course, real life is messy and full of grey areas, but a simple rule such as "don't murder anybody" seems to give the correct answer in a lot of situations, while not being 100 percent right all the time. I never thought of it that way before, but it makes a lot of sense.

# The Polycrisis

*The Unaccountability Machine* begins with the notion that something has gone very wrong. The world seems to be lurching from crisis to crisis and nobody seems to have the will or the ability to do anything about it. The book gives a number of examples of systems which have made terrible decisions without anybody quite knowing why. Anybody who has recently [applied for a job]({{site.baseurl}}/economics/2025/07/24/matching-frictions.html) or hired a candidate will know what Davies is talking about. A company has a process which is ostensibly designed to hire the best candidate. Many people are eliminated before their CV is even seen by a human, simply because they used the wrong keywords. The remaining candidates are subjected to [a gruelling multi-interview process]({{site.baseurl}}/economics/r/fermi-estimation/2024/11/08/interview-hell.html), only to be ghosted. The position is then re-advertised and the cycle repeats again. As a comment on social media put it:

> The only thing corporations hate more than employing people is providing goods and services.<sup>[1](#myfootnote1)</sup>

But poorly-designed hiring processes are only one symptom. The world seems to be full of problems, from global warming to inequality, over which nobody has any control. How can this loss of control be explained? What does control mean anyway? This is what cybernetics is about.

# Cybernetics

Cybernetics is a deeply-unfashionable branch of engineering whose main contribution to the world seems to be the prefix *cyber-*. Interestingly, cyber- isn't actually a prefix. The name cybernetics comes from cybernet, which is an English rendering for the Greek word for someone who is in charge of giving orders to the oarsmen in a galley (this is the same word as the data platform kubernetes.<sup>[2](#myfootnote2)</sup>

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/i_fp355.jpg" alt="A galley of the Knights of Malta, from Sea Wolves in the Mediterranean by E. Hamilton Currey (public domain)">
</div>

In very general terms, cybernetics seems to be the study of machines in the abstract. The machines in cybernetics do not have to be machines in the usual sense. W. Ross Ashby was particularly interested in the case of a living organism. All that is required is that there is a system which has inputs and outputs. It could be a very complicated system, such as a pigeon or the economy. To cyberneticians, the important things about the system are what you do to it and how it reacts. Everything inside is treated as a black box. This attitude is summed up in the famous slogan:

> The purpose of a system is what it does.

This seems to be similar to B. F. Skinner's idea that you can observe nothing about an animal but its behaviour. Trying to understand its mental state is pointless. Even if you can look at the internal workings of a system, you can't understand everything it does simply by studying the parts that make it up. The system itself is an emergent phenomenon.<sup>[3](#myfootnote3)</sup>

One of the things Davies blames for the crisis is the insistence that models must be microfounded. If we want to understand the economy, we must start with a large number of agents and have them all simultaneously attempt to maximise their utility, and see what happens. Cybernetics (as far as I understand) rejects this premise. The economy does not necessarily have microfoundations; it is possible that it is greater than the sum of its parts, and the only way to understand it is to fiddle with it and record what happens. Exactly how you do the fiddling is where Ashby's Law of Requisite Variety comes in.

# Ashby's Law of Requisite Variety

In cybernetics, the *variety* of a collection of things is defined to be $\log_2(N)$ where $N$ is the number of things in the collection. Ashby's Law is the observation that if you want to control $N$ things, then you need at least $N$ settings on your controller. Otherwise, by the [pigeonhole principle](https://en.wikipedia.org/wiki/Pigeonhole_principle), there will be at least one controller setting which corresponds to two or more of the things you want to control, and you won't have full control of the system.

Perhaps the best way to explain it is to look at some of the exercises from Ashby's book. Here is a typical example.

> A ship has 50 possible rudder positions, each of which can be set in 1 second, and 9 possible speeds. It takes 5 seconds to change the speed. If the ship is able to respond to any dangers (such as reefs, shoals, and winds) which it faces in the course of everyday operations, what is the maximum number of dangers it typically faces?

The ship's rudder has $\log_2(50)$ bits of variety per second. Its speed has $\log_2(9)/5$ bits of variety per second. The total variety per second is 

$$\log_2(50) + \log_2(9)/5 = 6.28$$

bits. This corresponds to a number of dangers per second of $N = 2^{6.28} = 77.7$. If it faces more possible danger-settings than this, then there is a risk that it will get out of control.

The important point is that the varieties from the settings of one or more controllers (in this case, the rudder and the engine room telegraph) add together. In other words, if you have two things with $N_1$ and $N_2$ settings respectively, then you can combine them into $N_1 N_2$ possible combinations of settings. So if you can control two or more things at once, there is a greater chance that you can control the system as a whole.

But the modern world is exactly geared towards *not* controlling two or more things at once. Everything is a KPI. Everyone is out to maximise their number, and never mind what happens to everything else. Central banks, for example, are expected to meet an inflation target. Some central banks (such as the US Federal Reserve) have other targets, but inflation targeting (which was invented in New Zealand by the way) is broadly considered to be a [good thing](https://www.wgtn.ac.nz/__data/assets/pdf_file/0005/1863761/WP-14-2018-Thirty-years-of-inflation-targeting-in-New-Zealand.pdf). Similarly, corporations are expected to maximise their shareholder value. This, too, is considered to be a good thing, even though it clearly leads to terribly destructive decisions, such as [firing people in order to have room to hire people]({{site.baseurl}}/ai/economics/r/2025/08/05/ai-replacement-wash-hires.html). During the Covid-19 pandemic, the public health services of many countries were given unlimited power with the mandate to save as many lives as possible.<sup>[4](#myfootnote4)</sup> The best way to do this turns out to be to make everyone stay indoors for two years. If you can't go outside, you can't get infected. Side effects? They are somebody else's business. 

And that, according to Davies, is the problem. Once society has been divided into atomic  organisations, each of which is concentrating on a single objective, you can no longer get the benefit of coordination. It's like an orchestra in which everybody is playing their instrument independently of everyone else. You don't get the benefit of adding varieties, and the situation has the potential to spin out of control. Davies sums it up nicely in the following quote.

> Any system which is designed to maximise a single quantity has the potential to go bonkers.

# What is to be done?

As mentioned above, Davies comes up with two concrete proposals (stop reading here if you don't want the ending of his book to be spoiled!) Firstly, companies which buy other companies should be forced to guarantee the debts of the company they buy. This would close a legal loophole which encourages the leveraged buyout industry, which Davies claims makes shareholder value maximisation much worse. Cybernetics or not, this sounds like a great idea.

Secondly, Davies suggests (right at the end of the book) that social media could be used as a kind of feedback mechanism to make sure that the people who make decisions are in touch with the people who are affected by them. Furthermore, social media posts could be filtered by AI so that they would be available to the decision-makers in a digestible form. I think this is a terrible idea. Social media is deeply undemocratic. It amplifies the loudest and angriest people at the expense of everyone else. Governments and media already pay excessive attention to social media, and in my opinion the consequences have been extremely harmful. I can't see how AI would make it better (how does AI make *anything* better?) Perhaps something like Swiss-style direct democracy would be a better solution to the problem of decision-makers being out of touch with the population? I don't know.

# Conclusion

I liked the book, but I'm not sure whether I agree with what I think is its central thesis.

Do a bunch of small organisations, each of which has a narrow and well-defined objective, always perform worse than a big organisation? Adam Smith would say no; individual utility maximisation should lead to a good (or at least Pareto-optimal) outcome. I have worked with colleagues who sometimes have to deal with an organisation which I will call Ministry X, which was stitched together many years ago by combining many smaller ministries under one umbrella, with several extra layers of management to coordinate them. Does Ministry X perform well? No. Ministry X is a disaster. Even in a crisis, it behaves with a deer-in-the-headlights helplessness. Indiviually, yes, some of the people working there can be very helpful. But overall, trying to get Ministry X to do anything at all is an uphill battle of trying to get people to sign things before they can be taken to other people to sign, and so on.

In the case of Covid, I think that the [public health response was mishandled]({{site.baseurl}}/nlp/llm/2024/02/23/onegin-markov.html) by almost everybody everywhere. But some aspects of it worked well. For example, several countries were able to develop a vaccine remarkably quickly. Should the labs working on the vaccine have been forced to consider all sorts of other effects of their research on the wider economy? Probably not.

On the other hand, I can't help but agree that mindless shareholder value maximisation is a terrible idea which is slowly killing both the economy and us. So, while Ashby's Law maybe doesn't apply to everything, I do think that it applies to some things. In particular, I think Davies was right about central banks and their mandates, which is a topic to which I hope to return in a future post.

There's a ton of stuff in the book which I haven't mentioned above ([Stafford Beer](https://en.wikipedia.org/wiki/Stafford_Beer) and his theory of management; the Friedman Doctrine; [squirrel shredding](https://www.independent.co.uk/news/airline-killed-440-squirrels-in-giant-shredder-1087522.html); etc.) so I can only reiterate that it's worth a read!

___________________________

<small>
<a name="myfootnote1">1</a>: Interestingly, Davies mentions an obscure economist called [Jerome Levy](https://en.wikipedia.org/wiki/Levy_Economics_Institute) who believed the exact opposite: namely, that the purpose of the "ownership class" in society is to furnish the needs of the working class in the form of employment (to provide insurance against the business cycle) and goods and services. Needless to say, these views are not mainstream. In fact, Levy doesn't even have his own Wikipedia article!
</small>

<small>
<a name="myfootnote2">2</a>: Incidentally, galleys were grim places. There's an excellent book called [*Sea Wolves of the Mediterranean*](https://www.gutenberg.org/cache/epub/13689/pg13689-images.html) which goes into the subject in hair-raising detail.
</small>

<small>
<a name="myfootnote3">3</a>: I was recently on a panel at a symposium on agent-based modelling where a similar theme came up. We were discussing certain agent-based transportation models, and I mentioned that an expert on the models was unable to explain certain strange behaviour which was observed when the model was run with a large number of cars moving through a few links. Even though the source code of the model is available and everything about it can in principle be understood, trying to do so turns out to be too complex. On the one hand, it's impressive that the model manages to capture so much of the complexity of the real world. On the other hand, if the model is just as complex as the real world, then what's the point of building the model?
</small>

<small>
<a name="myfootnote4">4</a>: Or in many cases, to maximise the number of [QALYs](https://en.wikipedia.org/wiki/Quality-adjusted_life_year) or DALYs. I know one eminent professor who ranked the performance of countries as "good" or "bad" based on their number of deaths per head of population.
</small>