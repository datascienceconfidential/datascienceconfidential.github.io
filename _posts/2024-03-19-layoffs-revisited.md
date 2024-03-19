---
layout: post
title: "All models are useless, but some are wrong"
date: 2024-03-19
author: Richard
categories: bayesian
published: true
---
It's time to update my [tech layoff model.](https://arxiv.org/abs/2305.05210). The idea of the model was to forecast the future of the layoffs in the tech sector by treating them as an epidemic. This was motivated by the idea that companies are laying people off just because other companies are, so that layoffs in the sector are a kind of "social contagion" which will eventually blow itself out.

The following picture shows the forecast from the paper, which I made last May. The main result was that weekly layoffs would be expected to return to normal by the end of January 2024.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2023-05/results.png" />
</div>

Now here's what actually happened (observed weekly layoffs plotted in green).

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2024/results_and_truth.png" />
</div>

As you can see, the actual results are nothing like the forecast from the model. Layoffs are still pretty high and haven't really decreased at all. (The dip in the last week of 2023 is caused by companies taking a Christmas and/or New Year holiday).

The conclusion is that the tech layoffs are *not* driven by social contagion (or at least, not any sort of social contagion which is captured by this model.) There must be other reason for the continuing high volume of layoffs. Possibly AI is a culprit. At the moment, many companies think that they can replace a lot of staff by Large Language Models [(Example: Klarna)](https://www.hrdive.com/news/klarna-ai-replacing-workers/708971/). But who knows?

Just at the end of my last academic job contract, I had an interesting conversation about this research with a postdoc in sociology. He made the following helpful comment.

> I am not an expert in SIR model or forecasting in general. So I may not be able to give you professional comments regarding forecasting models. However, I can give you some comments on how the framing of this paper is viewed by sociologists. In my view, the major concerns of empirical studies in sociology are either (1) testing social theories, (2) revising or developing existing social theories, or (3) descriptive in nature (i.e., revealing patterns/trends previously unknown. This serves as a first step to develop social theories to explain the phenomenon later.). To my knowledge, I have not read a sociological article about forecasting. Thus, your paper's major interest (i.e., forecasting layoffs with a modeling method used in public health but not economics) is probably not of interest to sociology journals. Nonetheless, it is possible to fit into a sociology journal if the framing of the paper can be changed. My understanding is that Jeffrey Pfeffer's argument about social contagion of layoffs (I am not familiar with his ideas. So correct me if I am wrong) involves something like mimicking other people's/companies' behavior, in this case, layoffs. So if the framing of the article can be changed into something like: testing if social diffusion thesis can be applied to the particular case of layoffs in the tech industry, then I believe your article can be of interest to sociologists. But of course, there are still a lot to be done if you want to pursue this path (e.g., a more elaborated theoretical framing, more detailed empirical analyses, etc.). If you are interested in this path, feel free to contact me and I can discuss in detail with you.

It's very interesting to me that forecasting is a no-no in sociology. On the one hand, it makes sense that this paper could never have been publishable (at least, before the results of the forecast had been known). On the other, if forecasting is not allowed, then what does "testing social theories" actually mean? If "testing" a theory means fitting it to an existing data set, then that's still a form of forecasting; it's just forecasting something which you already know! Of course, it's easy to predict something which you already know, and this is what 90% of academic research is. But if you only do that, then how can you ever really test your theories? What are we to make of popular models like mixed effects models, which actually *can't* be used for prediction, by design? 

My model was tested and found to be wrong. If your models can never be tested, then you can never be wrong. If you can never be wrong, then what's the point of academic research at all?
