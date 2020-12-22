---
date: 2019-07-15
title: Deconstruct Conference 2019
---

Last week some teammates and I made the journey to Seattle for [Deconstruct](https://www.deconstructconf.com).
Like 2017 and 2018 before it, Deconstruct 2019 did not disappoint.

The speakers and their content kept with the established brand of diversity filling an empty vessel.
The organizers deserve an extra thanks for fostering a collective voice that is richer than the speaking circuit status quo.

I made an effort to take notes for recollection and reflection.
They're offered below, mostly unedited.

## 2 Factor, 4 Humans

- [Karla](https://karla.io)
- Account takeover is what we're fighting against
- SIM porting is a real thing
- At one point [login.github.io](https://login.github.io) was a phishing site hosted on GitHub Pages 😱
- We've gone from hardware, to software, back to hardware. (RSAID, Authenticator App, Yubikey)
- Threat modeling: "how would you protect a friend who was walking to the bank with money"
  - How does that model change in a safe neighborhood?
  - How does that model change if it is a literal sack with a dollar sign on it?
  - **Are you a target?**

### Takeaway

Security is a tradeoff! Usability for the user is often traded away for strong defenses against the attacker.
When considering two-factor authentication for yourself, or making recommendations to a friend, consider the tradeoffs.
Are you protecting them when they're walking with a sack of money, or with a pack of gummy bears. 💰

## Multiplayer Game Networking: The Brute Force Approach

- [Ayla Myers](https://brid.gs)
- Pudgy penguin jumping as model for predicting future state
- [PICO 8 Fantasy Console](https://www.lexaloffle.com/pico-8.php)
- [castle.games](https://castle.games)
- "3 years later..." narrative was super effective

### Takeaway

Throw yourself at hard problems, over a long period of time.
You're not failing.
You're learning!

## Jepsen 11. Once more unto the breach

- [Kyle Kingsburg](https://jepsen.io)
- “Information hiding” illustrated as a tire fire under the rainbow
- Anomalies
- Fauna DB
- Yugabyte DB
- Read skew of partial transactions
- TiDB
- Google percolator
- Read the docs...
- ...but sometimes the docs are wrong! Test for yourself
- Test your systems end to end
- If you look for perfection you will never be content

## Takeaway

Be skeptical of all the jargon around emerging (and existent) databases.
Jepsen's methods of testing find flaws in the guarantees all the time.
Picking a technology is signing a contract with Ursula the sea witch.

## Identifying Mushrooms Like a Prolog

- Josh Cox
- SWI-Prolog
- Ecological role of mushrooms
- [LearnYourLand.com](https://learnyourland.com)
- One big prolog feature demo

### Takeaway

Get a hobby outside of programming, like foraging mushrooms, and learn as much as I can about it.

## The Wet Codebase

- [Dan Abramov](https://overreacted.io)
- DRY vs duplicate on purpose
- Each incremental step makes sense
- “Please in-line this abstraction”
- Benefits vs costs
- Inertia
- Lasagna code as the solution to spaghetti code has it's own problems
- Delay adding layers
- Be ready to in-line it
- Test against concretions
- “Constrained forms of dependency management”
- Define what you’re trading away
- [All the Little Things by Sandi Metz](https://www.youtube.com/watch?v=8bZh5LMaSmE)
- [Minimal API Surface Area by Sebastian Markbage](https://www.youtube.com/watch?v=4anAwXYqLG8)
- [On the Spectrum of Abstraction by Cheng Lue](https://www.youtube.com/watch?v=mVVNJKv9esE)

### Takeaway

Abstractions are not free.
Duplication is cheaper than the wrong abstraction.
Double down on Sandi Metz ideas of the last few years.

## A Personal Computer for Children of All Cultures

- [Ramsey Nasser](http://naw.sr)
- Game designer, artist, educator
- Decolonizing digital
- A play on [A Personal Computer for Children of All Ages by Alan Kay](http://www.vpri.org/pdf/hc_pers_comp_for_children.pdf)
- Names are canonical
- Names are important
- Names are heavy
- Allow everyone to use meaningful names
- Support global collaboration
- Not privilege one culture over others
- Unison programming language

### Takeaway

Contemplation.

Contemplative on the boundaries that language and culture maintain, and the attempts to remove them.
It feels like a mutually impossible and aspirational goal.
Wondering what the second order effects would be.
What the impossible translations would be.
What impassible differences in mental models would emerge.

## Clock Skew and You

- [Allison Kaptur](https://akaptur.com)
- Define distributed system: "more than one computer"
- [Spaceteam game](https://www.playspaceteam.com)
- Clock skew vs clock drift
- Network time protocol
- Fundamental infrastructure is understandable
- Reasonable fallback

### Takeaway

Clock skew is a real problem, especially in distributed systems.
Pick a timekeeper as the authority.

## Voice Driven Development

- [Emily Shea](https://github.com/2shea)
- Writes Perl by voice
- Motivated by RSI
- [Dragon dictation](http://dragondictation.org)
- [Talon](https://talonvoice.com)
- [lunixbochs on Patreon](https://www.patreon.com/lunixbochs)
- Voice strain
- Stenomask
- Acoustic pods

### Takeaway

Impressed by Emily's demos. Remember non keyboard/mouse users when building things.

## Setting Up To Fail

- [Vaidehi Joshi](http://vaidehi.com)
- [Base CS Podcast](https://www.codenewbie.org/basecs)
- [Base DS](https://medium.com/baseds) - Distributed Systems
- Define distributed system: many processes talking to each other
- Every entity is autonomous
- Transparency
- Leslie Lamport - “a distributed system is one in which the failure of a computer you didn’t even know existed can render your computer unusable”
- Latent or active faults 🗻🌋
- Nodes communicate with messages
- Correct content at incorrect time is a failure
- Incorrect content at correct time is a failure
- Consistent failures
- “Arbitrary/Byzantine failure“ - arbitrary messages at arbitrary times
- “Software failures” === “bugs”
- Our systems are setup to fail. They will fail eventually, and in different ways
- How a system works isn’t as important as how it fails
- Understand the problem of failure
- Kaizen for failure instead of waste
- Build things that fail because they definitely will

### Takeaway

Things are going to fail.
Design and develop assuming they will.

## The Tortoise and the Hare Write Software

- [Erica Gomez](https://ericalgomez.com)
- Our industry has an obsession with speed
- Airplanes industry introduces "intentional friction"
- Avionics, regulation, and the FAR
- "Respect for humanity" - Toyota Production Systems
- Hardware gap that was patched with software led to airplane crashes
- Small changes can have large consequences
- Teams change systems change teams
- John Tukey - first used term “software”
- Where has all the caution gone?
- Software as single point of failure for covering hardware or organizational defects
- Software is people
- “Can’t we just...” is the software development version of “hold my beer”
- Richard Carhart: “people must be recognized as the glue that holds systems together”
- Brooks’ Law: "adding human resources to a late software project makes it later"
- Pair programming, prototypes, and code reviews as intentional friction

1. Induce friction. Double down on it
2. Revisit your designs in a big way
3. Go home!
4. Talk in terms of "calculating risk" rather than "technical debt" ([@jessitron tweet](https://twitter.com/jessitron/status/1123310331957145601))

- "A delayed game is eventually good, but a rushed game is forever bad." - Shigeru Miyamoto

### Takeaway

Intentional friction is a tool worth employing.
Software isn't a cureall for hardware, organization, or personnel defects.

## Files

- [Dan Luu](https://danluu.com)
- [https://danluu.com/deconstruct-files](danluu.com/deconstruct-files)

### Takeaway

It's a miracle that anything that persists state works.

## Modularity

- [Kamal Marhubi](http://kamalmarhubi.com)
- Barbara Liskov won the Turing Award
- Historical context of the "software crisis": "the difficulty of writing useful programs in the required time"
- [Go To Statement Considered Harmful](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf)
- Dijkstra's motivation was to make code more understandable
- Dataless Programming by Balzer
- Solving problems with a language change
- Information distribution aspects of design methodology - “hiding data is good”
- Haste also makes poor internal structure likely
- Understandable and modifiable
- Reduce connections
- Allow multiple implementations
- Use your language

### Takeaway

Read the works of those who have come before us.
Many of the problems we face in building software are not new, and they might find some relief if we took the time to gather prior understanding and rumination.

## Not Even Wrong

[John Feminella](http://jxf.me)

- Stories are good!
- Statistics are good!
- Remember three foods vs remember three numbers as litmus test for how good we are at stories, and how bad we are at numbers
- Predictable phenomena
- Use the right tool for the job (stories, statistics, and combining them)
- Phrases like “unlikely” vs precision percentage
- Estimates should include uncertainty
- [Concrete Introduction to Probability with Python](https://irrlab.com/2018/05/07/a-concrete-introduction-to-probability-using-python/)
- Estimating AWS spending based on weeks of historical data... then it’s Black Friday
- [An Introduction to Z-Scores on Khan Academy](https://www.khanacademy.org/math/ap-statistics/density-curves-normal-distribution-ap/measuring-position/v/z-score-introduction)
- Liz Lemon as hidden variables in causation and correlation between cheese consumption and bed sheet entanglement deaths
- Explain conditionals clearly

### Takeaway

Stories and statistics are two excellent tools at our disposal.
Felt like a brief introduction to the ideas presented in [Thinking Fast and Slow](https://amzn.to/2XHi1d8).

## That's it

Two days in lower Queen Anne provided a firehose of ideas that I hope will continue percolating into thoughts as I build things.
I'm very thankful [my company](https://planning.center) sends our team to conferences to learn, grow, discuss, and enjoy a change of perspective that cannot be found in day-to-day development.
For the past three years Deconstruct has been very effective to those ends, and I imagine it will be into the future.
