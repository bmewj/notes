---
title: Research
date: "2018-01-10T12:00:00.000Z"
tags:
- main
---

## Notes for Hakan **2018/01/10**

How does Google Maps deal with congestion? Where available, it gets traffic details and incorporates them into the travel time calculations. Does Google initially calculate many shortest path candidates (a top 10 or 20) on the basis of averages, and with these candidates calculates their travel time including congestion, followed by a re-ranking on the basis of the new travel time?

It appears that you're optimising for all queries of a particular time simultaneously. How would this work if integrated into an application such as Google Maps? We have queries flowing in continuously. Do we collect them into buckets of matching times, and once a bucket is full we run the queries together in a query set and return the results?

Another concern of mine is that queries that are submitted at different times are still dependent on each other, and would benefit from being considered together. One driver might submit a query that leads to him driving over road $A$ in 10 minutes time. Another driver, submitting a query 5 minutes later leads him to drive over read $A$ as well, but in 5 minutes time. Both the queries are submitted at different times, but both drivers occupy the same road at the same time as a result. How can this be accounted for?

## Notes from Hakan **2018/01/12**

- We will need to improve the writing and language of the draft.
- More formality needs to be injected into the algorithms. The proposed top-k algorithm can be improved with some formal contributions. Your math background can help here.  
  **The algorithm is very ad-hoc: very heuristic-ey. We need more formality in terms of reasoning about the algorithms performance. Needs more rigour.**
- Another solution and algorithm can be designed. This is not too difficult.
- The performance evaluation needs to be strengthened. We need to look for more/better data/queries, running longer path queries, identifying realistic experimental settings where congestion is real (that the algorithms make difference). In real life we know that traffic can be improved if people could take a bit different routes to their destinations. So we will work on more graphs and path queries to show insights into this problem.
- We can look at different formal goals, such as bounding the worst case for any query (no too unhappy traveler), minimize average (save fuel and time collectively).   
- The road capacities are strict now. We can model the load on the roads and use the changing values in the shortest path algorithms.  **Queueing theory...**
- Quality guarantees on the errors, times, etc. can be studied.
- We can generalize this where only a small subset of people use the navigation. For traffic apps, if the city requires all the cars to use their system, then we do not have this problem. Maybe a city centric view is what we need to solve the traffic problems. Also, there can be many applications where we know all the queries. A graph database system actually runs all queries concurrently. They just do not consider the changes in the graph while running them. This could be an application of our tool. However, for cases where we do not know all the queries in the system to really evaluate overloading, we can think of a method to estimate the whole picture given this small subset of queries.
- **Generating synthetic graphs with graph generators, with different topologies. Google them.**

TODO: Research multiple query optimization in database systems.