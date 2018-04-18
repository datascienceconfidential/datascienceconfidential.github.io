---
layout: post
title: "ROC versus CAP"
date: 2018-04-18
author: Richard
categories: validation predictive-models ranking
published: false
---
Recent consulting work in the banking sector has led me to take a closer look at the ROC and CAP curves and their associated accuracy measures, AUC and AR. I was rather surprised to learn that there is a simple relationship between these measures. However, it seems that it is also not quite as simple as people think.

## Introduction

The ROC and CAP curves measure the quality of a ranking or rating system. They are not defined for an arbitrary predictive model, but rather for models which output some kind of numerical score which is supposed to be predictive of some characteristic of interest. This means, for example, that a random forest or naive Bayes classifer can have an ROC curve, but a black-box classifier which merely produces a prediction will not have one.

The application which I will have in mind in this post is credit scoring. A credit scorecard outputs a number called a credit score. Every borrower is assigned a credit score. Some borrowers are "bad", for example, those who default. It is hoped that the credit score will be related to the probability that a borrower is bad. The ROC and CAP curves provide a way to test this.

## The ROC curve



<canvas id="theCanvas" height="300 + 10*2" width="300 + 10*2"></canvas>

<script type="text/javascript">
  var theCanvas = document.getElementById("theCanvas");
  var ctx = theCanvas.getContext("2d");
  var n = 100;var scores = [];for (var i=1;i< n+1;i++){scores.push(i);}var defaults = [];var nonDefaults = [];var goods = 0;var bads = 0;for (var i=1; i<n+1; i++){var defaultProb = Math.random(); defaults.push(defaultProb < Math.exp(-0.02*Math.pow(scores[i-1], 1.1)) ? 1 : 0); if (defaults[i-1] > 0){     bads += 1;  nonDefaults.push(0); } else {     goods += 1;  nonDefaults.push(1);    }}
// ROC curve
  cumDefaults = [defaults[0]];for (i=1; i<n; i++){    cumDefaults.push(cumDefaults[i-1] + defaults[i]);}ROCy = [0];for (i=0; i<n; i++){    ROCy.push(cumDefaults[i]/bads);}console.log(ROCy);
cumNonDefaults = [nonDefaults[0]];for (i=1; i<n; i++){    cumNonDefaults.push(cumNonDefaults[i-1] + nonDefaults[i]);}ROCx = [0];for (i=0; i<n; i++){    ROCx.push(cumNonDefaults[i]/goods);}console.log(ROCx);
// CAP curveCAPx = [0];for (i=1; i<n+1; i++){    CAPx.push(i/n);}var CAPy = ROCy;
// plot ROC curve on canvasvar w = theCanvas.width - 20;var h = theCanvas.height - 20;
for (i=0; i<n; i++){    ctx.beginPath();    ctx.moveTo(10 + ROCx[i]*w, 10 + h - ROCy[i]*h); //ctx.lineTo(10 + ROCx[i]*w, 10 + h - ROCy[i+1]*h); ctx.lineTo(10 + ROCx[i+1]*w, 10 + h - ROCy[i+1]*h); ctx.lineWidth=3; ctx.stroke();}
// plot CAP curvectx.strokeStyle="green";for (i=0; i<n; i++){    ctx.beginPath();    ctx.moveTo(10 + CAPx[i]*w, 10 + h - CAPy[i]*h); //ctx.lineTo(10 + CAPx[i]*w, 10 + h - CAPy[i+1]*h); ctx.lineTo(10 + CAPx[i+1]*w, 10 + h - CAPy[i+1]*h); ctx.lineWidth=3; ctx.stroke();}
//plot intermediate curve//ctx.clearRect(0,0,w+20,h+20);var id = setInterval("frame()", 10);var delta = 0.01;var t = 1;var t2 = 1;var frame = function(){    ctx.strokeStyle="black";     ctx.clearRect(0,0,w+20,h+20); ctx.beginPath(); ctx.moveTo(10, h+10); ctx.lineTo(10+w, h+10); ctx.lineWidth = 1; ctx.stroke();  ctx.beginPath(); ctx.moveTo(10, h+10); ctx.lineTo(10, 10); ctx.lineWidth = 1; ctx.stroke();   ctx.strokeStyle="green";    for (i=0; i<n; i++){     t2 = (t <= 0 ? 0 : t)  ctx.strokeStyle = (t <= 0 ? "black" : "green");        ctx.beginPath();        ctx.moveTo(10 + (t2*CAPx[i] + (1-t2)*ROCx[i])*w, 10 + h - (t2*CAPy[i]+(1-t2)*ROCy[i])*h);     //ctx.lineTo(10 + CAPx[i]*w, 10 + h - CAPy[i+1]*h);     ctx.lineTo(10 + (t2*CAPx[i+1] + (1-t2)*ROCx[i+1])*w, 10 + h - (t2*CAPy[i+1]+(1-t2)*ROCy[i+1])*h);     ctx.lineWidth=3;     ctx.stroke();    } t -= delta; if (t <= -1){     t=1;  clearInterval(id);  id = setInterval("frame()", 10); }}//frame();</script>
