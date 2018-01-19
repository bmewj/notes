---
title: CS356 Approximation and Randomised Algorithms
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

#### **Lecture 1** – January 9th, 2018

### Same basic facts about the module

Theoretical module. No coding assignments. Instead, you write theorems and proofs.

### What is a *randomised algorithm?*

The output of the algorithm is a random event. What??

**Example**

Find the $k^{th}$ smallest element in an array $A[1...n]$.

Deterministic algorithm in linear time is *way* more complicated than the randomised algorithm in linear time.

**He doesn't explain the solution.**

Instance: value of $k$

1. Select an element from the array at random.
2. Scan through array: how many elements are greater, and how many are smaller?

Often, randomised algorithms are very simple to reason about.

## **Vertex Cover**

### Conventional Formulation

Graph $G=(V,E)$. A subset $S\subseteq V$ is a vertex cover iff $\forall (u,v)\in E$, either $u \in S$ or $v \in S$.

Problem: compute minimum vertex cover. (Which is NP-hard).

### An Alternative Formulation

Define $x_v \in {0,1} \forall v \in V$.  
$x_v = 1$ iff $v$ is part of VC.

vector = $(..., x_v, ...)$

$x_u + x_v \ge 1 \forall (u,v) \in E$

Minimize: $\sum_{v \in V} x_v$ $\leftarrow$ size of VC.

### ...Integer Program

Optimize a linear function over integer variables subject to linear constraints.

Can this be solved in polynomial time? No. It's NP-hard: it's merely a reduction of the original problem.

#### **Lecture 2** – January 11th, 2018

## **Theorem 1:** Solving integer programs optimally is NP-hard.

Not proved in this module.

## **Theorem 2:** We can solve LPs optimally in polynomial time.

Changing the problem of the vertex cover to a fractional vertex cover problem allows us to find an approximate solution.

Define <span style="color:red">$x_v \in [0,1]$</span> $\forall v \in V$.  
$x_v = 1$ iff $v$ is part of VC.

vector = $(..., x_v, ...)$

$x_u + x_v \ge 1 \forall (u,v) \in E$

Minimize: $\textrm{OPT}_f(G) = \sum_{v \in V} x_v$ $\leftarrow$ size of fractional VC.

$\textrm{OPT}_f(G) \le \textrm{OPT}(G) \le A(G) \le 2 \times \textrm{OPT}_f(G)$

By nature of the above inequality, $A(G)$ is a 2-approximation of the vertex cover. Since it's bounded below by $\textrm{OPT}_f$ and bounded above by $2 \times \textrm{OPT}_f$.

#### **Lecture 3** – January 12th, 2018

## Linear programming...

Basically: D1.

What kind of linear programs can occur?

### **Type 1)** *The LP is infeasible*

It is impossible to satisfy the constraints. For example, if we have $x \le 1$ and $x \ge 2$.

### **Type 2)** *The constraints are too loose*

The constraints are so loose that the set of feasible solutions is unbounded, and it is possible to achieve arbitrarily high objective values. For example, if we want to maximize $x_1 + x_2$ with constraints $2x_1 + 4x_2 \ge 7$, and $x_1, x_2 \ge 0$.

### **Type 3)** *The optimum objective value is finitie*

This is the type of LPs we will primarily be concerned with.

## Subset cover problem

Just like the vertex cover problem, this one is also an NP integer problem that can be approximated with a *relaxation* to a linear problem.

**TODO:** explain the deterministic rounding algorithm

#### **Lecture 4** – January 16th, 2018

## LP-duality

Every LP has a sister LP. A maximisation problem has a minimisation pair. Solving either of them is equivalent to solving the other.

Particularly, on a minimisation LP, you can beg the question as to what its lower bound is: any solution has to be at least a particular size. You can derive this lower bound by manipulating its constraints, in turn creating new constraints that form a maximisation problem, trying to find the largest solution that is still a lower bound for the original LP.

## **Theorem:** Weak Duality Theorem

For a minimisation LP, $\textrm{LP}_1$ in standard form, it will have a maximisation dual $\textrm{LP}_2$. (Alternativeluy, you can also start from $\textrm{LP}_2$ and arrive at $\textrm{LP}_1$).

With $\textrm{OPT}_1$ and $\textrm{OPT}_2$ respectively denoting the optimal objective values, then by the **Weak Duality Theorem**: $\textrm{OPT}_2 \le \textrm{OPT}_1$.

## **Theorem:** Strong Duality Theorem

Building on the Weak Duality Theorem, not only can we say that $\textrm{OPT}_2 \le \textrm{OPT}_1$, we can say $\textrm{OPT}_2 = \textrm{OPT}_1$.

This makes sense, because the maximum lower bound on a minimisation problem that is not larger than the minimum would be the minimum itself.

#### **Lecture 5** – January 18th, 2018

Covering the strong duality theorem.

**You should be able to come up with a dual for any LP.**

### Example

$E=\{e_1,...,e_7\}$. $\{S_1,...,S_4\} \subset E$

$S_1 = \{e_1,e_3\}$  
$S_2 = \{e_2,e_3,e_4,e_7\}$  
$S_3 = \{e_1,e_5,e_6\}$  
$S_4 = \{e_2,e_4,e_1\}$

$\{S_2,S_3\}$ covers all elements. $S_3$

#### **Lecture 6** – January 19th, 2018

Missed lecture.
