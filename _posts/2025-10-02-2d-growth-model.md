---
layout: post
title: "Adding random transport links to a 2D growth model"
subtitle: "How much did the railroad boom contribute to the growth of 19th century America?"
header-img: "/blog/images/2025/2d_growth_example.png"
date: 2025-10-02
author: Richard
categories: economics r fermi-estimation
published: true
---
This post is about economic growth in a region in which labour is free to move around.

A colleague recently showed me a [paper](https://www.researchgate.net/publication/268022690_Population_dynamics_in_a_spatial_Solow_model_with_a_convex-concave_production_function) by Capasso, Engbers and La Torre which describes an extension of the Solow growth model in which a spatial element is added. It seemed to me that the model could be extended in various ways. Most interestingly, the paper only gave an example in which capital and labour move around in a one-dimensional latent space, but I thought it would be more interesting if the space was two-dimensional.

A book called [*The Price of Time*](https://www.amazon.com/Price-Time-Real-Story-Interest/dp/0802160069) by Edwin Chancellor describes many of the unintended negative consequences of low interest rates, one of which is investment being directed to infrastructure projects which appear to "go nowhere" (think of railways in the 19th century US or 2010s China). I decided to use the Capasso et al model to study the effects of randomly building transport infrastructure. The basic idea is that if a country's development is modelled by a process in which capital and labour are trying to reach the same location, then any infrastructure will probably speed up growth. But by how much? I want to get a qualitative estimate of that.

# Model

The model takes place on a domain $\Omega \subset \mathbb{R}^n$. At each point $x \in \Omega$ and each time $t$, there is a quantity of capital $K(x,t)$ and labour $L(x,t)$. There is a production function $F$ describing how more capital is produced from labour and capital. I will assume that $F$ is the same everywhere. In other words, there's a factory of sorts at every point of $\Omega$.

## Motion of Capital

Capital evolves in space and time according to the equation

$$\frac{\partial K}{\partial t}(x,t) = e\nabla^2 K(x,t) -\delta K(x,t) + Y(x,t)$$

where $Y(x,t) = F(K(x,t), L(x,t))$ is output. Here, $e$ is the (exogenous) coefficient of diffusion and $\delta$ is (exogenous) depreciation.

This is a version of the heat equation. If $F = 0$ then capital will slowly diffuse through the domain $\Omega$ until the value of $K$ is the same everywhere, like in the following picture.

<script src="/blog/scripts/2025/migration.js"></script>

<div>
    <canvas id="gridCanvas" width="320" height="320" style="border:1px solid black;display: block; margin: 0 auto;"></canvas>
</div>

## Motion of Labour

In the Capasso et al model, labour diffuses in the same way as capital. But what if we assume that labour moves towards the direction of the highest wages?

Let's assume that labour is paid its marginal product $w(x,t) = \frac{\partial F}{\partial L}$ and that it moves in the direction of increasing $w$, so we have something like

$$\frac{\partial L}{\partial t}(x,t) = m\nabla \cdot (L(x,t)\nabla w(x,t))(1+g)$$

where $m$ is a diffusion coefficient and $g$ is an exogenous growth rate. In other words, a proportion $m$ of the labour force will migrate in the direction in which the wages are highest.

# Simulation

Now let's stop pretending that time and space are continuous. The following describes what I actually coded<sup>[1](#myfootnote1)</sup>. Assume that time proceeds in discrete steps $t=0, 1, 2, \dots$ and that the domain $\Omega$ is a graph. At time step $t$, the model evolves in the following way:

- At each vertex $x$, a proportion $e$ of the current value of capital $K(x)$ is distributed equally among the neighbours of $x$.
- At each vertex $x$, a proportion $m$ of the current value of labour $L(x)$ moves to the node in $\{x\}\cup\{\text{neighbours of } x\}$ with highest wage. If there is a tie for highest, it is distributed equally among the tied nodes.
- At each vertex $x$, $K(x)$ is incremented by production minus depreciation and $L(x)$ increases by a factor of $(1+g)$.

If you run the model on a grid and start by drawing labour and capital from a uniform distribution, you will see a sort of self-organisation. Labour and capital accumulate into "towns" where there is a relatively high level of production.

## Capital

<div>
    <canvas id="CanvasK" width="320" height="320" style="border:1px solid black;display: block; margin: 0 auto;"></canvas>
</div>

## Labour

<div>
    <canvas id="CanvasL" width="320" height="320" style="border:1px solid black;display: block; margin: 0 auto;"></canvas>
</div>

Here. I used the Cobb-Douglas production function with $TFP = 1$ and $\alpha = 1/3$. Capasso et al chose to use a different production function. The choice of Cobb-Douglas means that growth is unlimited and eventually the spatial distribution of capital and labour will become uniform. I'm really interested in the rate of growth of aggregate output $Y$ where

$$Y(t) = \int_\Omega Y(x, t) dx.$$

The graph below shows how $Y(t)$ grows in the simulation above, starting with a random distribution of capital and labour.

<div>
    <canvas id="CanvasYLine" width="320" height="320" style="border:1px solid black;display: block; margin: 0 auto;"></canvas>
</div>

# Adding Infrastructure

You can add transportation to the model by adding connections between nodes which weren't previously connected. For example, here's what happens to the pattern of capital if you add a "railway line" down the diagonal of the grid which makes all the points on the diagonal adjacent to each other.

<div>
    <canvas id="CanvasRailway" width="320" height="320" style="border:1px solid black;display: block; margin: 0 auto;"></canvas>
</div>

<script>
function draw_matrix(M, canvas, clear=true,
  rgb="0, 0, 255"){
    let N = M[0].length;
    //var canvas = document.getElementById("gridCanvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    let maxM = M[0][0];
    let sumM = 0;
    for (let i=0; i<N; i++){
        for (let j=0; j<N; j++){
            if (M[i][j] > maxM){
                maxM = M[i][j];
                sumM += M[i][j];
            }
        }
    }
    //console.log(maxM);
    if (clear){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.stroke();
    }
    for (i=0; i<N; i++){
        for (j=0; j<N; j++){
            ctx.fillStyle = "rgba(" + rgb + ", " + ((M[i][j]/maxM)).toString() + ")";
            //console.log([i*width/N, j*width/N, width/N, width/N]);
            ctx.fillRect(j*height/N, i*width/N, width/N, height/N);
            //ctx.fillRect(10, 10, 100, 100);
            ctx.stroke();
        }
    }
}

function draw_line(x, canvas, maxits, maxy, clear=true){
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;

    ctx.moveTo(0, height);
    for (let i=1; i<x.length; i++){
        ctx.lineTo(i/maxits * width, height-x[i]/maxy * height);
        ctx.moveTo(i/maxits * width, height-x[i]/maxy * height);
        ctx.stroke();
    }
}

var ctxr = document.getElementById("CanvasYLine").getContext("2d");
ctxr.moveTo(0, ctxr.height);
ctxr.beginPath();

//var model = model;
var time_counter = 0;
function frame(){
    model0 = update(model0);
    draw_matrix(model0.K, document.getElementById("gridCanvas"));
    
    let sumY = 0;
    let logY = 0;
    model1 = update(model1);
    draw_matrix(model1.K, document.getElementById("CanvasK"));
    draw_matrix(model1.L, document.getElementById("CanvasL"), clear=true, rgb="224, 210, 100");
    
    let N = model1.N;
    for (let i=0; i<N; i++){
        for (let j=0; j<N; j++){
            sumY += production_function(model1.K[i][j],
                model1.L[i,j],
                model1.A,
                model1.alpha
            )
        }
    }
    logY = sumY;
    let maxy = 10000000;
    let maxits = 500;
    //draw_line(logY, CanvasYLine, 500, 100);
    let w = 320;
    let h = 320;
    ctxr.lineTo(time_counter/maxits * w, h-logY/maxy * h);
    ctxr.moveTo(time_counter/maxits * w, h-logY/maxy * h);
    ctxr.stroke();

    model2 = update(model2);
    draw_matrix(model2.L, document.getElementById("CanvasRailway"));

    time_counter +=1;
    if (time_counter >= maxits){
        clearInterval(id);
		id = setInterval("frame()", 10);
        time_counter = 0;

        model0.K = zero_matrix(model0.K[0].length);
        model0.K[10][10] = 1;
        model0.L = zero_matrix(model0.L[0].length);

        model1.K = random_matrix(31);
        console.log("reset");
        model1.L = random_matrix(31);
        logY = 0;
        sumY = 0;
        ctxr.closePath();
        ctxr.fillStyle = "white";
        ctxr.fillRect(0, 0, w, h);
        ctxr.moveTo(0, h);
        ctxr.beginPath();

        model2.K = random_matrix(31);
        model2.L = random_matrix(31);
    }
}

var id = setInterval("frame()", 10);

</script>

Regardless of the initial distribution of labour and capital, the nodes with high adjacency end up having very high relative output. Interestingly, nodes *next* to nodes with high adjacency end up with lower than average output, even though the model has the property that capital is supposed to trickle outwards due to the $\nabla^2 K$ term. You are better off being in the hinterland than being near, but not in, an area which is connected to a lot of infrastructure. There are real-world reflections of this in places such as [Animas City, Colorado](https://www.animasmuseum.org/online_exhibits/JoyCabin/animas_city.html) which became a ghost town after being bypassed by a railroad which went through Durango, two miles to the south, so it makes some sense.

# Example: the US Railroad Boom

Speaking of Colorado, we can try to use this model to estimate how much the railroad boom in the US contributed to growth.

In the 19th century the US experienced a period of railroad mania. [According to PBS](https://www.pbs.org/wgbh/americanexperience/features/grant-panic) there were 364 railroads by the time of the Panic of 1873.

Let's make some wild estimates. Assume that the US is a $10 \times 20$ rectangle (the numbers are chosen to make the simulation run quickly). According to [this paper](https://www.cambridge.org/core/journals/journal-of-economic-history/article/abs/internal-migration-in-the-united-states-rates-selection-and-destination-choice-18501940/1B6567FF34E66FBDF45791BF64B6DDBB) $33\%$ of people migrated inter-county per decade, and according to various sources it took about six months to cross the US prior to the development of railroads. Therefore, labour should be able to move about 40 grid squares in a year, so we need to take each time step to be $1/40$ of a year, and then the migration rate $m$ should be $1/40 \times 0.33/10$. Assuming that capital goods were difficult to transport, we'll take $e=0$. We also assume an annual capital depreciation rate of $0.1$.

If we start in 1830 with the founding of the Baltimore and Ohio Railroad, the model needs to run for 43 years. The population basically tripled between 1830 and 1873, so we should take an appropriate value of $g$. 

In the following R code, we run two models. `model0` has no railroads. In `model1`, railroads are added at regular intervals by joining pairs of random nodes (like the secret passages in [*Cluedo*](https://en.wikipedia.org/wiki/Cluedo)) so that they become adjacent. We can then calculate the aggregate output of the two models at the end of the simulation and divide one by the other to get the factor by which the presence of the railroads has increased or decreased output.

```r
simulate_us <- function(M=10, N=20, years=43, rr_count=364){
  
  # number of iterations
  its <- 2 * N * years
  
  m <- 0.33/(10*2*N)
  e <- 0 
  g <- 3^(1/its) - 1
  delta <- 0.1 / years / (2*N)
  K <- matrix(runif(M*N), nr=M)
  L <- matrix(runif(M*N), nr=M)
  A <- 1
  alpha <- 1/3
  adjacency <- make_grid(M, N)
  
  model0 <- model1 <- make_model(M, N, K, e, m, delta, g, L, adjacency, A, alpha)
  out <- list()
  
  for (i in 1:its){
    model0 <- update(model0)
    model1 <- update(model1)

    if (!(i %% floor(its/rr_count))){
      # add a connection to model1
      x1 <- x2 <- sample(1:M, 1)
      y1 <- y2 <- sample(1:N, 1)
      while((x1==x2) & (y1==y2)){
        x2 <- sample(1:M, 1)
        y2 <- sample(1:N, 1)
      }
      model1$adjacency <- add_connection(model1$adjacency, x1, y1, x2, y2)
    }
    out[[i]] <- list(model0=model0,
                     model1=model1,
                     Y0 = model0$production_function(model0$K, model0$L,
    model0$A, model0$alpha), 
                     Y1 = model1$production_function(model1$K, model1$L,
     model1$A, model1$alpha))
  }
  out
}
```

The graph below shows the result of doing the whole simulation 100 times. Adding the railways increased aggregate output at the end of the period by about 20% compared to the no-railway scenario.

```r
set.seed(1873)
sims <- rep(0, 100)
for (i in 1:100){
  sim1 <- simulate_us(M=10, N=20)
  sims[i] <- unlist(lapply(sim1, function(x) sum(x$Y1)))[1720]/
    (unlist(lapply(sim1, function(x) sum(x$Y0))))[1720]
}
```

<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/railroad_sims.png" />
</div>

That all seems quite reasonable, but the fact that the numbers come out nicely here is largely an artifact of the choice of a $10\times 20$ grid. You can check this by running the simulation on grids of different sizes. If you double the size of the grid, you won't find any increase in output when adding railways. So what's going on?

It turns out that the choice of grid size in the above example is just enough to make it very likely that two nodes will become connected in such a way that there is a big boost to growth. If you make the grid larger, then the number of possible random connections grows so large that this becomes less likely to happen. The reason why random infrastructure seems to be boosting growth is because we've set things up in such a way that random infrastructure is likely to be useful just  by chance.

This sort-of shows that my original idea was wrong. I had the idea that adding random connections to this model might make it easier for labour to move around and thus to reach areas with a large amount of capital. But in fact, if you put in semi-realistic numbers, the random connections only help if there's a large chance that they happen to be built in the right places. So my initial idea of showing that vanity projects or ``railways to nowhere" can contribute to economic growth is probably wrong.

However, I still think this model is quite interesting and could be used for other things. That's all for today! I'm off to see whether I can sell my labour to the owner of some capital.

___________________________

<a name="myfootnote1">1</a>: I'm honestly not 100% sure that it matches the continuous model described in the previous section. I included the continuous version for easy comparison with the paper of Capasso et al.