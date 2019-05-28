---
layout: post
title: "Board Game Group EDA"
date: 2019-05-29
author: Richard
categories: predictive-models r exploratory-data-analysis time-series
published: true
---
Until moving country recently, I was regularly attending a very well-organized local boardgame meetup. The people who run the group make a
weekly list of the attendees and the games they played, all of which is stored in a publicly-accessible Google spreadsheet. They have been
doing this for long enough that a reasonable amount of data has built up, of which there is slightly too much for comfortable hand-prcoessing.

The spreadsheet has one sheet for each week of data. The individual sheets look like this (I have edited the names):

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2019-05/schedule_jan_9.png" />
</div>

Below the name of each game is a list of the players. The format is fairly consistent from week to week.

There are many possible approaches for ingesting these data. In retrospect, a good approach might have been to get a list of all the 
possible board games from a database such as Boardgamegeek, and then add the player names by finding the games in the sheets. The problem
with this method is that some game names vary, for example because of multiple games being played at once, or games being played with
expansions.

My approach was to look for the cells containing an F_ or O_ (indicators which are used to show whether a game is full (has its full 
complement of players) or open (more players can join)). Above each F_ or O_ is the game name, and below is the list of players. This 
method will omit some games, such as Spirit Island in the above example, but generally works quite well.

