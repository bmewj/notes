---
title: Project Specification
date: "2017-10-19T12:00:00.000Z"
tags:
- main
---

**Programming language for rapid experimentation and research**

## **Introduction**

When software development teams are tasked with building a product on a tight
deadline they often opt for dynamic languages like JavaScript or Python.
Dynamic programming languages offer high iteration speed, concise syntax with
less boilerplate code, imperceptibly fast compilation speeds, hot-swapping
code, and much more.

Personally, I have a lot of experience with writing JavaScript. I've benefited
greatly from the flexibility and ease of development that comes along with the
language and it's libraries. I have, however, also dealt with some of it's
downsides. Some of these are problems specific to JavaScript, others are
problems that show up in any dynamic language.

These problems generally stem from the lack of type checking and correctness
checking at compile-time. My browser, node server, and React Native iOS app
_will_ run my code even if it contains type errors, variable name spellings
mistakes, calls to functions with the wrong number of arguments, and the list
goes on...

In addition to leaving errors until runtime, code refactoring is also more
difficult. If I change the name of a field on this object, where else do
I have to change the name? Renaming a field in a static language will result
in type errors propping in all the places where the old name was used. The
same applies to changing the type of a field, or changing the arguments that
a function takes. In all these situations dynamic languages won't complain.

With this project I aim to build a programming language that is a mix of
dynamic and static programming languages. Syntactically it will look and feel
like a dynamic language: concise and flexible. Structurally it will behave
like a strongly-typed static language. All types are known and understood at
compile-time. All runtime errors will be found at compile-time.\*

The syntax will be heavily inspired by modern ES6 JavaScript. The type system
will be heavily inspired by those found in functional programming languages
such as OCaml: union types, polymorphic types.


<small>
*Array out of bounds errors will be the only remaining runtime errors. I may
offer a special syntax for explicitly handling this error. However, I don't
want to make this special syntax mandatory.
</small>

## **Objectives**

1\. **Build a parser for my language.**

The syntax will be heavily inspired by modern ES6 JavaScript.

Syntax will include object destructuring:
```javascript
const { x, y } = myObject
```

As well as creating a new object by spreading an old one:
```javascript
const myNewObject = { ...myObject, z: 10 }
```

2\. **Build a type solver that uses Hindley-Milner type inference**

This will probably be the most difficult part of the project. Type annotations
are optional, in the spirit of dynamic programming. Global functions and
variables can be defined in any order.

Functions are by default polymorphic, calling them with different argument
types will lead to generating different versions of the same function.

```javascript
add(x, y) => x + y

const a = add(4, 5)     // Will be an integer
const b = add(4.2, 5.3) // Will be a floating point
```

Think of it as function templates in C++, or generics in Java, but instead
of being explicit it is implicit.

3\. **Build an interpreter that interprets byte code**

In order to experience the performance benefits found in statically typed
languages I'm going to have to generate some byte code to interpret.

4\. **Build a cross platform user interface that executes your code as you
write it**

Dynamic languages have REPLs, I believe I can do one better by making a fully
interactive code execution environment where you see the results of your code
alongside the code itself.

I also don't like the fact that static language compilers are usually big
black boxes where code goes in and executables come out. The GUI will allow
you to inspect the resulting byte code of your program and see exactly how
your high level programming is translated into low level operations.

5\. **Create a small standard library, which supports data processing and graphical user interfaces.**

A language is pointless without some libraries to interface with. If time
permits I'd love to make a GUI library that allows users to quickly build
interactive programs.

6\. **Analyse whether programming in the language I build is really as easy
as programming in a dynamic language.**

## **Methodology**

I will be building the project in C++, since it's incredibly fast, yet not too
low level (as in C) where I have to implement every detail.

1\. **The Parser**

For parsing I will be writing my own recursive-descent parser.

2\. **The Type Solver**

For type inference I will implement the Hindley-Milner "Algorithm W". I've
only ever read about Hindley-Milner, so it'll be quite challenging to fully
implement it and have it be robust as well.

