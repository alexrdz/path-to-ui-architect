---
title: "Glossary of Terms"
description: "A collection of terms and definitions related to programming, UI architecture, and design"
category: mindset
order: 1
tags: ["mindset", "terminology", "glossary"]
---

## Glossary of Terms

<details>
  <summary>
    <a name="orchestration" id="orchestration"></a> Orchestration
  </summary>

  > Orchestration is the coordination of multiple pieces of logic, data, or state into a meaningful flow.
  In a frontend app, orchestration usually involves:
  - Calling services (APIs)
  - Reacting to user input
  - Updating state
  - Handling loading, success, and error cases
  - Managing side effects (navigation, notifications, logging, etc)
  #### Why it’s called orchestration:
  I am huge music fan, so it helps me think of orchestration as an actual orchestra. Each instrument (API, store, component) does its job independently. But the conductor coordinates when and how each one plays to produce a meaningful whole.

  The orchestration layer is that conductor.

  #### What orchestration isn't:
  Orchestration is not business logic or pure rendering logic. It doesn’t own the rules, and it doesn’t draw anything. It just coordinates what happens when.

  #### In summary
  > "Orchestration" = logic that coordinates events, side effects, and flows, usually wrapped in a custom hook or service.
</details>

<details>
  <summary>
    <a name="state-machine" id="state-machine"></a> State Machine
  </summary>

  > A state machine is a model where your app can only be in one state at a time, and you define the valid _transitions_ between those states.

  #### Why it’s called a state machine:
  As I understand it, `state machine` is a computer science term that, in terms of UI, applies to buttons, modals, forms, etc. So if we think in terms of UI, a state machine tells us:
- you can only be in one state at a time (e.g. `idle`, `loading`, `success`, `error`)
- you can only go from one state to another (e.g. `idle -> loading` NOT `success -> loading`)

State machines allow the creation of predictable, testable logic. It removes any ambiguity by saying your component or UI can't be in both `success` and `error` at the same time. And if it is, then you know something is wrong.

#### In summary
> State machine is simply a way of modeling your app state where only valid transitions between _exclusive_ states are allowed.
</details>

<details>
  <summary>
    <a name="policy" id="policy"></a> Policy
  </summary>

  > A policy in software architecture is a rule or decision-making strategy that defines or governs how something should behave under certain conditions. It defines how a module/script/component should interact with the outside world.

  It is my understanding that policies don't do any work. They just decide what work should be done based on a given input.

  A simple example would be a "retry policy" or how many times a function should be retried before giving up. Or should it even retry? In this case, I could create a `shouldRetry` function that takes input (e.g. `error`, `attempts`) and returns a boolean based on the logic I want to apply. `shouldRetry` will never attempt to retry anything. It will only decide whether or not to retry based on the input.

  #### In summary
  > Policy is simply a set of rules that define or influence how UI logic should be executed.
</details>

### TODO or WIPS
- Service → function/module that interacts with infrastructure (APIs, storage)
- Presenter → function that transforms raw data for the UI
- Controller/Flow → hook that handles orchestration and coordination
