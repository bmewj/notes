---
title: CS301 Complexity of Algorithms
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

# Lecture 1
*October 3rd, 2017*

"$4 + 5 = ...$" is not an algorithmic problem.  
"*integer addition*" is an algorithmic problem.

$\{0,1\}^\ast$ is the set of all binary string.

Formally, $f : \{0,1\}^\ast \times \{0,1\}^\ast \rightarrow \{0,1\}^\ast$.

# Lecture 2
*October 6th, 2017*

All data can be encoded with $\{0,1\}^\ast$. $f : \{0,1\}^\ast \rightarrow
\{0,1\}^\ast$ is an algorithmic problem. An algorithm is a solution to said
problem.

It has to terminate in a finite number of steps and must be **finitely
representable**.

$f : \{0,1\}^\ast \rightarrow \{0,1\}$ is a decision problem. Very often we
can reduce an arbitrary algorithmic problem to a decision problem.

The algorithmic problem $dist(a, b) = n$, provided you have a finite upper
bound, can be calculated through repeated calls to

$$
f(a,b,x)= 
\begin{cases}
1, & \text{if } dist(a,b)\geq x\\
0, & \text{otherwise.}
\end{cases}
$$

## **Limits of Computation**

Goal: answer whether an algorithmic problem...
- can be solved by a computer
- can be solved efficiently by a computer

Notation:
- $\underline{x}$ denotes the representation of object $x$
- a pair $\langle x,y\rangle$ can be encoded as $\underline{x}\circ\times
  \circ\underline{y}$ in the alphabet $\{0,1,\times\}^\ast$, then encoded
  with $0\rightarrow 00$, $1\rightarrow 11$, $\times\rightarrow 01$.

Decision problem $f : \{0,1\}^\ast \rightarrow \{0,1\}$, can be identified
with language $L_f=\{x:f(x)=1\}$. The problem of computing $f$ is equivalent
to deciding $L_f$.

Reduce $TSP$ to Hamiltonian cycle test: weight `1` on non-edges, `0` on edges.

$$
TSP(G) = 0 \Rightarrow \text{Hamiltonian cycle}
$$

Elemental operations:

1. Read a bit from input or scratch pad.
2. Write bit to scratch pad.
3. Either stop, output `0` or `1`, or choose a new rule that will be applied
   next (branching).







