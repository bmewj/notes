---
title: ST301 Bayesian Statistics and Decision Theory
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

# Lecture 1
*October 3rd, 2017*

Monday on weeks 4, 7, 10 are problems classes instead of lectures.

For Bayesian statistics it's relevant to be able to explain why your methods
are good. Not simply to assume they are.

As you receive more data, you want to be able to update your model, not just
run the same model again on the new data.

## **Part 1:** Foundations of Decision Making

- $D$ denotes the decision space.
- $\Theta$ denotes the outcome space.
- $L(d,\theta)$ is the loss function: how much did
  $d \rightarrow \theta$ cost you?
- $p(\theta)$ is the probability that $\theta \in \Theta$ happens.
- $R(d,\theta) := -L(d,\theta)$ is the pay-off function.

Now: criteria for good decisions. Simple criteria: minimise loss.

$$
\bar{L}(d) = \sum_{\theta \in \Theta} L(d,\theta)p(\theta)
$$

$$
\bar{R}(d) = -\bar{L}(d)
$$

$$
d^* := \mathrm{argmax}_{d \in D} \bar{R}(d)
$$