---
title: CS346 Advanced Databases
date: "2017-10-03T12:00:00.000Z"
tags:
- main
---

# Lecture 1
*October 5th, 2017*

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

# Lecture 2
*October 6th, 2017*

### Why use RDBMS

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

### When *not* to use a RDBMS?

Small dataset, model doesn't change often, simple application.

## **Relational databases**

- Relational model
  - Relational Data Structures
  - Integrity Rules

- Query languages
  - Relational Algebra (useful for running queries efficiently)
  - Relational Calculus
  - SQL

### Keys

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

### Integrity Rules

- **Domain contrainsts** A data type for each item.

- **Entity integrity:** Every relation has a valid primary key.

- **Referential integrity:** if one column is a foreign key to another table,
  if a row has a non-null value as the column, it MUST exist in the foreign
  table.

### Normalize

(...show tables from slides)


## **Storage, Files, and Indexing**

### Outline

**Part 1**
- Disk properties and file storage
- File organizations: ordered, unordered, and hashed
- STorage: RAID and storage are networks

- Chapter: "Dist Storage, Basic File Structures and Hashing"

### Why?



Locality: similar objects in the same block
Parallelism: if there are too many objects to fit in one block, spread them
over many servers, clustered in the same block within each server.

Bottom-up perspective on data management.


### Data on Disks

- Databases ultimately rely on non-volatile disk storage
  - Data typically does not fit in (volatile) memory
- Physical properties of disks affect performance of the DBMS
  - Need to understand some basics of disks

- A few exceptions to disk-based databases:
  - Some real-time applications use "in-memory databases"

### Rotating Disk

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

### Records: the basic unit of the database

- DBs fundamentally composed of records
  - Each record describes an object with a number of fields
- Fields have a type (int, float, string, time, compound...)
  - Fixed or variable length
- Need to know when one field ends and the next begins
  - Field length codes
  - Field separators (special characters)
- Leads to **variable length records**
  - How to effectively search through data with variable length records?
