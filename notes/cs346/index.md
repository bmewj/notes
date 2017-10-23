---
title: CS346 Advanced Databases
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

#### **Lecture 1** – October 5th, 2017

Significant part of the module: the back-end of databases. Other part: recent
development in db tech.

In other words: 60% is data structures, 40% is operating systems.

For db performance, we care about I/O ops since db's are usually stored on
disk and not in memory. We optimise algorithms to minimise I/O ops involved.
Clock cycles, or CPU comparisons are relatively cheap by comparison.

**CS258 Recap...**  
CS258 was application design: start with a companies needs, construct E/R
diagrams, which later become tables in a relational database.

The relational model was invented by Cod at IBM. SQL became the standard for
querying relational models.

**This modules...**  
The back-end. How do you provide for the application guys from CS258?

Things that we discuss include:

- B-trees (n-ary balanced trees)
- multiple indices: querying multiple attributes simultaneously
- external hashing: hash points to different blocks on disk
- order of joins: what do you join first?

$$
ABC \rightarrow (AB)C | A(BC)
$$

- OLAP: Can I change this relational model to make it more fit for analysis?
- Teradata: data warehousing company.

#### **Lecture 2** – October 6th, 2017

## Why use RDBMS

- **Controlling redundancy**  
  Redundancy causes inconsistencies in the data, update costs, and storage
  overheads. Recent technologies aim to make data consistent, however the
  updates must be available eventually.

- **Concurrency Control**  
  DBs control concurrency themselves (not relying on the OS) to make sure
  the data can be accessed concurrently.

- **Backup and Recovery**  
  In case of errors, roll back to the last consistent state.

- **Views, Access Control**  
  Different people can see different parts of the database.

- **Standardization (SQL)**  
  Use the same language for querying irrespective of the underlying
  database technology.

## When *not* to use a RDBMS?

Small dataset, model doesn't change often, simple application.

# **Relational databases**

- Relational model
  - Relational Data Structures
  - Integrity Rules

- Query languages
  - Relational Algebra (useful for running queries efficiently)
  - Relational Calculus
  - SQL

## Keys

- A relation is a **set** of tuples. All elements of a set are distinct.

- Hence **all tuples must be distinct**.

- There may also be a **subset of the attributes** with the property that
  values **must** be distinct.  
  Such a set is called a ***superkey***.
  - $SK$ a set of attributes
  - $t_1$ and $t_2$ tuples
  - $t_1[SK] \neq t_2[SK]$

- A ***candidate key*** is a minimal super key.
  - A set of attributes, $CK$ is a superkey,
  - but no proper subset is a superkey.

- A ***primary key*** is one *arbitrarily chosen candidate key*.

## Integrity Rules

- **Domain contrainsts** A data type for each item.

- **Entity integrity:** Every relation has a valid primary key.

- **Referential integrity:** if one column is a foreign key to another table,
  if a row has a non-null value as the column, it MUST exist in the foreign
  table.

## Normalize

(...show tables from slides)


# **Storage, Files, and Indexing**

## Outline

**Part 1**
- Disk properties and file storage
- File organizations: ordered, unordered, and hashed
- STorage: RAID and storage are networks

- Chapter: "Dist Storage, Basic File Structures and Hashing"

## Why?

Locality: similar objects in the same block
Parallelism: if there are too many objects to fit in one block, spread them
over many servers, clustered in the same block within each server.

Bottom-up perspective on data management.


## Data on Disks

- Databases ultimately rely on non-volatile disk storage
  - Data typically does not fit in (volatile) memory
- Physical properties of disks affect performance of the DBMS
  - Need to understand some basics of disks

- A few exceptions to disk-based databases:
  - Some real-time applications use "in-memory databases"

## Rotating Disk

- Seeking means waiting for your sector of data to come round to the reading
  arm. Once you get there you want to do sequential I/O, not random I/O.

