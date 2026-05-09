---
layout: post
title: "Subtraction and Telephone Numbers II"
subtitle: "Colourful graphs"
header-img: "/blog/images/2026/total_colouring_example.png"
date: 2026-05-08
author: Richard
categories: mathematics
published: true
citable: true
---
This is a continuation of my [previous post]({{site.baseurl}}/mathematics/2026/04/23/subtraction-and-telephone-numbers.html) about certain algebraic structures.

We defined a *telephone algebra* (I'm still wondering what its real name is) to be a triple $(A, \ominus, e)$ where $A$ is a set, $\ominus$ is a binary operation on $A$, and $e \in A$ is a distinguished element, such that the axioms $x \ominus e = x$ and $x \ominus (x \ominus y) = y$ hold for all $x, y \in A$. An example is $(A, -, 0)$ where $A$ is any abelian group.

There are lots of natural question about these objects, one of which is: how can you classify them up to isomorphism? After a little more thought, I was able to figure out what they really are.

# Total colourings

A *total colouring* of a graph $G$ is an assignment of colours to the vertices and edges of $G$ such that:

- no two adjacent vertices are the same colour
- no two adjacent edges are the same colour
- no edge is the same colour as either of its end vertices

A totally coloured graph is a graph with a total colouring.

Every telephone algebra $A$ has an associated totally coloured graph $G(A)$ defined as follows. The vertices of $G(A)$ are $A \setminus \lbrace e \rbrace$. For two vertices $x \neq y$, the set of edges between them is
$\lbrace z \in A : z \ominus x = y \rbrace$. (This is well-defined because $z \ominus x = y$ if and only if $z \ominus y = x$.) There can be multiple edges between a pair of vertices, but there are no loops by definition.

The graph $G(A)$ is totally coloured by assigning colour $x$ to vertex $x$ for each $x \in A \setminus \lbrace e \rbrace$ and assigning the corresponding colour $z$ to each edge between $x$ and $y$. Note that $e$ can appear as an edge colour but not as a vertex colour. This is a total colouring because 

- No two adjacent vertices are the same colour because all vertices have different colours.
- If two adjacent edges share colour $z$, then there are $x$, $y$ and $w$ with $z \ominus x = y$ and $z \ominus y = w$. But then $x = w$.
- If an edge coloured $z$ has $z$ as an end vertex, then the other vertex is $z \ominus z = e$ which is not allowed.

Conversely, if $G$ is a graph with no loops but possibly with multiple edges, and $C$ is a set of colours of size equal to the number of vertices of $G$, and each vertex is coloured by a unique element of $C$, and the edges are coloured by $C \cup \lbrace e \rbrace$ for some extra colour $e$, and this colouring is a total colouring, then a telephone algebra can be defined on $C \cup \lbrace e \rbrace$ by specifying the action $x \ominus (-)$ of an element $x \in C \cup \lbrace e \rbrace$ to be the permutation which swaps the pairs of elements at the ends of the edges of colour $x$, and which swaps $x$ and $e$.

## Example

The following totally coloured graph:

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/total_colouring_example.png">
</div>

corresponds to the following telephone algebra:

$$
\begin{array}{c|ccc}
 & e & \color{blue}{u} & \color{yellow}{v} & \color{red}{w} & \color{green}{x} & \color{brown}{y}\\
\hline
e & e & \color{brown}{y} & \color{yellow}{v} & \color{green}{x}  & \color{red}{w}& \color{blue}{u} \\
\color{blue}{u} & \color{blue}{u} & e & \color{brown}{y} & \color{red}{w} & \color{green}{x} & \color{yellow}{v}\\
\color{yellow}{v} & \color{yellow}{v} & \color{blue}{u} & e & \color{green}{x}  & \color{red}{w} & \color{brown}{y}\\
\color{red}{w} & \color{red}{w} & \color{yellow}{v} & \color{blue}{u} & e & \color{green}{x} & \color{brown}{y}\\
\color{green}{x} & \color{green}{x} & \color{brown}{y} & \color{red}{w} & \color{yellow}{v} & e & \color{blue}{u}\\
\color{brown}{y} & \color{brown}{y} & \color{blue}{u} & \color{yellow}{v} & \color{green}{x} & \color{red}{w} & e \\
\end{array}
$$

You simply write down which vertices are swapped by which coloured edges. In this case, black is the colour used for the element $e$ which doesn't appear as a vertex colour.

# Some colourful algebra

From this correspondence, it's clear that telephone algebras correspond to certain types of totally coloured graphs. In particular, classifying telephone algebras up to isomorphism would be at least as difficult as classifying graphs up to isomorphism. I think you could write down a generating function to count them, but it looks like it might be a bit fiddly.

The graph point of view also lets you answer some natural questions about telephone algebras. For example, there's an object called a [pique](http://www.quasigroups.eu/contents/download/2006/14_7.pdf) which also abstracts the notion of subtraction in an abelian group. Among other properties, a pique has left and right cancellation. So a natural question is: if a telephone algebra has left and right cancellation, does it have to come from an abelian group?

Every telephone algebra has left cancellation. It has right cancellation if and only if $x \ominus z = y \ominus z$ implies $x = y$. But this is the same as saying that there can be at most one edge between any pair of vertices in the corresponding graph. It follows that you can definitely have left and right cancellation without being an abelian group. For example, delete all the multiple edges in the above example and you have right cancellation.

A pique has another property, which is that its multiplication table is a Latin Square, meaning that each element appears exactly once in each row and column. If a telephone algebra is a Latin Square, does it have to come from an abelian group? The answer is no. For example, you can take the totally coloured graph corresponding to $(\mathbb{Z}/2)^k$ for some $k$. This has a vertex for edge nonzero elements and a single edge between $x$ and $y$ coloured $x+y$ for all $x \neq y$. If you switch the colour of one edge in this graph to black, then the identity element now swaps $x$ and $y$, and $x+y$ now fixes $x$ and $y$. The multiplication table is still a Latin Square, but (if $k$ is large enough) it no longer comes from subtraction in an abelian group because if it did, the number of elements of order $2$ would be $2^k - 3$ (the permutation $x \mapsto 0-x$ fixes the identity element and $2^k-2$ nonidentity elements) which [is impossible](https://math.stackexchange.com/questions/4459439/number-of-elements-with-order-2-in-a-finite-abelian-group) if $k \ge 3$.

# A foolish theorem

In the [previous post](https://datascienceconfidential.github.io/mathematics/2026/04/23/subtraction-and-telephone-numbers.html) I showed that a telephone algebra $A$ corresponds to subtraction in an abelian group if and only if $x \ominus (y \ominus z) = z \ominus (y \ominus x)$ for all $x, y, z \in A$. It's natural to wonder what property of coloured graphs this corresponds to. This enables us to prove a (rather artificial) theorem about graph colourings which uses telephone algebras but doesn't mention them in its premise or conclusion.

Call a total colouring *foolish* if it has the following property: all vertices have different colours, and if two paths of length two have the same set of colours on both edges and one end, then they also have the same colour at the other end. Writing $x[a]y$ for an edge between $x$ and $y$ with colour $a$, the property is that if $a[b]x[c]d$ and $a'[b']y[c']d'$ are two paths with $\lbrace a, b, c \rbrace = \lbrace a', b', c' \rbrace$ then $d = d'$.

I call this foolish because it means that there must be subgraphs which look like a jester's hat, like this (where the black vertices could be any colour):

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/foolscap.png">
</div>

## Theorem

For $n \ge 4$, the complete graph $K_n$ has a foolish colouring with $n$ colours if and only if $n = 2^k -1$ for some $k$.

## Proof

If $n=2^k-1$ then colour the vertices of $K_n$ by the elements of $(\mathbb{Z}/2)^k \setminus \lbrace 0 \rbrace$ and the edge between $x$ and $y$ by $x+y$. There are only $n$ colours because we cannot have $x + y =0$ if $x \neq y$. This is a foolish colouring because if $x[y]a[z]b$ is a subgraph, where the brackets denote the colours of edges, then we have $y = x+a$ and $z=a+b$ and therefore $b = z + a = z + x + y$, regardless of how $x, y$ and $z$ are ordered. 

Conversely, suppose $K_n$ has a foolish colouring. This colouring corresponds to a telephone algebra of size $\lvert A \rvert = n+1$ where the edge between $x$ and $z \ominus x$ is coloured by $z$. The foolishness property then implies that $x \ominus (y \ominus z) = z \ominus (y \ominus x)$ for all $x, y, z$ not equal to $e$. Also, by construction, $e \ominus x = x$ for all $x$. Also, $x \ominus y = y \ominus x$ for all $x$ and $y$, because since $n \ge 4$ there is always a colour $u$ such that $x[y]t[u]$ and $y[x]t'[u]$ are two paths in the graph (every node is adjacent to an edge of every colour except itself) from which it follows that $u\ominus(x\ominus y) = u \ominus (y \ominus x)$. It follows that $x \ominus (y \ominus z) = z \ominus (y \ominus x)$ for *all* $x, y, z \in A$ (including possibly the element $e$). By the [theorem from last time]({{site.baseurl}}/mathematics/2026/04/23/subtraction-and-telephone-numbers.html) $(A, \ominus)$ is an abelian group where $\ominus$ represents subtraction. Since there is no extra colour on the edges, this group satisfies $e - x = x$ for all $x$ and is therefore of exponent $2$. It must therefore be isomorphic to $(\mathbb{Z}/2)^k$ for some $k$, and so $n = 2^k-1$ as required.

# Conclusion

I have no idea whether there is an easy combinatorial way to prove the above theorem, but I wouldn't be surprised if there was. I also don't know whether the theorem is at all interesting. The best I could do is that total colourings can be identified with traffic cycles (nodes are intersections, edges are roads, and the colours represent times at which traffic is allowed the flow through a particular intersection or road) and so the theorem is saying something about the existence of a traffic cycle with a certain property. But why would this property be interesting? It seems to be saying that (referring to the picture above) after you have released the red, green and blue cycles, you want to end up with all the traffic coming together at a single intersection. That sounds more like a traffic nightmare which you *wouldn't* want to happen! So I don't know.
