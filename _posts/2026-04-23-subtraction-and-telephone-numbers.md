---
layout: post
title: "Subtraction and Telephone Numbers"
subtitle: "Representation theory can be surprisingly useful!"
header-img: "/blog/images/2026/three_by_three_table.png"
date: 2026-04-23
author: Richard
categories: mathematics
published: true
citable: true
---
I have a couple of posts lined up about statistics and economics, but it's been a while since I wrote anything about mathematics. The term *telephone numbers* in the title of this post doesn't refer to numbers which uniquely identify telephones. Rather, it refers to numbers which count how many involutions there are on a set of a given size. More on that later!

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2026/three_by_three_table.png">
</div>

I recently came across a paper by Odrzywołek about a way of generating [many different functions from a single binary operator](https://arxiv.org/html/2603.21852v2). The operator in question is defined by

$$EML(x, y) = \exp(x) - \log(y)$$

and Odrzywołek shows that basically the entire repetoire of functions on a scientific calculator can be constructed by iteratively applying this function plus the constant $1$. For example, $\exp(x) = EML(x, 1)$ and $\log(x) = EML(1, EML(EML(1, x), 1))$. From this, you can get the addition and multiplication functions and a lot of other things.

This is nice because it means that you could create a calculator with just the digit keys plus a single `EML` button and it would be able to calculate the same things as a normal scientific calculator. It's an unexpected analogue of the fact that you can [create any logical expression by repeatedly applying NAND](https://en.wikipedia.org/wiki/Sheffer_stroke).

The paper by Odrzywołek gives examples of some other functions which also work, for example $EDL(x, y) = \exp(x)/\log(y)$. This led me to wonder what sort of mathematical properties such a function would have to satisfy. I was not able to work it out, but I did encounter some interesting algebra along the way.

# Generalising EML

I started with the idea that maybe you could replace $\exp$ and $\log$ by some function $f$ and its inverse $f^{-1}$ and define a binary operation $g(x,y) = f(x)-f^{-1}(y)$. Then as before, you get $g(x,e)=f(x)$ and $g(e, g(g(e, x), e)) = f^{-1}(x)$ provided $e = f(0)$. This was appealing to me because it would enable you to construct $f$, $f^{-1}$, and $C(x,y) = f^{-1}(f(x) + f(y))$ in the case that $f$ is the generator of an [archimedean copula](https://en.wikipedia.org/wiki/Copula_(statistics)) $C$. But in general it won't let you construct the addition and multiplication functions; only addition.

Similarly, if you start with $g(x,y) = f(x)/f^{-1}(y)$ then you can construct multiplication but not necessarily addition.

Then I wondered if you could replace the subtraction or division by something else. What kind of operation $\ominus$ would guarantee that $f^{-1}$ can be constructed from the binary operation $g(x, y) = f(x) \ominus g(y)$? It quickly becomes apparent that it is sufficient that $\ominus$ obeys the following two axioms for all $x,y$ and for some special element $e$.

<div style="border: 1px solid black; padding:10px;">
$$
\begin{align*}
x \ominus e &= x \tag{A1}\label{eq:A1}\\
x \ominus (x \ominus y) &= y \tag{A2}\label{eq:A2}
\end{align*}
$$
</div>
<br>
Then if $a$ satisfies $f^{-1}(a) = e$, you have $g(x, a) = f(x)$ and 
$g(a, x) = f(a) \ominus f^{-1}(x)$ and 

$$g(g(x, a), a) = f(f(a)\ominus f^{-1}(x))$$ 

and 

$$g(a, g(g(x,a), a)) = f(a)\ominus (f(a) \ominus f^{-1}(x)) = f^{-1}(x)$$

as desired. 

Then the question is: are there any interesting possibilities for $\ominus$? We know that subtraction and division work, but what else could go there?

Subtraction and division both have the property that there is some [abelian group](https://en.wikipedia.org/wiki/Abelian_group) $(A, +)$ with $x \ominus y = x + (-y)$. So what further conditions must be added to $\eqref{eq:A1}$ and $\eqref{eq:A2}$ to guarantee that $\ominus$ is the subtraction of an abelian group?

# Subtraction in an abelian group

Here is a theorem:

### Theorem

A binary operation on a set $A$ satisfying $\eqref{eq:A1}$ and $\eqref{eq:A2}$ is the subtraction law of an abelian group if and only if the following additional property holds for all $x, y, z \in A$.

$$
\begin{align*}
x \ominus (y \ominus z) &= z \ominus (y \ominus x) \tag{B1}\label{eq:B1}
\end{align*}
$$

### Proof

Since the subtraction law of an abelian group has the required properties, it suffices to construct an abelian group from $(A, \ominus, e)$. Define

$$x \oplus y = x \ominus (e \ominus y).$$

Then first show that $(e \ominus y) \ominus z$ = $(e \ominus z) \ominus y$ for all $y, z \in A$. This follows from 

$$
\begin{align*}
(e \ominus y) \ominus z &= (e \ominus y) \ominus (z \ominus e) &\eqref{eq:A1}\\
&= e \ominus (z \ominus (e \ominus y)) &\eqref{eq:B1}\\
&= e \ominus (y \ominus (e \ominus z)) &\eqref{eq:B1}\\
&= (e\ominus z) \ominus (y \ominus e) &\eqref{eq:B1}\\
&= (e \ominus z) \ominus y &\eqref{eq:A1}
\end{align*}
$$

Now the associativity of $\oplus$ can be proven. For any $x, y, z \in A$:

$$
\begin{align*}
x \oplus (y \oplus z) &= x \ominus (e \ominus (y \ominus (e \ominus z)))\\
&= x\ominus ((e\ominus z) \ominus (y \ominus e)) &\eqref{eq:B1}\\
&= x \ominus ((e \ominus z) \ominus y) &\eqref{eq:A1}\\
&= x \ominus ((e \ominus y) \ominus z) &\text{lemma}\\
&= z \ominus ((e \ominus y) \ominus x) &\eqref{eq:B1}\\
&= z \ominus ((e \ominus y) \ominus (x \ominus e)) &\eqref{eq:A1}\\
&= z \ominus (e \ominus (x \ominus (e \ominus y))) &\eqref{eq:B1}\\
&= (x \ominus (e \ominus y)) \ominus (e \ominus z) &\eqref{eq:B1}\\
&= (x \oplus y) \oplus z 
\end{align*}
$$

as required. Commutativity of $\oplus$ follows immediately from $\eqref{eq:B1}$. That $e$ is an identity element follows from $\eqref{eq:A1}$. For an element $x$, the inverse of $x$ under $\oplus$ is $e \ominus x$:

$$
\begin{align*}
x \oplus (e \ominus x) &= x \ominus (e \ominus (e \ominus x)) &\\
&= x \ominus x &\eqref{eq:A2}\\
&= x \ominus (x \ominus e) &\eqref{eq:A1}\\
&= e &\eqref{eq:A2}\\
\end{align*}
$$

which finishes the proof.

# Subtraction in general

Next question: are there structures $(A, \ominus, e)$ which satisfy $\eqref{eq:A1}$ and $\eqref{eq:A2}$ but don't come from an abelian group? How do you construct them?

Twenty years ago I studied representation theory, and I've finally found a use for it! One of the morals of representation theory is to think about a binary operation like $x \ominus y$ via the function $x \ominus (-)$, in other words, "$x$ acting on something". So define $P_x: A \rightarrow A$ by $P_x(y) = x \ominus y$. Then $\eqref{eq:A1}$ says $P_x(e) = x$ and $\eqref{eq:A2}$ says that the composition of $P_x$ with itself is $P_x^2 = \text{id}$, the identity function.

It's immediately clear that a structure $(A, \ominus, e)$ which satisfies $\eqref{eq:A1}$ and $\eqref{eq:A2}$ is the same thing as a set of functions $\lbrace P_x: x \in A \rbrace$ where each $P_x$ is an involution (meaning if you apply it twice you get the identity function) and where $P_x(e) = x$.

This makes it easy to construct examples. For example, start with a three-element set $A = \lbrace e, x, y \rbrace$. Take $P_e$ to be the identity. Then $P_x$ has to swap $e$ and $x$, so it must leave $y$ fixed. Similarly, there is only one choice for $P_y$. This gives the following multiplication table for the operation $\ominus$ (the entries of the table are $\text{row}\ominus\text{column}$).

$$
\begin{array}{c|ccc}
 & e & x & y\\
\hline
e & e & x & y\\
x & x & e & y\\
y & y & x & e
\end{array}
$$

You can check that this satisfies $\eqref{eq:A1}$ and $\eqref{eq:A2}$. Furthermore, this $\ominus$ doesn't come from an abelian group because, for example $x \ominus (e \ominus y) = x \ominus y = y$ but $y \ominus (e \ominus x) = x \neq y$.

The number of involutions on a set $A$ of size $n$ is the $n^{\mathrm{th}}$ [telephone number](https://en.wikipedia.org/wiki/Telephone_number_(mathematics)) $t(n)$. The name comes from the fact that $t(n)$ is the number of ways $n$ people can make phone calls with each other, where each person is either making a call (and therefore connected to exactly one other person) or not making a call at all. Treating the elements of the set $A$ as distinugishable, there are $t(\lvert A\rvert - 1)$ possibilities for $P_e$ and $t(\lvert A\rvert-2)$ possibilities for $P_x$ when $x \neq e$ (since $P_x$ must swap $e$ and $x$) and therefore

$$t(\lvert A\rvert-1)t(\lvert A\rvert-2)^{\lvert A\rvert-1}$$

possible operations $\ominus$ satisfying $\eqref{eq:A1}$ and $\eqref{eq:A2}$.

# Counting Telephone Algebras

Of course, it's more difficult and interesting to count up to isomorphism than to simply count. I'll use the name *telephone algebra* as shorthand for a set $A$ with a distnguished element $e$ and a binary operation $\ominus$ satisfying $\eqref{eq:A1}$ and $\eqref{eq:A2}$. No doubt this structure already has a name, but I was not able to find it in the [list of additional axioms for a magma](https://en.wikipedia.org/wiki/Magma_(algebra)) on Wikipedia.

So, how many telephone algebras are there on a set of size $n$, up to isomorphism? For $n=3$ the answer is $2$. One of them was constructed above. The other one is the same except that $P_e$ swaps $x$ and $y$. Its multiplication table is

$$
\begin{array}{c|ccc}
 & e & x & y\\
\hline
e & e & y & x\\
x & x & e & y\\
y & y & x & e
\end{array}
$$

If you let $e=0$, $x=1$, $y=2$ then this is exactly subtraction in the abelian group $\mathbb{Z}/3$.

$$
\begin{array}{c|ccc}
 & 0 & 1 & 2\\
\hline
0 & 0 & 2 & 1\\
1 & 1 & 0 & 2\\
2 & 2 & 1 & 0
\end{array}
$$

If $n=4$ then I think the answer is $10$. First, $P_e$ has to fix $e$. It can swap two of the other elements or fix them all. If it fixes them all, each of the other $P_x$ must swap $x$ and $e$ and can fix or swap the other two elements, so you can have three swappers, two swappers, one swapper, or no swappers among the $P_x$, which is four possibilities. Second, if $P_e$ swaps two elements, then the $P_x$ corresponding to the elements swapped by $P_e$ can either be swappers or not, giving three possibilities, and the remaining $P_x$ can be a swapper or not, for $3 \times 2 = 6$ possibilities. So in total there are $10$ possible cases.

I think the same sort of counting idea could be extended to any $n$. The permutations $\lbrace P_x: x \in A \rbrace$ form something like a [wreath product](https://en.wikipedia.org/wiki/Wreath_product) (which coincidentally is also something I used to study twenty years ago).

Unfortunately none of this has anything much to do with the original question about the $EML$ function, but at least it kept me amused for a while. Today happens to be the birthday of one of my old colleagues from my days as a PhD student so if you're out there, happy birthday!