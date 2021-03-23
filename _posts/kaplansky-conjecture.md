---
layout: post
title: "Giles Gardam solved Kaplansky's Conjecture"
subtitle: ""
header-img: ""
date: 2021-03-23
author: Richard
categories: mathematics algebra
published: true
---
I was busy preparing a post on how much I hate $R^2$ when I read some remarkable news from the world of mathematics. A conjecture has been proven and, in an incredibly rare confluence of circumstances, not only have I heard of it, but I also understand the statement. So I decided to write a short expository post about it.

Kaplansky's Conjecture was a conjecture about the group algebra of a group. [Groups](https://en.wikipedia.org/wiki/Group_(mathematics)) are things that you learn about in undergraduate mathematics. A group is basically a set of symbols and a law for multiplying them together, with certain properties. The [group algebra](https://en.wikipedia.org/wiki/Group_ring) is formed from a group by taking all formal linear combinations of its elements with coefficients in a field.

For example, your group could consist of two elements $g$ and $e$ with the multiplication law $gg = ee = e$, $eg = ge = g$, and then an element of the group algebra would be something like $2e + 3g$. You multiply elements of the group algebra together by following linearity and the group law. For example, to multiply $2e + 3g$ and $e - g$, you would do this:

$$(2e + 3g)(e - g) = 2ee + 3ge - 2eg - 3gg = -e + g.$$

In this group, the element $e$ acts like the number $1$, because multiplying by it gives you back the thing you started with. This is also the "1" of the group algebra. Every group has an element with with property, called the identity element and denoted $1$.

Group algebras are interesting for various reasons, but partly because they provide one of the simplest and most natural examples of noncommutative rings, which are algebraic objects which I studied in my PhD research. (The above group $\{e, g\}$ actually gives a commutative group algebra, but there are many noncommutative groups.)

An element of the group algebra is called a *unit* if it can be multiplied by something to give $1$. In other words, if it's invertible. Kaplansky's Conjecture is about units in the group algebra.

A group has the property that each of its elements is invertible. In other words, there's always an element which you can multiply by to get back to the identity element. For example, in the above group, the inverse of $g$ is $g$. So each element of the group is also a unit in the group algebra.

Are there any other units? Yes, for example $2e + g$ is a unit because

$$(2e + g)( \frac{2}{3}e - \frac{1}{3}g) = \frac{4}{3}ee + \frac{2}{3}ge + -\frac{2}{3}ge - \frac{1}{3}gg = e$$

but this only works because there is some power of $g$ which is equal to the identity element, namely $g^2 = gg = e$.

A group is said to be torsion-free if no power of any element is equal to the identity element. For example, the group consisting of the commands "stand still", "go n steps north" and "go n steps south" (for $n \ge 1$) is torsion-free (at least if you are on an infinite plane) because there's no way of getting back to where you started by taking any number of steps in a single direction.

[Kaplansky's Conjecture](https://en.wikipedia.org/wiki/Kaplansky%27s_conjectures) states that if the group is torsion-free, then the only way to have a unit in the group algebra is if its an element of the group itself, or a multiple of such an element. In other words, the units of the group algebra $KG$ of a torsion-free group over a field $K$ are $\lambda g$ for $\lambda \neq 0$ and $g \in G$.

This conjecture is 80 years old. I never studied it myself, but I did work on group algebras, since my thesis was about a structure made up from a mixture of a group algebra and differential operators. I heard of the conjecture because it was the motivation for some of my PhD supervisor's research.

Anyway, just last month a mathematician called Giles Gardam disproved the conjecture. A nice thing about this is that for a disproof, you only need a single example, so there is no doubt at all that his proof is correct, since he just needed to write down an example of a group algebra and a nontrivial unit. Actually getting there, however, is a huge achievement because it's taken 80 years of mathematical work and has been missed by all the mathematicians who have tackled the question over the years. [His paper](https://arxiv.org/pdf/2102.11818.pdf) describes the counterexample in detail and explains how to compute it by hand.

[More details here.](https://www.uni-muenster.de/MathematicsMuenster/news/artikel/2021-03-04.shtml)
