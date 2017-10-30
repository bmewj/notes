---
title: CS324 Computer Graphics
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

#### **Lecture ?** – October 30th, 2017

Liang-Barksy line clipping

$x_{\textrm{min}} \leq x_1+t\Delta x \leq x_{\textrm{max}}$

$y_{\textrm{min}} \leq y_1+t\Delta y \leq y_{\textrm{max}}$

In Cohen-Sutherland method you can reject certain parallel cases.

$p_1=\Delta x$

$q_1=x_1-x_{\textrm{min}}$

- When $p_k<0$ the infinite extension of the line proceeds from the outside to
  the inside of the infinite extension of the $k_{th}$ clip boundary.
- Intersection with clip boundary occurs at $t=q_k/p_k$.
- Compute two such values of $t$, $t_1$ and $t_2$ that define the part of the
  line within the clip box.

## Polygon Clipping

If you clip parts of a polygon, you have to add the sides back so that you can
fill the polygon correctly.

This can be done with **Sutherland-Hodgman**:

- This algorithm operates a pipeline of checks.

- All polygon edges are first checked against one of the infinite clipping
lines of the clip rectangle.

- The surviving vertices and generated vertices are output to next stage.

- Next stage checks these vertices against one of the remaining clip
boundaries, and so on.
