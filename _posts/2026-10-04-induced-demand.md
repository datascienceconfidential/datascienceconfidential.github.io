---
layout: post
title: "Some simple models of induced demand"
subtitle: "Why does traffic expand to fill the space available?"
header-img: "/blog/images/2026/induced_demand_grid_small.png"
date: 2026-10-04
author: Richard
categories: economics
published: true
citable: true
---
I recently gave [a talk](https://mot-analytics.gitlab.io/monty/publication-and-website/monty-website/presentations/richard_vale_MUGS2026.pdf) at a transport modelling conference where a number of people were talking about *induced demand*. This is the concept that building roads causes more traffic, so "reducing congestion" is not necessarily a great reason to build more roads, because the new roads will simply encourage more people to travel by car, and you will end up with just as much congestion as before. Similarly, removing roads does not necessarily increase congestion on the remaining roads. Instead, in certain circumstances most of the traffic just seems to vanish. This is called [*disappearing traffic*](https://reconnectaustin.com/resources/cnus-highways-to-boulevards-2/traffic-studies/).

There's a very good [Wikipedia article on induced demand](https://en.wikipedia.org/wiki/Induced_demand). The idea that traffic expands to meet the available road space is also called the *Lewis-Mogridge Position*.

The idea is that the extra traffic is caused either by people making more trips because of the new routes available to them, or by people choosing to buy cars (or perhaps choosing to commute by car rather than public transport) because the extra roads have lowered the cost of car travel in terms of wasted time, etc. The phenomenon, however, seems quite counterintuitive. Usually it's a good idea to begin understading something by building the simplest possible model of it, so I wondered what was the simplest possible model of induced demand. And is there a simple model in which building roads causes *more* congestion?

# A very basic model

Suppose there are $n$ cars and a quantity $r$ of road space. The amount of congestion could be measured by the number of cars per road, so $n/r$. The idea of induced demand is that people will buy more cars (or make more car trips) if they notice that the roads are less congested, which means that there should be a decreasing function $f$ such that

$$ n = f(n/r) $$

Just about the simplest choice would be $f(n/r) = cr/n$, which leads to 

$$ n \propto \sqrt{r}. $$

This suggests, for example, if you add two lanes to a two-lane highway, you should expect to see not half as much congestion, but $0.7$ times as much, since doubling the number of lanes should increase the number of cars by a factor of $\sqrt{2}$.

# A planar urban model

Perhaps geometry should be taken into account? I was inspired by the [Alonso-Muth-Mills model](https://archive.org/details/citiesagglomerat0000glae/page/n5/mode/2up) to imagine a city as a disc, in which everything depends on the distance to the centre.

<div style="width:30%; margin:0 auto;">
 <img src="/blog/images/2026/amm_city.png">
</div>

Suppose at a distance $d$ from the centre, there is a density of roads $\rho(d)$ and a density of cars $n(d)$. Every day, all the cars travel into the centre and back again. What would congestion look like?

Let $D$ be the diameter of the city and consider a distance $0 < d < D$. The number of cars at this distance will be $2 \pi d n(d)$, and the total amount of roads which these cars will traverse are all the roads within distance $d$ from the centre, so $\int_0^d 2 \pi u \rho (u) du$. All the cars in the city travel through the disc every day, so the congestion faced by the $2 \pi d n(d)$ cars will be $\int_0^d 2 \pi u \rho (u) du / N$. If the total number of cars is taken as fixed, and $\rho(u) = c$ is a constant, then it follows that $n(d) = cd/N \propto d$. In other words, there are more and more car owners the further out you go, which makes sense.

Now take it as given that more roads will result in more cars. Suppose the density of cars is related to the density of roads by 

$$ 2\pi d n(d) = \int_0^d 2 \pi u \rho(u) du.$$

The question is, can you ever make congestion *worse* by building *more* roads?

If $\rho(u) = c$ then $n(d) = cd/2$ and the average congestion over the whole city can be computed by dividing the total amount of cars by the total amount of roads, so it is

$$ \frac{\int_0^D 2 \pi u (cu/2) du}{\int_0^D 2\pi u c du} = \frac{cD^3/6}{c D^2/2} = D/3. $$

Now suppose the density of roads is increased to $c_0 > c$ within a disc of radius $d_0$ around the city centre. What happens to congestion?

The number of roads becomes

$$ \int_0^{d_0} 2\pi cu du + \int_{d_0}^D 2\pi cu du = 2\pi c_0 d_0^2/2 + 2\pi c (D^2 - d_0^2)/2 $$

and by calculating $\int_0^d 2\pi u \rho(u) du$ you get

$$2\pi d n(d) = \pi c d^2 + \pi (c_0 - c)d_0^2 $$

from which the number of cars becomes

$$ \int_0^{D} 2\pi u n(u) du = \pi c D^3/ 3 + \pi(c_0-c)d_0^2 D $$

and the ratio of cars to to roads becomes

$$ \frac{cD^3/3 + (c_0-c)d_0^2 D}{cD^2 + (c_0-c)d_0^2}. $$

If $D$ is fixed and $c_0 \rightarrow \infty$, the second term dominates and the ratio can become as close to $D$ as we want. But $D > D/3$. So yes, in this model it's possible that building more roads causes more congestion.

# An agent-based model

I wasn't completely convinced by the above calculation because it seemed to rely on some shaky assumptions, so I decided to try building a very simple "agent-based" model of the same thing.

Start with a graph $G$, which I'll take to be a grid or modified grid, designed so that it has a single central vertex. Suppose at every node on the grid (other than the central vertex) there is a person with a car. Let the weight of every edge be set to $1$. At each time step, choose a node at random. Use Dijkstra's algorithm to find the path from this node to the central node with the smallest sum of edge weights. If the total weight of this path is below some threshold $k$, then set that path as that person's commute for all time. Incremement the weights on all edges on the path by $1$. Otherwise, the person has no way of reaching the central vertex in an acceptable amount of time, so do nothing. In either case, eliminate the chosen node from further consideration.

In this model, congestion is measured by the average edge weight over all edges in the network. The question is: can a graph with extra edges become more congested?

The answer is yes. Here is a comparison of two networks. The first is an $11 \times 11$ grid and the second is the same grid with $32$ extra edges added within a radius $2$ of the centre vertex.

<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2026/induced_demand_graphs.png">
</div>

After running the algorithm, the edge weights look like this.

<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2026/induced_demand_weights.png">
</div>

Congestion over time looked like this. At first it was higher in the network with fewer edges, but as the second network (plotted in orange) allows many more trips, it ends up becoming more congested.

<div style="width:80%; margin:0 auto;">
 <img src="/blog/images/2026/induced_demand_comparison.png">
</div>

## What happens in 3D?

Just for fun, I wondered what would happen in 3D. I thought the effect might disappear, by analogy with the famous quote "a drunken bird may get lost forever." However, the effect actually became even stronger.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/induced_demand_3d_graphs.png">
</div>

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/induced_demand_3d_comparison.png">
</div>

# Conclusion

So building more roads can indeed cause the road network to become even more congested. Of course, this doesn't really tell us whether or not building or removing roads is a good idea. After all, you can make congestion go to zero by removing *all* the roads, but that probably won't be optimal. However, the concept of induced demand does show that perhaps congestion isn't the right thing to be targeting in the first place, because making it go down is harder than it looks.