---
layout: post
title: "Monetary versus Fiscal Policy"
subtitle: ""
header-img: ""
date: 2024-06-27
author: Richard
categories: economics
published: true
---
<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2024/robinhoodandfriartuck.png" />
</div>
After a [recent experience studying covid](https://datascienceconfidential.github.io/nlp/llm/2024/02/23/onegin-markov.html), I have become very interested in the economic fallout of the pandemic. My economic education to date mainly consisted of reading various old books, particularly *Introduction to Money* by the excellent (and thoroughly forgotten) author and economist Honor Croome. Writing in 1956, Croome gives an overview of the nature of money and explains that, in times of crisis, governments should stimulate the economy by spending money on anything at all, even if that means, in her words, "building pyramids".

I haven't noticed many pyramids going up lately, so something else must be going on. What I *have* noticed going up is prices, especially the price of housing, which is reaching alarming levels, particularly in countries like [Australia](https://www.bbc.com/news/world-australia-67723760) and the [Netherlands](https://www.theguardian.com/news/article/2024/may/06/netherlands-amsterdam-next-level-housing-crisis). It's not difficult to find out that this is somehow associated with the activities of central banks, particularly in rich countries (known as Advanced Economies or AE in the lingo.)

Central Banks have two main ways of intervening in the economy (called *monetary policy*). The first is to set the interest rate on deposits which other banks hold at the central bank, and the second is to perform so-called open market operations, in which the central bank creates money and uses it to buy financial assets. Under normal circumstances, interest rate adjustments are the main tool of monetary policy, but once interest rates have shrunk to zero, there is nothing left but open-market operations. In the wake of the 2008 financial crisis, dramatic cuts in interest rates failed to stimulate the economy, and so central bankers turned to a programme of money-creation and asset-buying which was known as *Quantitative Easing* (QE).

In order to get up to speed with developments in economics, I read a book from the turn of the century called *New Ideas from Dead Economists* by Todd G. Buchholz. It was rather enlightening. It turns out that the idea of stopping recessions by government spending (known as one aspect of *fiscal policy* rather than pyramid-building) which was described in the Croome book is based on Keynesian economics. Since *Introduction to Money* was published, another economic school emerged called Monetarism. Led by Milton Friedman, the monetarists proclaimed that the government was more-or-less powerless to influence the economy, and instead it was the central bank who had a duty to end recessions by expanding the money supply.

To cut a long story short, nowadays people believe that both Keynesianism and Monetarism are somewhat correct, and fiscal and monetary policy are both necessary to keep the economy functioning.

However, after some thought, it seemed to me that there's rather a big difference between the two. If the government launches a pyramid-building programme, it needs to get the money from somewhere. Either it needs to use money which it has raised from taxation, or it needs to borrow money by issuing bonds. Once it has the money, it can hire people to build the pyramids. Those people spend the money and it starts to move around the economy, hopefully stimulating it.

On the other hand, if the central bank carries out open-market operations, it buys bonds from people or institutions, and gives them money in return. The central bank money enters the economy, just like the government's pyramid-building money. But it enters the economy in a different place, on a higher shelf, so to speak, where most people can't reach it. The kind of people who are employed to build pyramids are probably mostly too poor to own financial assets like government bonds. And the kind of people who own government bonds might not want to spend the newly-created money on things like food and clothing. After all, that money used to be government bonds. It was earning interest. That was its purpose. So now they will want to find some other rent-earning asset to spend it on. Like, for example, housing.

Basically, it seemed to me that fiscal policy, very broadly speaking, attempts to stimulate the economy by making poor people richer, whereas monetary policy (more specifically, asset purchasing) tends to make rich people richer. And perhaps, I thought, that could be the reason for the rise in inequality which we seem to be seeing in western societies?

But perhaps this is nonsense? I investigated further by [looking at the repository of central bank speeches](https://datascienceconfidential.github.io/python/nlp/2024/05/14/things-central-bankers-say.html) at the Bank of International Settlements. It turns out that the [BIS recently published a report](https://www.bis.org/publ/arpdf/ar2024e2.htm#fn_45) which covers the years 2000-2024 in some detail, bringing the economic picture up to date. And, indeed, there is some concern that loose monetary policy is causing inequality.

In fact, I found a [2021 speech](https://www.bis.org/review/r211123f.pdf) given by ECB official Isabel Schnabel which covered these exact points! Here are some quotes:

> In the euro area, low-wealth households tend to predominantly invest their financial assets in short-term bank deposits. Less than 0.1% of households in the bottom net wealth quintile hold bonds, compared with more than 10% of the top decile (Slide 9, right-hand chart). And only around 1% of low-wealth households hold shares in mutual funds, compared with 30% of households in the top net wealth decile. Similar shares are found for stock holdings.

> Hence, central banks purchasing longer-dated assets disproportionally benefit wealthier households whose assets tend to have longer durations than their liabilities.

and on housing:

> Research by the International Monetary Fund (IMF) has found that [...] investors respond to global financial conditions. By searching for yield in a low interest rate environment, they may have played a non-negligible role in pushing up real estate prices in recent years, not only in the euro area but across advanced economies, especially in major cities.

> As a result, house prices are increasingly behaving like those of any other globally traded financial asset, and therefore risk diverging from national income developments. 

So I was more or less right! Even the ECB agrees with me. But, given that there is a housing crisis, how are we ever going to fix it? I don't know. It seems that advanced economies need their governments to step in to [definancialise](https://www.ippr.org/articles/definancialisation-a-democratic-reformation-of-finance) housing , but the political will seems to be lacking.

If the concept of housing as a financial asset is here to stay, then what can be done to make sure that people have places to live? Perhaps if the central bank controls the money supply by buying and selling assets, then in future central banks might get into the business of buying and selling housing? After all, if the central bank buys bonds from people and institutions who then spend the money on housing, isn't it the same thing with extra steps?

The idea of central banks getting directly involved in the housing market sounds ridiculous. But perhaps there is a precedent. In New Zealand, the Reserve Bank has traditionally had a single mandate: to keep inflation within a specified range. That was its only task for many years. It's a textbook example of good central bank legislation (in fact, it's literally cited as an example in the textbook which I am reading.) But in 2018, the New Zealand government expanded the mandate of the Reserve Bank, saying that it also needed to aim for full employment. In 2021, its mandate was further increased to consider the price of housing. In 2023, perhaps fearful of [scope creep](https://en.wikipedia.org/wiki/Scope_creep), the government [repealed the employment part of the bank's mandate](https://www.rnz.co.nz/news/political/504643/reserve-bank-dual-mandate-repeal-passes-through-parliament). With the recent change of government, there seems to be a political tug-of-war going on about what the Reserve Bank is actually supposed to do. The lines between monetary and fiscal policy seem to be blurring.