Broadly speaking, the type solver will consist of several functions for
analysing AST nodes: `analyse_expression(e)` and `analyse_statement(e)`, and
one function for unification, `unify(a, b)`. The analyse functions inspect AST
nodes and make logical deductions about their types. The deductions are stored
in a type variable associated with the node. During the analysis, type
variables will also be unified together, to force them to be equal.

3\. **The Interpreter**

For the interpreter I will implement a byte code generator which takes my type
checked AST and spits out simple byte code that I can then interpret.

When deciding on a virtual machine and set of opcodes to go with I will have
to choose between a stack-based virtual machine or a register-based virtual
machine.

From what I've read, stack-based virtual machines have simpler instruction
sets since the operands are implicit: the `add_int` instruction doesn't need
to specify the register of the operands, since the instruction will just use
whatever is on the top of the stack. The equivalent register-based virtual
machine instruction has to specify all the operands explicitly:
`%3 = add_int %1 %2`.

Despite this disadvantage, I will probably go with a register-based virtual
machine in the end, for several reasons:

1. **Fewer instructions**  
   What was left out from my `add_int` example is that in the stack-based
   virtual machine the instruction must be preceded by two push instructions,
   and succeeded by one pop instruction.
2. **No swapping or duplicating necessary**  
   When operations get complicated on the stack, operands sometimes need to
   be swapped around or duplicated, which generally defeats the purpose of
   using a stack. More instructions will need to be written just to get the
   operands on the stack in the right order for an instruction to run
   properly.
3. **Closer to LLVM IR**  
   If time permits, it would be great to compile some of the code to actual
   machine code. The easiest way to get this to work would be to produce LLVM
   IR and get the LLVM back-end to generate the machine code. Assuming I don't
   want to build a secondary byte code generator that goes from AST to IR, I
   will want to build the IR directly from my byte code. If my virtual machine
   is register-based then there will be a clear 1-to-1 mapping onto IR.

4\. **The Cross Platform GUI**

In order to build a cross-platform GUI, I will learn to use Qt, which is a GUI
library written in C++ that is supported on many platforms. I will be building
the GUI as I go along instead of once the compiler is done, so that I get a
sense of interactivity from the start.

5\. **The Standard Library**

In order to interface with external libraries, calling a C function from
within the language (e.g. OpenGL), for example, I will include a special
syntax for describing functions that are defined externally.

```javascript
sin(x) => __foreign__("math.sin", T, T, T)
```

The `__foreign__` syntax has four arguments: (1) the external identifier name
of the foreign function, (2) any type variables which need to be synthesised
when type solving a call to `sin(x)`, (3) the argument type of the function,
(4) the return type of the function.

In the above example `sin()` is actually polymorphic. During byte code
generation a callback will be run from within the compiler that requests an
implementation for the function where `T = Int`, or where `T = Float`,
depending on what it is called with. During type solving, `sin("Hey")` will
also technically be valid. However, during byte code generation the callback
will return to the compiler with an error instead of an implementation.

**Testing**

I will select a hand full of typical JavaScript programs and port them to my
language to demonstrate the language works and that the resulting code as
user friendly.

## **Project Management**

**Project Timeline**

Gantt chart: should be object specific
Objectives listed and when you'll do them

Rows: objectives & deadlines
Columns: times

**Resources**

1. C++ documentation
2. Qt documentation
3. LLVM documentation
4. CS325 Compiler Design – Warwick University Course
5. Introduction to Type Inference – Video Lecture

**Risks**

Risks and how I manage them
- Illness, ...
- Loss of work, ...
- Stealing, ...

**Ethical Considerations**

Level 1: no ethical considerations to be made.

## **References**

1. C++ 
2.  
3.  
4.  
5. Introduction to Type Inference – Video Lecture  
   https://www.youtube.com/watch?v=il3gD7XMdmA

6. Hindley-Milner Algorithm W implementation in Python  
   https://github.com/rob-smallshire/hindley-milner-python