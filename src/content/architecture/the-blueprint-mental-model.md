---
title: "The Blueprint Mental Model"
description: "An blueprint for component/module architecture"
category: "architecture"
order: 1
tags: ["architecture", "fundamentals", "blueprint"]
---

## The Blueprint Mental Model
I am learning to think about components and modules in terms of a blueprint. It is important to understand the basic structure of code before I start to think about the functionality and how I will achieve the minimum requirements of the expected behavior. Here is a basic blueprint I am trying to follow:

### The 3-Layer UI Architecture

| Layer          | Responsibility |
|----------------|----------------|
| **UI Layer** (`View`) | Rendering only — stateless, pure inputs/outputs |
| **Flow Layer** (`Controller`) | Orchestrates behavior — holds local state, reacts to events, calls services |
| **Service Layer** (`Infrastructure`) | Talks to the outside world — APIs, storage, time, 3rd-party systems |

### Using this as a refactoring plan

When I come across a component that looks messy or just plain large, I ask myself:

1. What parts of this component are just UI?

  - are there child components or rendering elements like buttons, inputs, or other UI elements?
  - is there `state`?
  - any API calls?

2. What parts of this are logic? What parts are state transitions?

  - this would include things like loading, error or success states
  - resetting state after a successful action
  - handling form submissions or other user inputs

3. What parts of this are related to infrastructure?

  - `fetch`, `localStorage` et al. - asnyc operations are usually a giveaway here
  - are we using browser APIs? e.g. `window`, `document`, timers

When dealing with more complex components or apps, you may need to add additional layers:

| Layer          | Responsibility |
|----------------|----------------|
| **Policy Layer** | Business rules (validation, access control, constraints) |
| **Presenter Layer** | Data transformation from raw to display |
| **State Layer** | Global app state (context, store, Zustand, etc) |

### Bonus!

One thing to keep in mind is that this can be applied to software in general. This is not a UI-specific or framework-specific approach.

```
UI = Just render
Flow = Coordinates the logic
Service = Talks to outside systems
Policy = Decides rules
Presenter = Transforms data
State = App-wide data
```

I am trying my best to keep this handy and apply when i need to:

- refactor a huge component, composable, etc.
- add a new feature (sketching out the 3 layers first)
- migrate from one framework to another, vanilla js to a framework or vice versa (structure stays the same!)
- need to debug a mess (figure out what responsibility lives where)
- do interview prep (talk like an javascript dev, not a framework user)
