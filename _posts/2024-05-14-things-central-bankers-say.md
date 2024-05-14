---
layout: post
title:  "Things Central Bankers Say"
subtitle: "Analysing the content of central bank speeches"
header-img: "/blog/images/2024/quarterly_similarity.png"
date:   2024-05-14
published: true
author: Richard
categories: python nlp
---
# Introduction
Wondering how the economy came to be so messed up, I looked for clues by reading Liaquat Ahamed's remarkable book <a href="https://en.wikipedia.org/wiki/Lords_of_Finance">*Lords of Finance*</a>. It looks like rather a daunting read, but actually the writing style makes it incredibly accessible and entertaining. The main topic of the book is how central bankers (especially in the US, UK, France and Germany) led the world into the Great Depression by making a series of bad-but-locally-understandable decisions. (aside: It also gave me the impression that the global economy is permanently having some sort of crisis; that some hidden principle like the <a href="https://en.wikipedia.org/wiki/Hairy_ball_theorem">Hairy Ball Theorem</a> is in play, and it's actually not possible to make everything everywhere run smoothly at the same time. A thought that is either disturbing or comforting, depending on your viewpoint.)

It's hard to get an insight into what central bankers are thinking, but the Bank of International Settlements publishes a <a href="https://www.bis.org/cbspeeches/index.htm">data set of Central Bank Speeches</a> which can now be downloaded via the <a href="https://www.bis.org/innovation/bis_open_tech_gingado.htm">gingado</a> library. Since I am very interested in applying machine learning to central banking, this suggested some some natural questions.

- In a crisis, do central bankers club together and all head in the same directions like lemmings, or do they thrash around and all do different things?
- Is there any way to quantify the similarity between central bankers from various different countries?
- Are some countries' central banks less inclined to follow the herd than others?

# Document Vectors
To address these questions, you need to find a way of comparing speeches and measuring how similar they are. This means that a speech has to be converted into numbers in some way. This could be done using the old-fashioned <a href="https://en.wikipedia.org/wiki/Bag-of-words_model">bag of words model</a> but there are better alternatives. I chose to use <a href="[https://radimrehurek.com/gensim/auto_examples/tutorials/run_doc2vec_lee.html](https://radimrehurek.com/gensim/auto_examples/tutorials/run_doc2vec_lee.html)">doc2vec</a> which uses a neural network to compress a document into a numerical vector. I experimented a bit with different vector lengths and settled on length 25. Thus, each speech becomes a vector of 25 numbers. These numbers encode the vocabulary and topics in the speech as well as (hopefully) some of its internal structure.

To compare speeches, I used cosine similarity. For each quarter from 1997Q1 to 2023Q4, the mean cosine similarity of all pairs of speeches in the given quarter was computed and plotted in the following figure. I also tried monthly and yearly time scales, but quarters gives the best compromise between having too many speeches in a time step and too few. 
<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2024/quarterly_similarity.png" />
</div>
The figure changes with different model runs because, like LLMs and some other neural network models, doc2vec has no way to seed the random number generator to make the output reproducible. However, the main features of the plot remain the same. There are big peaks in 2020Q2 (when everyone was talking about covid; the term COVID-19 was coined in February 2020) and 2022Q1 (when everybody was talking about the Russian invasion of Ukraine). The most interesting feature of the plot is the dip between 2011 and 2019.

I wanted to look at GDP growth and speech similarity. I was only able to find statistics on annual (not quarterly) world GDP growth. Comparing it to the annual similarity of central bank speeches, I found that there was essentially no correlation. 

On the other hand, there was rather a strong correlation between speech similarity and interest rates, but this is probably just because the period 1997-2024 included an episode of extremely low rates, and this coincided roughly with the period 2011-2019. The reason why the speeches are dissimilar during this period is probably because central bankers did not agree on what to do. For example, the Federal Reserve started quantitative easing in 2008, whereas the Eurozone was very reluctant to follow suit and did not start quantitative easing until after the <a href="https://www.economist.com/the-economist-explains/2014/08/20/how-jackson-hole-became-such-an-important-economic-talking-shop">Jackson Hole Consensus of 2014</a>. Interestingly, this "consensus" does not show up as in increase in speech similarity on the chart.

Overall, I would say that during an urgent crisis, central bankers tend to say the same things (which is not surprising) but during a slow-motion crisis, they tend not to. I expect that if you did a similar study on central bank speeches in the 1920s, you might see a similar dip in speech similarity while the world was slowly sliding towards the abyss.

# Countries
The speeches are not labelled by bank or country (although <a href="https://www.linkedin.com/posts/douglaskgaraujo_chatgpt-ai-centralbank-activity-7171869028448124928-ZT92/">this has been requested</a>). It seems to me that this would be a great use case for an LLM, but I do not have access to a good one at the moment, so I tried a few Python packages. Unfortunately, <a href="https://pypi.org/project/geograpy3/">geograpy</a> (sic) required too many dependencies, and <a href="https://pypi.org/project/geotext/">geotext</a> was giving some false positives, so I had to do it myself. Using a list of countries from pytz, augmented with a few other country names, I simply counted how many times each country was mentioned in each speech, and assumed that the country with the highest number of mentions was the same as the country whose central banker was giving the speech. Obviously, this isn't always going to be the case, but looking at some random examples shows that it often works, which should be good enough for exploratory purposes. (In any case, it should be a fairly reliable indicator of which country the speech is *about*.)

There are various ways of approaching the question "which country is the most original?". For each country with 50 or more speeches, I computed the mean speech vector for that country, and then compared the mean vectors, again using cosine similarity. Flipping this around to dissimilarity gives an "originality rating" for each country. (Note: although the y-axes in the first two figures are not labelled, they both measure average cosine similarity, so are directly comparable.)
<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2024/speech_originality.png" />
</div>
Again, these countries will be shuffled depending on the model run, but the pattern is that Ukraine and Argentina usually come out on top, while big economies tend to have less original speeches. Argentina is famous for having an unusual economy, so this makes some sense. The high originality score for Ukraine may be because there were many speeches *about* Ukraine following the 2022 invasion. 

# Visualisation
I used some projection techniques to try and visualise the speeches. One possible approach is to use a 2D doc2vec model instead of the 25D embedding, but this doesn't work at all. Instead, I projected the vectors into 2D using PCA and t-SNE. The t-SNE method can yield almost anything if you tweak the parameters enough, so I usually prefer PCA. To avoid having too many points, I just plotted 100 speeches from each of the G7 countries.
<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2024/PCA.png" />
</div>
The speeches form a blob with no obvious structure at all. If you look carefully, you can see that the non-EU countries (including the UK, which did not leave the EU until 2016) tend to be more likely to be on the periphery, but that's about it. The overall conclusion seems to be that there is a lot more diversity in speeches over time than between countries.

# Conclusions
- Central bankers say similar things when there is some sort of urgent global crisis or event (such as the outbreak of COVID-19). This is not surprising at all, because they are all talking about the crisis.
- There was no obvious tendency for central bankers to either say the same things as each other or different things during a recession versus non-recession.
- Central bank speeches were least similar during the period of low real rates around 2011-2020, probably because policies were not implemented at the same time in different places (e.g. the EU was reluctant to perform QE while the US started it quite early).
- Central bankers in different countries say remarkably similar things. There is a lot more variation over time than between countries.

# Code
I put the code in a notebook at <a href="https://github.com/rtrvale/EDA">https://github.com/rtrvale/EDA</a>.
