---
layout: post
title: "Millionaires and Werewolves"
subtitle: "Why you don't want to vote out the millionaire"
header-img: "/blog/images/2025/millionare_werewolf.png"
date: 2025-09-10
author: Richard
categories: economics games
published: true
---
This post is about the Netflix game show [*Million Dollar Secret*](https://en.wikipedia.org/wiki/Million_Dollar_Secret). The show is a stripped-down version of another popular show, [*The Traitors*](https://en.wikipedia.org/wiki/The_Traitors_(British_TV_series)) which in turn is a televised version of the social deduction game [*Mafia*](https://en.wikipedia.org/wiki/Mafia_(party_game)), also known as *Werewolf*.

<div style="width:85%; margin:0 auto;">
 <img src="/blog/images/2025/millionare_werewolf.png" />
</div>

I used to play *Werewolf* regularly when I lived in Canada. I was *terrible* at it but it was a lot of fun. A few academic papers have been written about the game, but it's difficult to model because the modeller needs to make a lot of assumptions about the motives of the players.

In this post, I will propose a simple model for the game *Million Dollar Secret* which gives some very surprising conclusions. I will also explain why these conclusions carry over to *The Traitors* but not to *Werewolf*.

The first step is to explain the rules to each of the games.
 
# *Werewolf*

Let's start with *Werewolf/Mafia* because it's the oldest of the games. *Werewolf* is a cooperative games in which the players are divided into two teams, werewolves and villagers. The game is run by a non-playing moderator who counts the votes and makes sure that the identities of the players are kept secret from each other. 

The werewolves win if all of the villagers are eliminated ("killed"). The villagers win if all the werewolves are eliminated. The game takes place in day and night phases. Each day, the villagers vote to kill one of the players. Each night, the werewolves, who know each others' identities, secretly vote to kill one of the players. Day and night phases alternate until one side is eliminated.

The villagers don't know who the werewolves are, so they have to guess based on suspicious behaviour or voting patterns. The werewolves know exactly who the other werewolves are. To balance the game, the number of werewolves is usually much smaller than the number of villagers.

Often, the game is spiced up by giving the villagers a variety of special powers. Since these make the game more complicated, I won't describe them here. There are all sorts of other rule variations too. For example, when a werwolf is killed, the villagers may or may not be told that they have eliminated a werewolf.

# *The Traitors*

*Werewolf* has been turned into a televised game show many times. The most successful version is *The Traitors*, which originated in the Netherlands but has now spread to many countries. In *The Traitors*, a group of strangers play a game which is essentially the same as *Werewolf* but with one key difference. The game adds daily challenges and tasks in order to make better television, but that's not the key difference in terms of gameplay.

In *The Traitors*, the Traitors (werewolves) are not allowed to be eliminated before the end of the game. If a traitor is killed by the Faithful (villagers) then the traitors have the option (and are sometimes forced) to recruit a new traitor by converting one of the existing villagers. This ensures that the series does not end prematurely with the death of all the traitors. When there are only three or four players left, the game enters an endgame phase in which the traitors can no longer recruit new traitors.

Unlike *Werewolf*, the show has a cash prize which is shared only among the *surviving* players. So the aim is not only to eliminate the other team, but also to survive to the end. This is a big difference to *Werewolf* and completely changes the motivations of the players.

# *Million Dollar Secret*

*Million Dollar Secret* is similar to *The Traitors* ([The Guardian called it a shameless rip-off](https://www.theguardian.com/tv-and-radio/2025/mar/26/million-dollar-secret-review-you-wont-be-able-to-get-enough-of-this-shameless-rip-off-of-the-traitors)) but its rules are slightly simpler.

In this game, one player is designated the Millionaire and is given a box containing one million dollars. The other players are given empty boxes. The players vote to eliminate one player each day. If the millionaire is voted off, the million dollars is transferred to one of the surviving players, selected at random.

Just like in *The Traitors*, there are daily tasks and missions which the players must complete in order to get hints pointing to the identity of the Millionaire, or to gain other advantages. There is also an endgame phase which decides who ultimately get the box. 

Unlike in *The Traitors*, only one player can end up with the money in the end. The game is not cooperative. Everyone else gets nothing.

# A Model

After watching *Million Dollar Secret*, I wondered whether it would be possible to build a model of the game and calculate the best strategy.

At first, it seems obvious that the players would want to vote off the Millionaire. The whole game is designed around this assumption. After all, you can only win if you can get the million dollars. The only way to get the million dollars is to eliminate the current Millionaire and hope that the box passes to you. So you should vote for the Millionaire, correct?

Well, actually, it seems that it's not so obvious. Most of the time, voting off the Millionaire is the wrong strategy, and I will explain why.

Let's make a few assumptions about the game.

First, we'll assume that there are $n$ players and that everyone knows the identity of the Millionaire. That might seem silly because the whole point of the game is for the Millionaire to conceal their identity. But actually, most of the time the players in *Million Dollar Secret* did in fact have a pretty good idea of who the Millionaire was, especially in the later rounds.

Secondly, we'll assume that the players collude to vote for an individual collectively. This is not so far-fetched because the players often planned their votes in advance, split into factions, etc.

Thirdly, we'll assume that there are only two possible targets for elimination. One is the Millionaire. The other is whichever player the Millionaire is planning to vote for, who I'll call the Victim. Assume that the Millionaire selects the Victim at random from the non-Millionaire players.

Thus, the only possible choices for the players are

- Collectively vote to eliminate the Millionaire.
- Collectively vote to eliminate the Victim.

Finally, we'll assume that the game ends when there are two players left, and whoever has the million dollars is the winner.

## Three Players

What happens when $n=3$? In this case, there is one Millionaire $m$, one Victim $v$, and one other player $p$. If $p$ and $v$ team up to vote for $m$, then one of $p$ and $v$ gets the million dollars at random and the game ends, so in that case $p$ and $v$ each win the game with probability $1/2$. If $p$ joins $m$ and votes for $v$, then $m$ ends up with the million and wins the game.

A $50\%$ chance to win is better than zero! Therefore, $p$ and $v$ will vote to eliminate $m$. This is the way the game is supposed to work.

(In the actual show, the endgame with three players worked differently, but the eventual outcome was similar to this situation.)

## Four Players

Now suppose there are four players left. There is a Millionaire $m$, a victim $v$, and two other players $p_1$ and $p_2$. Since we're assuming that the players decide on their vote collectively, $p_1$ and $p_2$ will vote the same way.

If they vote off the Millionaire, then we go down to the three-player case. One of these three will randomly become the Millionaire and will have $0$ probability of winning. The other two will become non-Millionaires and will have probability $1/2$ of winning. So the overall probability of winning for each individual player is

$$0 \times (1/3) + (1/2) \times (2/3) = 1/3.$$

Now suppose the players vote off the victim $v$ instead. In this case, $p_1$ and $p_2$ will go into the three-player scenario with probability $1/2$ of winning. Since this is bigger than $1/3$, the best strategy for $p_1$ and $p_2$ is to vote off the victim, not the Millionaire!

## $n$ Players

What happens when there is a larger number of players? Well, the reasoning is the same. You have one Millionaire $m$, one victim $v$, and $n-2$ other players. If the $n-2$ players vote off the Millionaire, then there are $n-1$ players left. By symmetry, each one must have the same probability of winning, so the probability of winning for each remaining player will be $1/(n-1)$ (in this situation the game "resets" with a new Millionaire.)

If instead the $n-2$ players vote off the victim, then they go into the next round with a known Millionaire and $n-2$ other players. Consider what happens before the next victim is chosen (remember we are assuming that the Millionaire's victim is chosen at random). We already know that the Millionaire has zero probability of winning the game in the end, and the remaining players must each have an equal probability of winning, so that probability must be $1/(n-2)$. Since $1/(n-2) > 1/(n-1)$, the correct move is to gang up and vote off the Victim $v$ (or any other non-millionaire player).

## Conclusion

In this simplified version of the game, it is *never* right to vote off the Millionaire! The non-Millionaire players each maximise their winning chances by ganging up to vote off a non-Millionaire player.

# Evidence

Is the model a good description of what really happens in the game? Obviously, in the real game nobody knows for certain who the Millionaire is, and there are all sorts of plot twists and special powers. But the core conclusion does seem to match what happened in the show. In fact, at one stage the players did find out the identity of the Millionaire and colluded to vote off a different player on the grounds that he or she was "dangerous" (in fact, I think this happened twice).

There's also the evidence of *The Traitors*. A lot of people have pointed out that it's disadvantageous for the Faithful to vote off the Traitors because knowing who the Traitors are is such a big advantage for the remaining Faithful, so they have no incentive to vote off the Traitors and have them replaced by other unknown players.

Why isn't this a problem in *Werewolf*? The key differences are that *Werewolf* does not last a fixed number of rounds, and also that it does not have a single winner. The villagers have a strong motivation to vote off the werewolves because that's the entire point of the game! In making the game TV-ready, it seems that the TV executives have accidentally eliminated this motivation.

# How to Fix It?

Could *Million Dollar Secret* and the other games be improved? Perhaps. If it really turns out that the best strategy is *not* to vote off the Millionaire, then the game is going to fall a bit flat. So how could it be fixed? 

One idea is to offer a cash incentive for voting off the Millionaire. According to the above model, the fair price of not voting for the Victim would be $(1/(n-2) - 1/(n-1))P$ where $n$ is the number of remaining players and $P$ is the size of the prize. However, since people are generally risk-averse, it would probably be enough to offer a token prize for voting off the Millionaire.

The drawback of this idea is that the all-or-nothing gamble of winning a million dollars is what makes the show exciting and additional cash prizes would take away from that.

Another possibility is to make the game closer to *Werewolf* and simply end the game when the Millionaire is voted off and share out the money among the remaining players. This would work for Netflix because it isn't restricted to having a fixed number of episodes in a series. It wouldn't work so well for a television network. And again, it would kill a lot of the drama, which is the point of the show.

## *Escape from Siberia*

We can ask whether it's possible to design a social deduction game which has the properties that:

1. Exactly one player is eliminated in each round (for maximum drama) and there is a single winner.
2. The game lasts a fixed number of rounds.

There are definitely games like this. For example, the 1933 *The Book of Indoor Games* by Hubert Phillips and B. C. Westall includes a game called *Escape from Siberia* (and its friendlier version *Rescue by Aeroplane*). In *Escape from Siberia* the players imagine that they are fleeing across Siberia in a dog sled, pursued by wolves. In each round, they must lighten the sled by throwing a player to the wolves. When only two players are left, the eliminated players vote for the winner. You may recognise this game as the basis for the TV show *Survivor*.

The disadvantage of *Escape from Siberia* is that it is $100\%$ social and there is no deduction. Is there a game like this in which the players can have secret identities or goals, but in which it is always rational for the players on the good (larger) team to vote to eliminate the bad (smaller) team?

## *The Vampire*

Here'a a tentative idea: one player is secretly assigned the role of the Vampire. Voting takes place in the usual way, but the Vampire can never be voted off. At any time, if there is a tie for most votes, or if the Vampire receives the most votes, the Vampire gets to choose which player is eliminated instead. When there are only three players left, the Vampire is no longer immune to being voted off. If the remaining two players vote to eliminate the Vampire, they win. On any other outcome, the Vampire wins.

The advantage of this game is that the non-Vampire players are strongly incentivised to vote for the Vampire, because this is the only way they can find out who the Vampire is. The disadvantage is that the game could easily be a flop. Just like in *Million Dollar Secret*, the players just need to collude. If they all vote for the Vampire and some other player is eliminated, they immediately know who the Vampire is and the remaining rounds will be rather dull. This could be mitigated somewhat by starting with a small number of players (maybe 6 or 7) to increase the chance of getting a tied vote, but I don't think the problem can really be fixed.

I wonder if it's possible to come up with a set of axioms that a "TV-ready" social deduction game would have to satisfy, and then either develop a game satisfying these axioms or show that no game does?

In any case, it seems that if a game makes good television it doesn't necessarily mean that it's a good *game*!