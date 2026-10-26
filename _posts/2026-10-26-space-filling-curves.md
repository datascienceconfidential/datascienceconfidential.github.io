---
layout: post
title: "Battles and space-filling curves"
subtitle: "An interesting data viz technique"
header-img: "/blog/images/2026/battle_plot.png"
date: 2026-10-26
author: Richard
categories: r graphics
published: true
citable: false
---
I recently learned about an interesting way of reducing the dimension of a data set. I'd like to illustrate it with a data set of about 550 historical battles in the UK, extracted from [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page) using a SPARQL query. No doubt some readers will have seen this idea before, but it's new to me and I found it pretty.

The following plot shows the raw data, with a crossed swords symbol for the location of each battle. It's possible to see some patterns on the plot (for example, it probably wasn't much fun to live on the borders of mediaeval Wales) but it could be clearer.

<div style="width:90%; margin:0 auto;">
 <img src="/blog/images/2026/battle_map.png">
</div>

One way to visualise battles over time is to make a 2D graph with time on one axis and location on another axis. But how do you plot a 2D location on a 1D line? One answer is to use a space-filling curve, which in this case will be a curve which snakes all over the map, visiting every location once. This won't necessarily preserve the relationship between points (points which are close together in 2D could be far apart in 1D) but at least points which are close together in 1D are guaranteed to be close together in 2D.

One example of a space-filling curve is the [Hilbert curve](https://en.wikipedia.org/wiki/Hilbert_curve). A typical Hilbert curve can be created by writing a function which takes an integer `n` as input and produces a $2^n \times 2^n$ matrix like this:

$$
\left[
\begin{matrix}
   0  &  3  &    4  &    5  &   58  &   59  &   60  &   63\\
   1  &  2  &    7   &   6  &   57  &   56  &   61  &   62\\
  14  & 13  &    8  &   9   &  54  &   55   &  50  &   49\\
  15  & 12  &   11   &  10   &  53  &   52   &  51  &   48\\
   16 &  17  &   30  &   31  &   32  &   33  &   46  &   47\\
  19  & 18  &   29  &   28   &  35  &   34   &  45  &   44\\
  20  & 23  &   24  &   27  &   36   &  39  &   40  &   43\\
  21 &  22  &   25   &  26  &   37   &  38   &  41   &  42\\
\end{matrix}
\right]
$$

This matrix should be interpreted as a curve which starts at zero and follows the numbers in order, like this:

<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2026/hilbert_curve_example.png">
</div>

As `n` increases, the curve becomes more and more complicated. The visualisation below uses a $64 \times 64$ grid and a curve like this:

<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2026/hilbert_curve_example_2.png">
</div>

For the final visualisation, I used a rectangle between $-6$ and $1.8$ degrees longitude and $49.8$ and $58$ latitude. I added the locations of some cities to the plot and plotted squares which were mostly sea as blue lines.

<div style="width:97%; margin:0 auto;">
 <img src="/blog/images/2026/battle_plot.png">
</div>

I quite like the visualisation. Firstly, you can see some of the geography. There are three clusters of points which, going from left to right, seem to correspond roughly to Wales, Scotland, and England (the original data contained part of Ireland, but I cut out most of it using the bounding rectangle). Periods of extended conflict over a particular place appear as vertical columns of points. When there was a general conflict over a wide area, you see a horizontal line of points. Some features of the data are much more obvious on this visualisation than on the original map.

<div style="width:97%; margin:0 auto;">
 <img src="/blog/images/2026/battle_plot_with_markup.png">
</div>

I've highlighted a few interesting features. The most obvious is the line of points highlighted in yellow, which correspond to the [English Civil War](https://en.wikipedia.org/wiki/English_Civil_War). The points highlighted in purple are the [Jacobite Rebellion](https://www.visitscotland.com/things-to-do/culture-history/jacobites), which up to now were the last major land battles in the UK. The long [Conquest of Wales](https://www.historic-uk.com/HistoryUK/HistoryofWales/The-English-conquest-of-Wales/) which was also visible on the original map is highlighted in turquoise.

Various other patterns can be detected by staring at the map. The weird-looking row of points near London highlighted in green are various battles from the twentieth century, mostly associated with the two world wars, including the Battle of Britain and various naval engagements.

Overall, I thought this was a very interesting technique, and I wonder where it comes from. Who came up with the idea of using a space-filling curve for dimension reduction? Is there an optimal way to do it (i.e. given some data, is there a "best" way of choosing a space-filling curve to minimise distortion in your plot?) I don't know!