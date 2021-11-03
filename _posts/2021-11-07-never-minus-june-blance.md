---
layout: post
title: "Never Minus June Blance"
date: 2021-11-07
author: Richard
categories: deep-learning nlp python
published: false
---
I haven't yet seen the new James Bond film <i>No Time to Die</i> but I noticed that its title sounds rather generic and uninspired. It feels almost as if all of the good James Bond film titles have already been taken. This led me to wonder whether there are underlying patterns in the titles of James Bond films, and whether it would be possible to use a computer to generate new examples.

Fortunately, there is an excellent Python library called `textgenrnn` which makes this sort of thing very easy. I have previously seen it used to generate titles of board games, with interesting results. Typically you need to train the model with your data, generate new examples, and then cherry-pick from the output, as the titles generated will have a lot of repetition. (For example, in the board game case, you get "Card Game" and "Card Game: The Card Game" a lot.)

