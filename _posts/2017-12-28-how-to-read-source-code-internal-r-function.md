---
layout: post
title: "How to read the source code of an internal R function"
date: 2017-12-28
author: Richard
categories: r
published: true
---
The following question recently came up on <a href="https://stats.stackexchange.com/">Crossvalidated</a> (a stats question and answer site) 
but unfortunately it was deleted before it was answered. This is a shame because it is a useful topic which comes up a lot.

The questioner wanted to read the source code for the R `sample` function. In R, you can usually get the source code of a function by 
simply typing its name at the command prompt.

```r
> sample
function (x, size, replace = FALSE, prob = NULL) 
{
    if (length(x) == 1L && is.numeric(x) && is.finite(x) && x >= 
        1) {
        if (missing(size)) 
            size <- x
        sample.int(x, size, replace, prob)
    }
    else {
        if (missing(size)) 
            size <- length(x)
        x[sample.int(length(x), size, replace, prob)]
    }
}
```
From this, it is clear that `sample` is a wrapper for another function called `sample.int`.

```r
> sample.int
function (n, size = n, replace = FALSE, prob = NULL, useHash = (!replace && 
    is.null(prob) && size <= n/2 && n > 1e+07)) 
{
    if (useHash) 
        .Internal(sample2(n, size))
    else .Internal(sample(n, size, replace, prob))
}
```

It seems that `sample.int` is calling another function called `.Internal`. Unfortunately, the help file for `.Internal` is rather 
unhelpful.

> .Internal performs a call to an internal code which is built in to the R interpreter.
> Only true R wizards should even consider using this function, and only R developers can add to the list of internal functions.

If we really want to see what the `sample` function is doing, R is determined not to tell us. However, it is possible to see the source
code of a function like `sample`. 

The meaning of the function being internal is that it is actually written in C. This is good because it means that the `sample` function,
which is used a lot, will be very much faster than any function written in R code would be. But how do we find the C code for the 
function?

As far as I know, there is no way of doing this from within R. However, because R is open source, it is possible to find the source code
online and search through it. For example, here: <a href="https://github.com/wch/r-source">https://github.com/wch/r-source</a>.

Searching the repository for `sample` gives a lot of results because the `sample` function is used throughout the source code. However, 
Github lets us restrict the results to C code files only, for which there are only 15 hits. In the file `src/main/names.c` we find a 
table of R function names and their C aliases. This contains the lines:

```C
{"sample",	do_sample,	0,	11,	4,	{PP_FUNCALL, PREC_FN,	0}},
{"sample2",	do_sample2,	0,	11,	2,	{PP_FUNCALL, PREC_FN,	0}},
```

So we really want the `do_sample` function. Another search reveals that this function is in the file `random.c`

```C
/* do_sample - probability sampling with/without replacement.
   .Internal(sample(n, size, replace, prob))
*/
SEXP attribute_hidden do_sample(SEXP call, SEXP op, SEXP args, SEXP rho)
{...
```

`SEXP` means "S Expression". The inputs and output of the `do_sample` function are S expressions. S was the name of the language which
was a forerunner of R, and the R source code is written in terms of S Expressions. There is more information about these
things in the R manual. (Although I have written C code in R before, I have never dealt with S expressions.) Anyway, we are almost at the
end of our search. Lines 486-494 read as follows.

```C
	if (replace) {
	    int i, nc = 0;
	    for (i = 0; i < n; i++) if(n * p[i] > 0.1) nc++;
	    if (nc > 200)
		walker_ProbSampleReplace(n, p, INTEGER(x), k, INTEGER(y));
	    else
		ProbSampleReplace(n, p, INTEGER(x), k, INTEGER(y));
	} else
	    ProbSampleNoReplace(n, p, INTEGER(x), k, INTEGER(y));
```

which reveals that the `do_sample` function calls one of the three functions `walker_ProbSampleReplace`, `ProbSampleReplace` or
ProbSampleNoReplace` depending on circumstances. These functions are also in the `random.c` file and they are all pure C functions 
with no S Expressions involved. For example:

```C
/*
 *  Unequal Probability Sampling.
 *
 *  Modelled after Fortran code provided by:
 *    E. S. Venkatraman <venkat@biosta.mskcc.org>
 *  but with significant modifications in the
 *  "with replacement" case.
 */

/* Unequal probability sampling; with-replacement case */

static void ProbSampleReplace(int n, double *p, int *perm, int nans, int *ans)
{
    double rU;
    int i, j;
    int nm1 = n - 1;

    /* record element identities */
    for (i = 0; i < n; i++)
	      perm[i] = i + 1;

    /* sort the probabilities into descending order */
    revsort(p, perm, n);

    /* compute cumulative probabilities */
    for (i = 1 ; i < n; i++)
	      p[i] += p[i - 1];

    /* compute the sample */
    for (i = 0; i < nans; i++) {
      rU = unif_rand();
      for (j = 0; j < nm1; j++) {
          if (rU <= p[j])
          break;
       }
	     ans[i] = perm[j];
    }
}
```

This function even has comments explaining how it works.

The good news is that all other functions called with `.Internal` can be read in the same way. Although it is better not to mess with 
them, it is sometimes very useful to see how they are implemented. 
