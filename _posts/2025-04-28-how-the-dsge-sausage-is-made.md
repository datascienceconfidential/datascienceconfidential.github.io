---
layout: post
title: "How the DSGE sausage is made"
subtitle: "Learning about DSGE models by coding one up from scratch"
description: "Complete code for solving and estimating a basic DSGE model using hand calculation, with equivalent Dynare and gEcon code for comparison"
header-img: "/blog/images/2025/dsge_post_title_image.png"
date: 2025-04-28
author: Richard
categories: economics r
published: true
---
## Introduction

I got interested in DSGE models after seeing a job ad mentioning them last year. I'm very interested in applications of Bayesian statistics to different fields, and it turns out that central bank economists like to use Bayesian methods to fit these models, for reasons which will be [illustrated below](#fitting-the-model-to-data). I'm also interested in modelling the macroeconomy, which is what DSGE models are designed to do. DSGE models are nowadays fairly entrenched in economics education. For example, the popular economics textbook *Macroeconomics* by Mankiw contains a section entitled *Towards DSGE Models* which illustrates the calculation of some impulse response functions for a dynamic model.

In New Zealand, quite a few people are using DSGE models. At the Reserve Bank there is the [NZSim model](https://www.nzae.org.nz/wp-content/uploads/2015/01/Sander.pdf) (which I'm particularly curious about). DSGE models are also being used [at Te Tai Ōhanga The Treasury](https://www.treasury.govt.nz/sites/default/files/2024-04/twp24-01.pdf) to predict things like the economic impact of natural disasters.

Dynamic Stochastic General Equilibrium (DSGE) models are a class of models which attempt to model the entire economy of a nation. Proponents of DSGE models say that they're the only sensible way to model the macroeconomy, even going so far as to [label everybody who doesn't use them as dilettantes](https://www.bruegel.org/blog-post/dsge-model-quarrel-again). Sceptics see them as [a toxic cocktail](https://criticalfinance.org/2017/11/19/dilettantes-shouldnt-get-excited/) of intimidating mathematical complexity and horrifying economic naïveté. Who is right? The only way to find out is to roll up our sleeves and actually try to answer the following questions:

- What is a DSGE model?
- What is the motivation for developing DSGE models? Why are they better than other models?
- How do you formulate and solve a DSGE model?
- How do you fit a DSGE model to data?

There are plenty of software packages which can fit DSGE models, so I could just run some code and pretend I know what I'm doing. But in order to really understand these models it's necessary to compute one by hand. The purpose of this post is to go through the process of "solving" and fitting a DSGE model step by step and compare the results with the output of some software packages. The best source I have found for explicit computations are the superb [PhD Macro Theory II lecture notes of Eric Sims](https://sites.nd.edu/esims/courses/ph-d-macro-theory-ii/), which I will be following closely for [part of this post](#hand-calculations). But I think there might be some value in explaining the same calculations from the point of view of someone who is not an insider. In particular, I will spend some time explaining points where I got stuck or confused.

Apart from the notes by Sims, I also got a lot of benefit from reading the [lecture notes by Karl Whelan](https://karlwhelan.com/blog/?page_id=2214) and (for Dynare) the [slides by Matteo Coronese](https://matteocoronese.eu/teaching/advanced-macroeconomics). Bear in mind that I'm not an expert! So if you find some mistakes in this post, I would be very grateful if you could point them out.

Before explaining the motivation, the name DSGE stands for Dynamic (evolving in time), Stochastic (involving some source of randomness), and General Equilibirum (all markets clear).

## Motivation

Let's start with a motivating question. Where do business cycles come from? Why does the economy go through cycles of boom and bust? The simplest model which exhibits business cycles is a beautiful toy model developed by Samuelson in 1939 and known as the Multiplier-Accelerator Interaction Model. (By the way, the best exposition of this model is the one in [Samuelson's original paper](https://doi.org/10.2307/1927758). It also appears in various textbooks, but they often ignore some of the important aspects.)

Here's a modified version<sup>[1](#myfootnote1)</sup> of [Samuelson's model](https://en.wikipedia.org/wiki/Multiplier-accelerator_model). Suppose we have an economy with output $Y_t$ which is made up of consumption $C_t$ and investment $I_t$, giving the general equilibrium condition

$$Y_t = C_t + I_t$$

and suppose that consumption is a fixed proportion of output $C_t = cY_t$. Suppose that there is a long-term steady state $Y_t = \overline{Y}$, $I_t = \overline{I}$, $C_t = \overline{C}$ and consider fluctuations around this steady state, which are denoted by lower case letters, so that $Y_t = \overline{Y} + y_t$ etc.

How is $I_t$ determined? At time $t$, assume that investors collectively choose to invest based on their observation of the most recent performance of the economy. The difference between output in the last two periods is $Y_{t-1} - Y_{t-2} = y_{t-1} - y_{t-2}$. Assume that the departure of investment from its steady state value is given by a multiple

$$i_t = a(y_{t-1} - y_{t-2})$$

the idea being that if output has recently grown then there will be more investment, but if output has shrunk then there will be less. Then you get

$$y_t = \frac{1}{1-c}(\overline{I} + (1-c)\overline{Y}) + \frac{a}{1-c}(y_{t-1} - y_{t-2})$$

or in other words, there are $\alpha, \beta$ with

$$y_t = \alpha + \beta y_{t-1} - \beta y_{t-2}.$$

You can solve this model exactly using the theory of difference equations, or you can simply plot some examples. For example, suppose $\alpha = 1, \beta = 0.9$, and suppose we start in a boom, so that output in the last two periods was $Y_1 = \overline{Y} + 1$ and $Y_2 = \overline{Y} + 2$. Then this is what happens:

```r
alpha <- 1
beta <- 0.9
n <- 100
y12 <- c(1, 2)

y <- rep(0, n)
y[1:2] <- y12

for (i in 3:n) y[i] <- alpha + beta * y[i-1] - beta * y[i-2]

plot(1:n, y, las=1, ylab="", xlab="Time", type="l")
mtext("y", side=2, line=3, las=2)
```
<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/samuelson_example.png" />
</div>

You get a business cycle! Beautiful! In fact, if you write $\Delta y := y_{t} - y_{t-1}$ then the equation for $y$ becomes

$$-\beta \Delta^2 y + \beta \Delta y + y = -\alpha$$

which is a discrete version of the [equation describing the motion of a spring under an external force](https://math.arizona.edu/~jwatkins/h-ode.pdf).

However, there is a fly in the ointment. If we were biologists, we could add a little bit of stochasticity and stop here. Cycles like the ones in the [Lotka-Volterra predator-prey model](https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations) of animal populations are observed in real life. But economists, rather flatteringly, give us (the participants in the economy) more credit than this. If we were living in our toy economy, we would notice that business cycles occur regularly and adjust our investment behaviour accordingly. Because we know about the business cycles, there won't actually be any business cycles! So this is not a good model of human behaviour.

The question now becomes: is it possible to construct a model of the economy in which the people inside the model *know* that they are inside the model, and yet business cycles can still occur? And this is the sort of question that DSGE models address.

## Forward-looking models

A general DSGE-type model can be put into the form

$$E_t[f(y_t, y_{t+1})] = 0$$

where $f$ is some function (depending on some stochasticity) and $y_t$ is a vector of observations. The operator $E_t$ denotes expectations conditioned on information available up to time $t$ but not beyond. This equation expresses the idea that whatever we decide to do at time $t$ will depend on what we expect to happen in the future, namely at time $t+1$.

In order to warm up, let's consider some simple examples of such models. About the simplest thing we could consider is

$$y_t = aE_t[y_{t+1}].$$

Applying iterated expectations to this equation gives us

$$y_t = a^2E_t[y_{t+2}] = \cdots = a^k E_t[y_{t+k}]$$

for all $k$. If $a < 1$ and $E_t[y_{t+k}]$ is bounded, then we must have $y_t = 0$. For example, say $a = 1/2$. Then $E_t[y_{t+1}] = 2y_t$, so $y_t$ might be something like the price of an asset that we expect to go to the moon. If it can't, then it turns out to be worthless.

On the other hand if $a > 1$, then we get an equation like $E[y_{t+1}] = 0.5y_t$ which describes something whose value is expected to decay, like a piece of rotting fruit, for example. In this case, $y_t$ could certainly be nonzero.

These models might seem overly simple, but actually the strategy for analysing more complicated models will be to reduce them, via a series of steps, to one of these two cases. 

With this in mind, let's consider the ["hello world"](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) example of a DSGE model.

## A model of the economy

Suppose as before that time moves in discrete steps (months or quarters, perhaps) and that output, consumption, and investment at time $t$ are related by

$$Y_t = C_t + I_t$$

but now we'll assume that $Y_t$ is produced by some technology which follows a Cobb-Douglas production function. Labour is taken to be fixed, so

$$Y_t = A_t K_t^\alpha$$

where $K_t$ represents capital at time $t$ (capital is the buildings and tools which are used to produce things but not consumed in the process of production, so things like potash mines, grain elevators, tractors, pizza ovens and rolling pins, but not coal or flour) and $A_t$ is a fudge factor called *total factor productivity* which represents various things including the level of technology at time $t$. 

Capital depreciates over time at a rate $\delta$, but new capital is created via investment, so the capital stock satisfies

$$K_{t+1} = K_t - \delta K_t + I_t.$$

Technology is assumed to be subject to random shocks. It goes up if, for example, someone invents the filofax, and goes down if something occurs to lower the level of production, like a pandemic for example. We assume that these shocks follow an $AR(1)$ process in logarithms, so

$$\log A_{t+1} = \rho \log A_t + \sigma_A\varepsilon_t$$

for some $0 < \rho < 1$ where

$$\varepsilon_t \sim N(0, 1).$$

There is a representative agent in the economy who seeks to consume just the right amount at each time step in order to maximise their lifetime expected utility. Their utility function is assumed to be logarithmic and the discount factor is $\beta$, so lifetime expected utility is

$$E_t\left[\sum_{\tau=t}^\infty \beta^{\tau-t}\log(C_\tau) \right]$$

which some authors write as $E_0[\sum_{t=0}^\infty \log(C_t)]$ and others as $E_t[\sum_{t=0}^\infty \log(C_t)]$, both of which I found quite confusing.

(An important point which took me a while to understand is that $C_t$ is chosen given all the information up to time $t$. Then the next value of the shock $\varepsilon_{t+1}$ is revealed, and $C_{t+1}$ is chosen on the basis of this new knowledge. The $\{C_t\}$ aren't chosen all at once. In the language of optimal control theory, this is a *closed loop* rather than an *open loop* problem.)

We can eliminate $Y_t$ and $I_t$ from the equations to reduce our model to the following problem

$$\text{max } E_t\left[\sum_{\tau=t}^\infty \beta^{\tau-t}\log(C_\tau) \right]$$

subject to (for all $t$)

$$\begin{align*}
K_{t+1} &= A_t K_t^\alpha - C_t + (1-\delta)K_t\\
\log A_{t+1} &= \rho \log A_t + \sigma_A \varepsilon_t\\
\varepsilon_t &\sim N(0, 1)
\end{align*}
$$

There are two ways of making progress on this problem. Both of them require some functional analysis to make fully rigorous. The right approach is to solve the Bellman Equation, but the approach taken by all the textbooks and lecture notes is to use Lagrange multipliers. 

Unfortunately we need to find some way to deal with the pesky expectation operator. Let's pretend that there are some large finite number of possible paths of the random shocks, and denote each such path by $s$. Let $\pi(s)$ be the probability of path $s$. Then we want to maximise 

$$\sum_s \pi(s) \sum_\tau \beta^{\tau-t}\log(C_\tau(s))$$

subject to a very large number of constraints (one for each $s$ and $\tau$)

$$K_{\tau+1}(s) = A_\tau(s)K_\tau(s)^\alpha - C_\tau(s) + (1-\delta)K_\tau(s)$$

Note that variables with a subscript $t$ are known at time $t$, so we can drop their dependence on $s$. Also, $K_{t+1}$ is known at time $t$. We can form the Lagrangian

$$\mathcal{L} = \log(C_t) + \lambda_t(A_tK_t^\alpha -C_t + \\(1-\delta)K_t - K_{t+1}) + \\
\beta\sum_s \pi(s)\log(C_{t+1}(s)) \\
+ \beta \sum_s \pi(s) \lambda_{t+1}(s)(A_{t+1}(s)K_{t+1}^\alpha\\
-C_{t+1}(s) + (1-\delta)K_{t+1} - K_{t+2}(s) ) + \cdots
$$

where $\lambda_t$ and $\beta\pi(s)\lambda_{t+1}(s)$ are Lagrange multipliers, and the dots represent more terms which don't involve $C_t$ or $K_{t+1}$.

Setting the derivative to zero with respect to $C_t$ yields

$$\frac{1}{C_t} = \lambda_t,$$

Setting the derivative to zero with respect to $C_{t+1}(s)$ yields 

$$\frac{1}{C_{t+1}(s)} = \lambda_{t+1}(s),$$

and doing the same with $K_{t+1}$ yields

$$\beta\sum_s \pi(s) \lambda_{t+1}(s)(A_{t+1}(s)\alpha K_{t+1}^{\alpha-1} +1-\delta) = \lambda_t.$$

Putting it all together gives the *Euler Equation*

$$\frac{1}{C_t} = \beta E_t\left[\frac{1}{C_{t+1}}(\alpha A_{t+1}K_{t+1}^{\alpha-1} + 1 -\delta)\right]$$

Usually the textbooks don't make the dependence on $s$ explicit, and treat $\lambda_{t+1}$ as though it's a scalar, inserting the expectation operator at the end.

We're left with a system of three equations: the Euler Equation, the *Law of Motion of Capital*

$$K_{t+1} =A_tK_t^\alpha - C_t + (1-\delta)K_t$$

and the *Law of Motion of Technology*

$$\log A_{t+1} = \rho \log A_t + \sigma_A \varepsilon_t.$$

The model described by these equations is called the Neoclassical Growth Model, or (a special case of) a Real Business Cycle Model.

Our task is to solve the model, which means that we want to give a function which tells us how to calculate $C_{t+1}$ from the information available at time $t$. Such a function is called a *policy function*. If $\delta = 1$, the policy function can be found exactly. If $\delta < 1$, we need to approximate it.

## Perturbation Solution

Just like in the Samuelson model, let's assume that the economy has a steady state and we're interested in small deviations from the steady state. Instead of additive, we'll assume that the deviations are logarithmic.

The steady state can be found by setting $C_t = \overline{C}$, $K_t = \overline{K}$, $A_t = \overline{A}$, $\varepsilon_t = 0$ for all $t$. From the Law of Motion of Technology, we have

$$\log \overline{A} = \rho \log \overline{A} + 0$$

and so $\overline{A} = 1$ (since we assume that $\rho < 1$). From the Euler Equation, we get

$$\frac{1}{\beta} = \alpha \overline{K}^{\alpha-1} + 1 - \delta$$

and so 

$$\overline{K} = \left(\frac{1}{\alpha}\left(\frac{1}{\beta} - 1 + \delta \right)\right)^{\frac{1}{\alpha-1}}$$

and from the Law of Motion of Capital, we get

$$\overline{C} = \overline{K}^\alpha - \delta \overline{K}$$

Now we define $c_t = \log(C_t/\overline{C})$, $k_t = \log(K_t/\overline{K})$, $a_t = \log(A_t/\overline{A})$. Following a method due to Uhlig, we can replace $C_t$ by $\overline{C} e^{c_t}$ and the same for the other variables, and make a first order approximation. To first order, the equation

$$E_t g(C_t, K_t, A_t, C_{t+1}, K_{t+1}, A_{t+1}) = 0$$

will become

$$E_t \nabla g (\overline{X})
\cdot (\overline{C}c_t, \overline{K}k_t, \overline{A}a_t, \overline{C}c_{t+1}, \overline{K}k_{t+1}, \overline{A}a_{t+1}) = 0$$

where $\overline{X} = (\overline{C}, \overline{K}, \overline{A}, \overline{C}, \overline{K}, \overline{A})$ and the dot denotes the dot product. This process is called log-linearisation.

As an example, let's compute the log-linearisation for the Law of Motion of Capital. We have

$$g = -C_t + A_tK_t^\alpha + (1-\delta)K_t - K_{t+1}$$

and

$$\nabla g = (-1, \alpha K_t^{\alpha-1} + 1 -\delta, K_t^\alpha, 0, -1, 0)$$

so 

$$\nabla g (\overline{X}) \cdot (\overline{C}c_t, \overline{K}k_t, \overline{A}a_t, \overline{C}c_{t+1}, \overline{K}k_{t+1}, \overline{A}a_{t+1}) = \\
-\overline{C}c_t + \frac{\overline{K}}{\beta}k_t + \overline{K}^\alpha a_t - \overline{K}k_{t+1} = 0$$

or equivalently

$$k_{t+1} = -\frac{\overline{C}}{\overline{K}}c_t + \frac{1}{\beta}k_t + \overline{K}^{\alpha -1} a_t.$$

Doing the same for the other two equations yields the following result

$$
E_t\left[\begin{matrix} {c}_{t+1}\\
{k}_{t+1}\\
{a}_{t+1}\end{matrix}\right] = \left[
\begin{matrix}
a & b & c\\
-\overline{C}/\overline{K} & 1/\beta & \overline{K}^{\alpha-1}\\
0 & 0 & \rho
\end{matrix}
\right]
\left[\begin{matrix}
{c}_t \\
{k}_t \\
{a}_t
\end{matrix}\right]
$$

where $a, b$ and $c$ are given by the following gnarly expressions

$$
\begin{align*}
a &= 1 - \beta\alpha (\alpha-1) \overline{C} \times \overline{K}^{\alpha-2}\\
b &= \alpha (\alpha-1) \overline{K}^{\alpha-1}\\
c &=  \rho\beta\alpha\overline{K}^{\alpha-1} + \beta\alpha (\alpha-1) (\overline{K}^{\alpha-1})^2
\end{align*}
$$

The next step is not hard to guess. If we could diagonalise the matrix which relates time $t+1$ to time $t$, then we'd have three single-variable equations of the form $E_t[w_{t+1}] = aw_t$ and we could solve them the way we did before.

### Hand Calculations

(Based on the [notes by Sims](https://sites.nd.edu/esims/files/2024/01/notes_linear_models_sp2024.pdf))

Let's consider a numerical example. Suppose<sup>[2](#myfootnote2)</sup> $\alpha = 0.33$, $\beta = 0.99$, $\delta = 0.1$, $\rho = 0.95$, $\sigma_A = 0.01$. Then

$$
\left[
\begin{matrix}
a & b & c\\
-\overline{C}/\overline{K} & 1/\beta & \overline{K}^{\alpha-1}\\
0 & 0 & \rho
\end{matrix}
\right] =
\left[
\begin{matrix}
\phantom{-}1.017 & -0.074 & 0.079\\
-0.234 & \phantom{-}1.010 & 0.334\\
0 & 0 & 0.950
\end{matrix}
\right]
$$

This matrix can be decomposed as $Q^{-1}DQ$ where

$$
D = \left[
\begin{matrix}
1.144 & 0 & 0\\
0 & 0.95 & 0\\
0 & 0 & 0.882
\end{matrix}
\right]$$

and

$$
Q = \left[
\begin{matrix}
1.027 & -0.562 & -0.545\\
0 & 0 & \phantom{-}3.941\\
1.014 & 0.585 & -4.067
\end{matrix}
\right]
$$

which means that

$$w_t := 1.027c_t - 0.562k_t - 0.545 a_t$$

satisfies

$$E_t[ w_t] = 1.144 w_t,$$

but we already saw that, under some mild conditions stating that $E[w_t]$ can't "go to the moon", this means that $w_t = 0$ and so

$$c_t = 0.547k_t + 0.530a_t$$

for all $t$. This is the first-order approximation to the *policy function*. Furthermore,

$$
\begin{align*}
k_{t+1} &= -0.234c_t +1.010k_t + 0.334a_t\\
&= -0.234(0.547k_t + 0.530a_t) + 1.010k_t + 0.334a_t\\
&= 0.882k_t + 0.210a_t
\end{align*}
$$ 

This is the first order approximation to the *transition function*, which is the function which computes $K_{t+1}$ in terms of $K_t$ and $A_t$.

Shift indices to define $k_t' := k_{t+1}$. Then since $a_t = 0.95a_{t-1} + 0.01\varepsilon_t$, we have

$$
\left[
\begin{matrix}
c_t\\
{k}_t'\\
a_t\\
\end{matrix}
\right] =
\left[
\begin{matrix}
0.547 & 0.504\\
0.882 & 0.199\\
0 & 0.95\\
\end{matrix}
\right]
\left[
\begin{matrix}
k_{t-1}'\\
a_{t-1}'
\end{matrix}
\right] +
\left[
\begin{matrix}
0.005304\\
0.002079\\
0.01\\
\end{matrix}
\right] \varepsilon_{t}
$$

and the expectation operator has magically vanished and we are left with a linear difference equation.

### Dynare

[Dynare](https://www.dynare.org/) (I think it's pronounced dee-*naire*; it's French) is a software package for Matlab and Octave which, among other things, fits DSGE models. First, save the following code in a file `hello_dynare.mod`.

```matlab
var k a c;

varexo e; // shocks

parameters alpha beta delta rho sA;
alpha = 0.33;
beta = 0.99;
delta = 0.1;
rho = 0.95;
sA = 0.01;

model;

/* Euler equation */
exp(c)^(-1) = beta*exp(c(+1))^(-1)*(alpha*exp(a(+1))*exp(k)^(alpha-1) + (1-delta));

/* law of motion of capital */
exp(k) = exp(a)*exp(k(-1))^(alpha) - exp(c) + (1-delta)*exp(k(-1));

/* law of motion of technology */
a = rho*a(-1) + sA*e;

end;

shocks;
var e = 1;
end;

steady;
check;

stoch_simul(order=1, periods=200, nograph, nodisplay);
```
Then run it in the Octave GUI with the command
```
dynare hello_dynare.mod
```
Among the output, you'll see
```
POLICY AND TRANSITION FUNCTIONS
                                   k               a               c
Constant                    1.638350               0        0.184374
k(-1)                       0.882253               0        0.547200
a(-1)                       0.199228        0.950000        0.503894
e                           0.002097        0.010000        0.005304
```
which is exactly what we just calculated! (Somewhat confusingly, the first row gives the steady state values. But no doubt there is a good reason for this.)

### gEcon

The R package `gEcon` is similar to Dynare. I'm not sure whether it is quite as powerful, but it has the advantage that you can type in the model without having to derive the Euler Equation yourself (although don't make a mistake or you will get a segmentation fault and R will crash!) In the code, `U[]` represents the value function and the `objective` block is the Bellman Equation.

To run it, save the following file as `hello_gecon.gcn`

```r
##################################################
# Neoclassical growth model in gEcon
##################################################

block CONSUMER
{
    definitions
    {
        u[] = log(C[]);
    };
    controls
    {
        K_s[], C[];
    };
    objective
    {
        U[] = u[] + beta * E[][U[1]];
    };
    constraints
    {
        K_s[] = A[] * K_s[-1]^alpha + (1 - delta) * K_s[-1] - C[] ;
    };
    calibration
    {
        delta = 0.1;
        beta = 0.99;
        alpha = 0.33;
    };
};

block EXOG 
{
    identities
    {
        A[] = exp(rho * log(A[-1]) + 0.01 * epsilon_A[]);
    };
    shocks
    {
        epsilon_A[];
    };
    calibration
    {
        rho = 0.95;
    };
};
```
and run
```r
library(gEcon)

rbc <- make_model("hello_gecon.gcn")
rbc <- steady_state(rbc)
rbc <- solve_pert(model = rbc, loglin = TRUE)
get_pert_solution(rbc)

```
Once again, you can identify the matrix we derived in the following output:
```
Matrix P:

       A[-1] K_s[-1]
A[]   0.9500  0.0000
K_s[] 0.1992  0.8823


Matrix Q:

    epsilon_A
A      0.0100
K_s    0.0021


Matrix R:

     A[-1] K_s[-1]
C[] 0.5039  0.5472
U[] 1.2366  0.2345


Matrix S:

  epsilon_A
C    0.0053
U    0.0130
```
## Simulation

Let's write R functions to find the first-order solution for a given choice of parameters and to simulate from the model.

```r
model_matrices <- function(alpha, beta, rho, delta, sigma_A){
  
  # steady state
  Abar <- 1
  Kbar <- (1/alpha * (1/beta -1 +delta))^(1/(alpha-1))
  Cbar <- Kbar^alpha + (-delta) * Kbar
  
  a <- 1 - beta * alpha * (alpha -1) * Cbar * Kbar^(alpha-2)
  b <- alpha * (alpha-1) * Kbar^(alpha-1)
  c <- rho * beta * alpha * Kbar^(alpha-1)
  c <- c + beta*alpha*(alpha-1)*(Kbar^(alpha-1))^2
  
  A <- matrix(c(a, b, c, -Cbar/Kbar, 1/beta, Kbar^(alpha-1), 0, 0, rho), byrow=2, ncol=3)
  
  eigs <- eigen(A)
  
  # check Blanchard-Kahn conditions
  # eigs$values are always ordered from largest to smallest in R
  BK_violated <- F
  if ((abs(eigs$values[1]) < 1) | (abs(eigs$values[2]) > 1)){
    BK_violated <- T
  }
  
  P <- eigs$vectors
  
  fr <- solve(P)[1, ] # corresponds to largest eigenvalue
  u <- A[2,1]*(-fr[2:3]/fr[1]) + A[2,2:3]
  Tt <- matrix(c(u*c(1, rho), 0, rho), ncol=2, byrow=T)
  Ht <- sigma_A * matrix(c(0, 0, Tt[,2]/rho), nc=2, byrow=F)
  
  list(Tt = Tt, Ht = Ht, BK_violated = BK_violated)
}
```
This function is pretty straightforward. It just does the computation which we already went through in a special case. It makes an additional check that the largest eigenvalue is really $>1$ and the others are $<1$. These are the famous *Blanchard-Kahn conditions* which guarantee that there is exactly one steady state.

The function outputs `Tt` which consists of the bottom two rows of the policy/transition function matrix, and `Ht` which is the vector of coefficients of $\varepsilon_t$ with an additional column of zeroes on the left. This format is chosen to match the conventions of the `dlm` package which will be used [below](#fitting-the-model-to-data) for fitting the model.

Checking in our example:
```r
model_matrices(0.33, 0.99, 0.95, 0.1, 0.01)
$Tt
          [,1]      [,2]
[1,] 0.8822534 0.1992279
[2,] 0.0000000 0.9500000

$Ht
     [,1]        [,2]
[1,]    0 0.002097136
[2,]    0 0.010000000

$BK_violated
[1] FALSE
```
To simulate from the model, what we really want to output is $y_t := \log(Y_t/\overline{Y})$ where $\overline{Y}$ is the steady-state value of output. Since $Y_t = A_t K_t^\alpha$, we have $y_t = a_t + \alpha k_t$. The following function outputs simulated values of $y_t, k_t$ and $a_t$.
```r
sim <- function(n, alpha, beta, rho, sigma, delta, sigma_A, start=c(0,0)){
  
  # n : number of simulations
  # start : starting values of (k, a)
  
  M <- model_matrices(alpha, beta, rho, sigma, delta, sigma_A)
  Tt <- M$Tt
  Ht <- M$Ht
  
  y_sim <- rep(0, n)
  ka_sim <- matrix(0, nr=2, nc=n)
  ka_sim[,1] <- start
  
  for (i in 2:n){
    ka_sim[,i] <- Tt %*% ka_sim[,i-1] + Ht %*% rnorm(2)
    y_sim[i] <- ka_sim[,i] %*% c(alpha, 1) 
  }
  list(y = y_sim, ka = ka_sim)
}
```
(Note that we do `Ht %*% rnorm(2)`; the first component of `rnorm(2)` gets multiplied by zero and does nothing. Again, this is to match the `dlm` package which I'll be using [below](#fitting-the-model-to-data).)

Now we can look at the output of the model. Note that here we're using the first-order approximation to simulate. I think this is a bit like using Euler's method to plot the solution of an ODE. It usually works pretty well, but it might go off track eventually.

```r
alpha <- 0.33
beta <- 0.99
rho <- 0.95
delta <- 0.1
sigma_A <- 0.01

set.seed(101)
s <- sim(200, alpha, beta, rho, delta, sigma_A)
plot.ts(s$y, las=1, ylab="")
```
<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/rbc_example.png" />
</div>

Even though the people (or rather person; representative agent) in the model knows everything about the model and behaves optimally, we still get business cycles! That's realistic, but it's not the reason why the model is called a real business cycle model. The name comes from the fact that it's a model of the [real economy](https://en.wikipedia.org/wiki/Real_economy); it ignores prices, wages, and monetary frictions.

Anyway, despite the fact that it is realistic in some ways, it turns out that such models are very unrealistic in other ways, and the problems with them can't be fixed, so they have fallen out of fashion since the 1980s.

## Fitting the model to data

Fitting the model to real-life data is important because the ultimate goal of DSGE modelling is to answer questions like *"how much will output rise if the government increases spending by x?"*. 

There seem to be two approaches to model fitting. The first, called *calibration*, is just to guess what the parameters might be and try to make the model output match some salient features of the observed data. If this was formalised, I suppose it would be something like [Approximate Bayesian Computation](https://bayesiancomputationbook.com/markdown/chp_08.html) (called *indirect inference* in economics). The second way of fitting the model, which makes more sense from the point of view of a statistician, is to write down a likelihood function and then do likelihood-based inference.

However, there is a complication in writing down the likelihood function. Recall that our example model (leaving out $c_t$) looks like

$$
\left[
\begin{matrix}
{k}_t'\\
a_t\\
\end{matrix}
\right] =
\left[
\begin{matrix}
0.882 & 0.199\\
0 & 0.95\\
\end{matrix}
\right]
\left[
\begin{matrix}
k_{t-1}'\\
a_{t-1}'
\end{matrix}
\right] +
\left[
\begin{matrix}
0.002079\\
0.01\\
\end{matrix}
\right] \varepsilon_{t}
$$

but we don't actually observe $k_t$ (the log deviation of the capital stock from its steady state) or $a_t$ (the log deviation of total factor productivity from its steady state). What we maybe do have is an estimate of output $Y_t$ since we can use the GDP, and we can estimate its log deviation $y_t$ from its steady state. However, we can't make further progress without positing some sort of statistical relationship between $y_t = a_t + \alpha k_t$, $k_t$ and $a_t$.

Fortunately, there's a standard approach to this problem called the Kalman Filter. I experimented with a few different Kalman Filter R packages, but I got confused because they all call things different names and I couldn't get two of them to give the same output. Finally I found the `dlm` [package by Giovanni Petris](https://cran.r-project.org/web/packages/dlm/index.html) which does exactly what I need (generally I like these kind of self-contained R packages which do one thing well rather than attempting to do everything).

```r
library(dlm)

build_dlm <- function(alpha, beta, rho, delta, sigma_A){
  
  # obtain a DLM model object from the parameters
  
  M <- model_matrices(alpha, beta, rho, delta, sigma_A)
  Tt <- M$Tt
  Ht <- M$Ht
  HHt <- M$Ht %*% t(M$Ht)
  
  # starting point for Kalman Filter variance
  P0 <- matrix(solve(diag(4) - kronecker(Tt, Tt)) %*% c(HHt), nc=2, byrow=F)
  
  dlm(m0 = matrix(c(0,0), nc=1),
      C0 = P0,
      FF = matrix(c(alpha, 1), nc=2),
      V = matrix(0),
      GG = Tt,
      W = sigma_A^2 * diag(2))
}
```

To construct the `dlm` object, `m0` is the starting point for the hidden (state) variables (in our case $(k_0, a_0)$), `P0` is the starting point for the variance of the hidden variables, `FF` is the matrix which defines `y` in terms of `k` and `a`, `V` is a constant which can be added to `y`, `GG` is the transition matrix for the state variables, and `W` is the variance-covariance matrix for the shocks. The formula for `P0` is the solution of the so-called *Lyapunov Equation*<sup>[3](#myfootnote3)</sup> which calculates the long-run limit of the variance-covariance matrix of the state variables.

Once you have the `dlm` object, there are functions `dlmLL` for calculating the negative log-likelihood and `dlmMLE` for the maximum likelihood estimator.

You can check that `dlmMLE` really recovers the model parameters by writing a piece of code like this (I'm going to do a little bit of calibration of my own by fixing $\alpha=0.33$ and taking $\beta = 0.99$ in this example.)

```r
alpha <- 0.33
beta <- 0.99
delta <- 0.1
rho <- 0.95
sigma_A <- 0.01

N_rep <- 100
N_sim <- 1000
build <- function(par) build_dlm(alpha, 
                                beta, 
                                exp(par[1])/(1+exp(par[1])),
                                exp(par[2])/(1+exp(par[2])), 
                                exp(par[3]))

out <- matrix(0, nc=N_rep, nr=3)

set.seed(102)

for (i in 1:N_rep){
  # simulate from model
  s <- sim(N_sim, alpha, beta, rho, delta, sigma_A)
  
  # calculate MLE
  opt <- dlmMLE(y=s$y, parm=c(0,0,0), build)

  # save MLE in output matrix
  out[,i] <- c((1/(1+exp(-opt$par[1:2]))), exp(opt$par[3]))
}

rowMeans(out)
# [1] 0.94887794 0.10367580 0.01011981
```

Note that it's much better to transform the variables and use unconstrained optimisation rather than trying to use `nlminb` and the simplex method.

### Real-life data

In order to see whether the model breaks down with real-life data, I downloaded the New Zealand GDP series from the [RBNZ website](https://www.rbnz.govt.nz/statistics/series/economic-indicators/gross-domestic-product). I'm not quite sure which series is most appropriate, but I decided to take seasonally-adjusted real production-based GDP as my $Y_t$. Because we are looking at long-term fluctuations of $Y_t$ about its steady state, the long-term growth trend in the series has to be removed (hopefully this also takes care of population growth).

```r
# raw data
Y <- ts(c(27979, 28130, 28258, 28148, 28016, 28080, 27835, 
28189, 28353, 28034, 27980, 27933, 27929, 28183, 28512, 27821, 
27632, 27721, 27900, 27983, 27986, 27771, 28120, 28581, 29213, 
29806, 30085, 30544, 30746, 31271, 31686, 32068, 32478, 32779, 
33000, 33466, 33761, 33981, 34424, 34296, 34967, 34887, 34827, 
34643, 34827, 34859, 35205, 35616, 35899, 36900, 37350, 37893, 
37904, 38053, 38122, 38252, 38790, 39079, 39657, 39998, 40527, 
41009, 41583, 41840, 42041, 42946, 43509, 44254, 44644, 44779, 
44947, 45469, 46202, 46439, 46250, 46990, 47185, 47471, 47864, 
48501, 48922, 49311, 49409, 49200, 49098, 48936, 48622, 48197, 
48167, 48397, 49014, 49170, 49509, 49387, 49105, 49618, 49802, 
50337, 50632, 50943, 51233, 51314, 52043, 51887, 52445, 52738, 
52931, 53746, 53982, 54695, 55540, 55725, 56152, 56692, 57269, 
57979, 58496, 59089, 59243, 59921, 60407, 60869, 61437, 62046, 
62639, 62716, 63665, 64243, 64263, 64756, 65403, 64687, 57967, 
66117, 66375, 67757, 68349, 65452, 68107, 68104, 68848, 70203, 
70208, 70156, 70688, 70717, 70857, 71111, 70346, 69604, 70056
), start=c(1987, 1), freq=4)

# preprocessing
y <- log(Y)
zz <- lm(y ~ x, data=data.frame(x=1:151))$resid

# fit model
opt <- dlmMLE(y=zz, parm=c(0,0,0), build)

# results
c((1/(1+exp(-opt$par[1:2]))), exp(opt$par[3]))
# [1] 0.83546378 0.07661051 0.01548509
```
It's hard to know whether the parameters for the $AR(1)$ process which drive the shocks in total factor productivity are sensible, but a capital depreciation rate of $7.7\%$ seems reasonable.

#### Maximum Likelihood Estimation with gEcon

In gEcon, we need to add an `EQUILIBRIUM` block and change the `EXOG` block as follows:

```r
block EQUILIBRIUM 
{
    identities {
        log_Y[] = log(A[]) + alpha * log(K_s[]);
    };
};

block EXOG 
{
    identities
    {
        A[] = exp(rho * log(A[-1]) + epsilon_A[]);
    };
    shocks
    {
        epsilon_A[];
    };
    calibration
    {
        rho = 0.95;
    };
};
```

Now run the code to solve the model again and add commands to perform inference.

```r
rbc <- make_model("hello_gecon.gcn")
rbc <- steady_state(rbc)
rbc <- solve_pert(model = rbc, loglin = TRUE)

# zz as above
zz <- lm(y ~ x, data=data.frame(x=1:151))$resid
df = data.frame(log_Y = zz)

ml_estimation_result <- ml_estimation(data_set = ts(df),
observables = c("log_Y"),
model = rbc,
est_par = c("rho", "delta", "sd(epsilon_A)"),
initial_vals = c("sd(epsilon_A)" = 0.01,
"rho" = 0.9, "delta" = 0.1))

summary(ml_estimation_result)
# The estimation results:
# The likelihood optimisation statistics:
#              ML estimate:   Std. err:
# rho             0.83796827 0.055224398
# delta           0.07310659 0.059381472
# sd(epsilon_A)   0.01039685 0.005797989
```

The results are pretty close to our hand calculation using `dlm`, although not quite the same.

#### Maximum Likelihood Estimation with Dynare

To fit the model in Dynare, we need to create a csv file with a single column containing the values in `zz` with a named header which I chose to call `y3`. Then you need to modify the `.mod` file and save it as `estimate_rbc_model.mod`. Then you can run it in Octave as before.

```matlab
var k a c y;

varexo e; // shocks

parameters alpha beta delta rho sA;
alpha = 0.33;
beta = 0.95;
delta = 0.1;
rho = 0.95;
sA = 0.01;

model;

/* Euler equation */
exp(c)^(-1) = beta*exp(c(+1))^(-1)*(alpha*exp(a(+1))*exp(k)^(alpha-1) + (1-delta));

/* law of motion of capital */
exp(k) = exp(a)*exp(k(-1))^(alpha) - exp(c) + (1-delta)*exp(k(-1));

/* law of motion of technology */
a = rho*a(-1) + e;

/* output */
y = a + alpha*k;

end;

steady_state_model;
a = 0;
k = log(((1/beta - 1 + delta)/alpha)^(1/(alpha - 1)));
c = log(exp(k)^alpha - delta * exp(k));
y = a + alpha*k;
end;
check;

varobs y;

estimated_params;
  rho, 0.5, 0, 1;
  delta, 0.5, 0, 1;
  stderr e, 0.5, 0, 1;
end;

estimation(datafile=y3, mode_compute = 4, nograph, nodisplay) y;
```
The output from Dynare is quite different to the other two packages. It gives a value of $27.7\%$ for depreciation.
```
RESULTS FROM MAXIMUM LIKELIHOOD ESTIMATION
parameters
        Estimate    s.d. t-stat

rho       0.5935  0.0633  9.3710
delta     0.2770  0.0032 85.4451

standard deviation of shocks
        Estimate    s.d. t-stat

e         0.0149  0.0010 15.2407
```
Looking at the code, it's clear that no two of these three methods are using the same likelihood function. This could be because they start the Kalman Filter in a different place, because they handle violation of the Blanchard-Kahn conditions differently, because of an error in my code, or for some other reason.

This does provide a nice illustration of why economists prefer to use Bayesian methods to estimate these models. Even in this very simple example, the likelihood surface is very flat. In general, there will be lots of local maxima and it doesn't make much sense to use maximum likelihood. Bayesian methods make more sense. It seems that economists tend to use rather strong priors, since there tend to be good reasons why parameters are likely to lie within fairly narrow boundaries. Bayesian methods are available in both Dynare and gEcon, or you can write your own. Once you have the likelihood function, you can do whatever you want!

## Critiques of the DSGE methodology

We've finally answered the questions from the introduction.

- What is a DSGE model?

It's a model of how the macroeconomy evolves in time in which all markets clear, all agents behave optimally, and there are some unpredictable random shocks involved.

- What is the motivation for developing DSGE models? Why are they better than other models?

Economic agents in DSGE models take the future into account when making decisions. This may make DSGE models more realistic than other models, in theory.

- How do you formulate and solve a DSGE model?

You write down a stochastic optimal control problem, find some necessary first-order conditions, make a log-linear (or sometimes higher order) approximation under the assumption that there's a unqiue steady state, derive a VAR model for the perturbations about the steady state, and solve it.

- How do you fit a DSGE model to data?

You fit the first order approximation rather than the original model. You need the Kalman Filter to relate your observations to the state variables. And, if using a likelihood-based method, it had better be Bayesian.

This leaves the question of why [some people don't seem to like or trust DSGE models](https://www.bruegel.org/blog-post/dsge-model-quarrel-again). One reason is that many DSGE models, just like our example model, assume that the economy contains *representative agents*: exactly one consumer, one firm, etc. One problem with earlier models like the good old IS-LM model is that people are not assumed to behave optimally. The DSGE approach tackles this problem by assuming that people behave optimally, but that there is only one of them.

It's not clear that this is necessarily better. You might say that the DSGE approach is looking at the average behaviour of a large number of people and assuming that they collectively behave optimally, but is it true that a large number of people with different utility functions each making decisions for themselves would act to maximise their collective utility? [Perhaps it is](https://johnhcochrane.blogspot.com/2023/07/new-york-times-on-hank-and-questions.html). That's supposed to be one of the [lessons of economics](https://en.wikipedia.org/wiki/The_Fable_of_the_Bees), right? But is it true that individual people really behave optimally? Behavioural economists would say no. And also, if you treat the collective utility of everyone as the only number of interest, then you can't calculate any statistics about inequality, which is something which I happen to be interested in.<sup>[4](#myfootnote4)</sup>

Concerns of this sort led economists to develop extensions of DSGE models which do allow different types of agents. The most famous are the Heterogeneous Agent New Keynesian<sup>[5](#myfootnote5)</sup> or HANK models. HANK models can't be fitted using the methods we used in our example, but there are other approaches, which I'm hoping to find out about.

______________


## Footnotes

<a name="myfootnote1">1</a> In the original model, consumption at time $t$ depends on output at time $t-1$. I want consumption at time $t$ to be proportional to output at time $t$ in order to match the RBC model introduced [in the following section](#a-model-of-the-economy). The choice doesn't make a difference to the qualitative properties of the model.

<a name="myfootnote2">2</a> The value $\alpha = 0.33$ is [a standard choice of parameter in the production function](https://pages.stern.nyu.edu/~cedmond/ge07pt/ps1_answers.pdf) and $\beta = 0.99$ is taken to match the NZSim paper mentioned in the introduction.

<a name="myfootnote3">3</a> You can check this using the following R code
```r
s <- sim(10000, alpha, beta, rho, delta, sigma_A)
M <- model_matrices(alpha, beta, rho, delta, sigma_A)

# Lyapunov Equation solution
matrix(solve(diag(4) - kronecker(M$Tt, M$Tt)) %*% c(M$Ht %*% t(M$Ht)), nc=2, byrow=F)

# long-run variance
var(t(s$ka))
```

<a name="myfootnote4">4</a> Could this even be a feature rather than a bug? In [*How to Speak Money*](https://www.goodreads.com/book/show/18377995-how-to-speak-money), John Lanchester states that increasing inequality is the driving force that makes neoliberal policies work. So perhaps it's not surprising that in the last forty years, as neoliberal economic policies were sweeping the developed world, economists were coming up with a modelling methodology which made it impossible even to *talk* about inequality?

<a name="myfootnote5">5</a> The basic New Keynesian model is another possible "hello world" DSGE model. It's used, for example, as an introductory model in [training materials from the Bank of England](https://users.ox.ac.uk/~exet2581/Boe/dsge_all.pdf). But, although it consists of just three equations, deriving them takes about forty pages of mathematics.