- Too tidy sequential I/O: more data comes along and everything has to be
  shifted forwards.

- When writing your DB application, you fit your block size to be reasonable.
  Say, 16MB.

- Seek time: move read head into position, currently $~4ms$
  - Includes rotational delay: wait for sector to come under read head.
  - Random access: $1/0.004 * 4KB = 1MB/s$. Quite slow...

- Track-to-track move, currently $~0.4ms$: 10 times faster.
  - Sustained read/write time: $100MB/s$ (caching can improve this further)

- Buffering can help multithreaded systems.
  - Work on other processes while waiting for I/O data to arrive.
  - For writing on disk, fill a buffer first. When the buffer is full, then
    write to disk.
  - Double buffering: fill one buffer whilst another is being written to disk.

## Records: the basic unit of the database

- DBs fundamentally composed of records
  - Each record describes an object with a number of fields
- Fields have a type (int, float, string, time, compound...)
  - Fixed or variable length
- Need to know when one field ends and the next begins
  - Field length codes
  - Field separators (special characters)
- Leads to **variable length records**
  - How to effectively search through data with variable length records?

#### **Lecture 3** – October 9th, 2017

## Records and Blocks

- Records get stored on disks organized into blocks
- Small records: pack an integer number into each block
  - Leaves some space left over in blocks
  - Blocking Factor: (average) number of records per block
- Large records: may not be effective to leave slack
  - Records may span across multiple blocks (spanned organization)
  - May use a pointer at end of block to point to next block

## File Organization

- File: Sequence of records
  - Fixed-length vs. variable-length records
- Records are stored to disk blocks
  - Spanned vs. unspanned
- Blocks are allocated to disk
  - Contiguous vs. Linked allocation
- File Organization
  - Unordered
  - Ordered
  - Hashing

### Unordered Files

- Just dump the records on disk in no particular order
- Insert is very efficent: just add to last block
- Scan is very inefficient: need to do a linear search.
  - Approx. read half the file on average
- Delete could be inefficient

### Ordered Files

- Keep records ordered on some (key) value

### Hashing Files

- Use hashing to ensure records with same key are grouped together
- Arrange file blocks into M equal sized buckets
  - Often, 1 block = 1 bucket
- Usual hash table concerns emerge
  - How to deal with collisions?
  - Deletions also get messy

- **External hashing**: don't store records directly in buckets, store
  pointers to records.
  - Pointers are small, fit more in a block
  - "All problems in computer science can be solved by another level
    of indirection" – *David Wheeler*

### External Hashing for Disk Files

- **Bucket**: One disk block or cluster of contiguous blocks (like
  fixed-size chaining)
- Hashing maps a key to a bucket number (which is then mapped to a
  physical block)

### Dynamic Hashing

- Static hashing: hash address space is fixed.
- Dynamic hashing: Expand and shrink the hash space.

### Extendible Hashing

For a table of size 2: use most significant bit for hash.

**TODO**: This is complicated. Write out a full description for this later.

#### **Lecture 4** – October 12th, 2017

**Points to Note**

- Does the order of insertion matter?  
  Not in this case. But in most cases we are inserting multiple rows at a time
  anyway. This is called **bulk loading**, where you find a way to efficiently
  insert reams of data instead of inserting tuples one by one.

- Bucket split causes directory doubling
  - If local depth becomes > global depth

### Linear Hashing: Example

# **Indexing**

![Index](lecture-4-indexing.png)

**Aims**
- Generate a smaller file, by having an index of an index.

## Primary Index

Can be **dense** or **sparse**. A sparse index has only a selection of tuples
with which you can find the other tuples.

- Single-level Ordered Indexes
  - Primary Indexes
  - Clustering Indexes
  - Secondary Indexes

- Multilevel Indexes

- Dynamic Multilevel Indexes
  - B-Trees, B+-Trees

- Indexes on Multiple Keys

