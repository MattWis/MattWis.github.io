---
layout: post
title:  "Concentration - Basic Tak Strategy"
date:   2016-04-14 20:12:48 -0400
categories: jekyll update
---
For those of you who are unaware, [Tak](http://www.cheapass.com/games/tak)
is a game that I have been [playing](https://playtak.com) a lot of recently.

I've been thinking about how to teach Tak strategy, and I think I've come up
with a metric that will help explain the way I play. If you're familiar with
Go, this will be the Tak equivalent of liberties. Concentration defines how I
play Tak, and helps me develop large stacks under my control.

Your concentration at a point is the number of turns in a row that you can move
one of your stones to a given point. Said another way, your concentration is
the number of turns in a row that you can take over the same stack. It's
essentially who will win control of a stack. You can say "My concentration at
b3 is 4." Note that concentration only works with flatstones. Walls and
Capstones change the game entirely. That being said, many fights where both
sides want a specific area offensively don't use walls, and many times the
Capstones are somewhere else or being kept in reserve.

## Motivation

The way I win at Tak is by controlling large piles, and then striking out with
them. The way to control large piles is to concentrate at them.

### My piles

If I have an equal or higher concentration than my opponent at a pile that I
own, it can't be taken from me without me immediately taking it back. This
allows me to keep the pile handy, to strike in the direction that I want, when
I see fit.

### Opponents piles

If I have a greater concentration than my opponent at a pile he owns, he has to
split up the pile, or I'll take it from him. I find that large piles are often
more of a threat than a specific line of pieces, due to the options that they
have. By forcing my opponent to take one of the options immediately, he has to
realize one potential option for the stack, instead of me having to defend
against all potential options.

## Calculation with Examples

To start, let's take a pretty easy example of [a game](https://jsfiddle.net/bwochinski/043hpzwu/embedded/result/?ptn=[Event%20%22Games%20at%20work%22]%0A[Site%20%22The%20Office%22]%0A[Date%20%222016.01.13%22]%0A[Player1%20%22Tim%22]%0A[Player2%20%22Scott%22]%0A[Round%20%221%22]%0A[Result%20%22R-0%22]%0A[Size%20%225%22]%0A%0A1.%20a2%20d3%0A2.%20c3%20a3%0A3.%20a5%20a1%0A4.%20b4%20b2%0A5.%20e3%20b3%0A6.%20c4%27%20b3%2B%0A7.%20c4%3C%20b3%0A8.%202b4-%27%20a3%3E%27%0A9.%20b4-%27%20b2%2B%0A10.%20c3%3C%20Cb4%0A11.%204b3%3E%27%20b4-%0A12.%204c3%2B22%20b2%27%0A13.%20Sb4%204b3%3C%27%0A14.%20Ca4%204a3%3E%0A15.%20Sc3%20a3%0A16.%20d4%27%20b5%0A17.%20a4%3E%27%20R-0)
that demonstrates the concept pretty well:

The early game here hinges on the concentration at b3, by the way the early
game developed. (I have no idea how to explain the early game. I would
appreciate advice on that area of my game.) At the end of turn 4, both players'
concentration at b3 is 2. Since the tie goes to the owner of the spot, the
first person to play on b3 will own it.

And Scott does take it, but is forced to move off the square by Tim's early
Tak. Scott ends up moving up to b4, where he has a concentration of 0, and Tim
has a concentration of 1. Tim then takes a4.

At the end of turn 7, Tim has a concentration of 3 at b3, meaning that he can
take the spot from Scott. Which he does, moving stones onto b3 for three
consecutive turns. This gives Tim control of a pretty powerful stack. Scott
then lays his Capstone, and Capstones break the whole concept of concentration,
so I'll stop commenting on the game there. Tim ends up winning, partially
because of his good use of a powerful stack.

Now, a couple of more complicated examples, from [a game](https://jsfiddle.net/bwochinski/043hpzwu/embedded/result/?ptn=[Event%20%22Playing%20bots%22]%0A[Site%20%22playtak.com%22]%0A[Player1%20%22SkikiBot%22]%0A[Player2%20%22timerot%22]%0A[Date%20%222016.04.10%22]%0A[Round%20%226%22]%0A[Result%20%22R-0%22]%0A[Size%20%225%22]%0A1.%20a1%20b4%0A2.%20c3%20e3%0A3.%20c2%20c5%0A4.%20d2%20c1%0A5.%20a4%20e2%0A6.%20d1%20d4%0A7.%20d3%20c1%3E%0A8.%20c1%20a5%0A9.%20b5%20c5%3C%0A10.%20e1%20c4%0A11.%20b3%202d1%3E%0A12.%20Ce4%20e3%3C%0A13.%20d2+%20d4-%0A14.%20c3%3E%20e3%0A15.%202d3%3E%20e2+%0A16.%202d3%3E%202b5-%0A17.%20a3%203b4-%0A18.%20a3%3E%20d2%0A19.%20a3%20Cc3%0A20.%204b3-%20d2+%0A21.%20e2%20c3%3C%0A22.%203b2%3E%20d2%0A23.%20a2%20a1+%0A24.%20a3-%202b3-%0A25.%203c2+%202d3%3C%0A26.%205e3%3C23%20c4-%0A27.%202d3%3C%20e3-%0A28.%203c3+%203b2%3E%0A29.%205c3%3C14%204c2+%0A30.%20b4%205c3+%0A31.%20b3%3E%20b5%0A32.%20b3%20c2%0A33.%20d3%20c2+%0A34.%20d3%3C%20Sd3%0A35.%204c3-22%20d4%0A36.%20c5%20e5%0A37.%20c5%3C%20R-0)
that I had trouble finishing aginst ShikiBot:

At the end of turn 11, I'm trying to force my opponent into a bad situation,
by leveraging my near-road. I would love to take e2, but I don't have the
concentration there. I could play a flat at e4, but my opponent has the
concentration there as well. (And moving my stone gives him a tak.) So I
decide to drop an early Capstone, forcing him to play into my formation. My
formation here is really tight, since, at all of the places where I have flats
(other than c1 and a4) I have at least a concentration of 2. So everybody ends
up piling onto d3, where I now have control.

Move forward to the end of turn 16, where the focus is on a4, b4 and b3. I'm
trying to keep my offensive options open, in an area where we both have pretty
low concentration. So I play at a3, giving a concentration of 1 at a4 (where it
doesn't help), and b3 (where it matters). Note that I could only make this move
because it also caused a Tak. If I couldn't have caused a Tak, I probably would
have used my concentration at b4, by playing b3+. My opponent moves down to b3,
where I get to control a stack with an extra one of my pieces, as opposed to if
I had taken it at b4. I also like controlling big stacks closer to the center
of the board.

I'm pretty sure I would have had a guaranteed win in 2 or so turns if I had
then played at c3. But I didn't, and then my opponent drops a Capstone, and I
run around for a few turns. I only claim to be good at concentration battles...

The coolest concentation battle occurs at c3, starting on turn 25. After I move
2c2+, it looks as though I'm going to lose the concentration fight 2-1. (If I
was worried about that, I could have left an extra stone behind on c2). But my
concentration at c3 is actually 3, because of the tall stack on e3, which I
happily use to my advantage.

After that it's just me splitting that big stack, due to the capstone looming,
making the Capstone useless due to the carry limit, and eventually winning.

## Conclusion

There are many more intricacies to this that I haven't figured out yet. One
that I have been trying to deal with is that two stacks next to each other
can end up with a super weird concentration, especially if there are a bunch
of flats around the two stacks. Since moving onto a stack from further away
can capture intermediate stacks, it can be very dependent on the order of
moving pieces. It's pretty easy to calculate in the simple examples I've
provided, but your mileage may vary.

I hope you guys all find concentration to be a useful mental guide when
fighting over board position in Tak.


## The Name

If anyone has better ideas for the name of this than concentration, I would be
happy to hear them. I chose concentration for a few reasons. First, it is a
measure of your ability to concentrate your pieces at one spot, in the physical
sense. Second, it is what I focus on most when I play, so I concentrate on
concentration. Finally, it seems to go well with Alar, where my concentration
on holding a space is strong enough that I end up holding it. It works in the
sense of a sympathy duel, since me and my opponent are both trying to
concentrate hard enough to hold the space, working against each other.

