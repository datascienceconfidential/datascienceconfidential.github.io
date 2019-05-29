---
layout: post
title: "Board Game Group EDA"
date: 2019-05-30
author: Richard
categories: predictive-models r exploratory-data-analysis time-series
published: false
---
Until moving country recently, I was regularly attending a very well-organized local boardgame meetup. The people who run the group make a weekly list of the attendees and the games they played, all of which is stored in a publicly-accessible Google spreadsheet. They have been doing this for long enough that a reasonable amount of data has built up, of which there is slightly too much for comfortable hand-prcoessing.

The spreadsheet has one sheet for each week of data. The individual sheets look like this (I have edited the names):

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2019-05/schedule_jan_9.png" />
</div>

Below the name of each game is a list of the players. The format is fairly consistent from week to week.

There are many possible approaches for ingesting these data. In retrospect, a good approach might have been to get a list of all the possible board games from a database such as Boardgamegeek, and then add the player names by finding the games in the sheets. The problem with this method is that some game names vary, for example because of multiple games being played at once, or games being played with expansions.

My approach was to look for the cells containing an F_ or O_ (indicators which are used to show whether a game is full (has its full complement of players) or open (more players can join)). Above each F_ or O_ is the game name, and below is the list of players. This method will omit some games, such as Spirit Island in the above example, but generally works quite well.

The sheets are read into R using the very nice `readxl` package and processed using the following code. The output of the function is a list indexed by the games played on each date, with the number of players (if it was given as a single number) and the player names (if a valid number of players was found). For some games, such as Puerto Rico in the above example, this method will not record the players who played the game, but this does not matter, since my main interest was in which games were played.

```r
# function for getting the info from a single sheet
process_sheet <- function(sheet){
  # sheet should be a data frame
  
  # find the cells which contain F_ or O_
  full_open <- which(sheet=="F_" | sheet=="O_", arr.ind=T)
  game_list <- list()
  for (i in 1:nrow(full_open)){
    #print(i)
    idx <- full_open[i, ]
    name_idx <- idx + c(-1, -1)
    game_name <- sheet[name_idx[1], name_idx[2]]
    z <- idx + c(0, -1)
    
    # number of players, if given
    n_players <- as.numeric(gsub("Players", "", sheet[z[1], z[2]]))

    # if number of players was given, create a list of player names
    if (!is.na(n_players)){
      player_names_idx <- matrix(rep(idx, n_players), nc=2, byrow=T) + cbind(1:n_players, -1)
       player_names <- sheet[player_names_idx[1, 1], player_names_idx[1,2]]
      for (i in 2:n_players){
        player_names <- c(player_names, sheet[player_names_idx[i,1],
                                            player_names_idx[i,2]])
      }
      player_names <- player_names[!is.na(player_names)]
      
      # if any player names were found, add them to this 
      # recorded play
      if (length(player_names) > 1){
        game_list[[game_name]] <- list(n=n_players, player_names=player_names)
      }
    }
  }
  game_list
}
```

After some further processing, the output was turned into a list of games played in each week, from which I obtained a matrix whose rows were the 66 weeks and whose columns were the games played. Even after some cleaning of the game names, there were still 289 recorded games.

The image below shows the matrix of games played by week, with games along the horizontal axis and time on the vertical axis (going downwards from week 1 to week 66). The games are ordered by decreasing number of plays. Most games are played once and then never seen again. This fate befell 201 of the 289 games, almost 70\% of the total.

<div style="width:70%; margin:0 auto;">
 <img src="/blog/images/2019-05/game_matrix.png" />
</div>