To allow insertions you need to leave empty space in buckets. However, less
entries in each block means you have more IO operations.

Another alternative is **overflow**. If a block is full, have a chain to a
secondary block instead of shifting all data along blocks. Overnight you can
run through the data and rebuild an index.

Or you can keep an insertion table (in memory). Don't insert tuples into the
index immediately. Once in a while you can bulk insert the tuples into the
index and rebuild the index.

Most the time you don't want to reorganise the index. If you delete "Bob
Alfred", mark it as deleted instead of removing from the index.

## Clustering Index

![Clustering](lecture-4-clustering.png)

- Insertion is a challenger in the previous version.
- Cluster index where each distinct value is allocated a whole disk block
- Linked list if more than one block is needed
- Easier to update file with inserts/deletes

## Secondary indexes

- Secondary indexes provide a **secondary** means of access to data

These are dense indexes with references to blocks. Not good for insertions,
deletions. But extremely good for existence queries (0 IO operations to figure
out if $x$ is in your table.)

## Indexes on non-key columns

- Keep multiple entries for the same value in the index
- One entry per value, points to block of pointers that point to all the rows
  with that value.

## Two-level index / Multi-level indexing

Bottom-up perspective: we have a big file, we want to search the file. So we
need an index that's sorted, and we want to navigate that index quickly. So we
build an index of the index, and we end up with a tree.

#### **Lecture 5** – October 13th, 2017

Missed...

#### **Lecture 6** – October 13th, 2017

Made no notes...

#### **Lecture 7** – October 19th, 2017

## Bulk insertion

Insertion order is important in B+ trees. What if the data to be inserted is
sorted? What will the tree look like at the end? When you insert your data in
order you end up with a B+ tree that is very empty (minimally empty in fact).

This can be resolved by calling a `sorted_bulk_insert()` function instead
of a regular `insert()` for each tuple.

For bulk insertion, when you split, don't split the bucket in half. Instead
only bring the greatest element to the new bucket and leave the old bucket
full. This is referred to as **bulk loading**.

Level: 3  
Max-capacity: 11  

Best case:
- $11$ pointers for root
- $11$ pointers for nodes in second level
- $10$ keys for leaf nodes

$$11\times 11\times 10=1210$$

Worst case:
- $2$ pointers for root
- $6$ pointers for nodes in second level
- $5$ keys for leaf nodes

$$2\times 6\times 5=60$$

## Data Storage

**Tuning** tweaking the performance of a query.

Make sure disk speeds are all the same, or be considerate of slower disks.

Handle disk addition and disk removal without turning off the 

Policy constraints
- Duplicate the data in countries that are allowed (w.r.t. data privacy).

Replace cross-data centers
- Always have three different copies of data in separate locations of data
  centre.

The ideal parallelism for a single query is
- Minimal number of parallel scanning servers needed to satisfy the client.

Concurrent queries
- Maximizing parallelism for all of them can cause disk contention, reducing
  everybody's performance.

The goal in data centres is: reach maximal parallelism while minimizing
concurrency issues.

# **Tuning**

**Tuning** tweaking the performance of a query.

Retrieval queries:
1. Which files are accessed by the query?
2. Which attributes is selection applied to?
3. Is the selection equality, inequality or range?
4. Which attributes are subjects of join conditions?
5. Which attributes are retrieved by the query?

Update transactions:
1. The files that will be updated
2. The type of operation on each file (insert, modify, delete)
3. The attributes for selection of a record to delete/modify
4. The attributes whose values will be changed by a modify

Third one is most important.
Need to build an index on attributes from 3, need to avoid index on attributes
from 4, since they change often.

Building an index makes sense in most cases, but you shouldn't have them for
some attributes. For example, for attributes that are modified often.

Attributes with uniqueness (key) constraints should have an index.

`CREATE [ UNIQUE ] INDEX <index name> ON <table name> (<column name> [ <order>
  ] ) `

