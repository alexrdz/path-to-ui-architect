---
title: "UI Architecture Checklist"
description: "A checklist for UI architecture"
category: "architecture"
order: 1
tags: ["architecture", "fundamentals", "ui"]
---

## UI Architecture Checklist

This is a sort of continuation of the [The Blueprint Mental Model](/architecture/the-blueprint-mental-model). This is how I would apply the blueprint.

### 1. Deconstruct the Current Code

- [ ] Is this one file/component doing multiple jobs?
- [ ] Is there state, side effects, and rendering all tangled together?
- [ ] Are there “magic” imports (services, helpers, utils) mixed into UI code?

> **Goal**: Understand *how many concerns* live here

---

### 2. Extract the Pure UI Layer

- [ ] Move all rendering into a pure, dumb component
- [ ] Accept props for inputs, handlers, and UI flags (`loading`, `error`, etc)
- [ ] Emit events via callbacks — **don’t handle side effects** here
- [ ] Avoid importing any business logic or services into this file

> **Goal**: Make a pure visual component that renders based on props only

### 3. Create the Flow / Controller Layer

- [ ] Move all `useState`, `useEffect`, store actions, `refs`, etc. and logic here
- [ ] Coordinate state transitions and side effects (orchestration)
- [ ] Interact with services — never directly in the UI layer
- [ ] Handle form resets, submission logic, and flag setting here
- [ ] Return a clean interface to the UI (data, flags, event handlers)

> **Goal**: Orchestrate behavior with composable logic in a hook/module/composable

---

### 4. Isolate the Service Layer

- [ ] Create service functions for anything external: APIs, storage, cookies, timers
- [ ] Abstract `fetch`, `axios`, `localStorage`, etc
- [ ] Return *clean data* or throw predictable errors
- [ ] No UI logic or framework imports here

> **Goal**: Keep infrastructure access testable, reusable, and framework-free

---

### 5. Add Optional Layers (when needed)

#### Policy Layer

- [ ] Extract decision logic like validation, access rules, limits
- [ ] Functions like: `shouldAllowSubmit()`, `getErrorMessage()`
- [ ] No side effects — *only return booleans or values*

#### Presenter Layer

- [ ] Transform raw data into display-ready format
- [ ] Avoid rendering logic in Flow or Service layers
- [ ] Good for dates, currency, name formatting, etc

#### State Layer

- [ ] If global/shared state is needed, use context, store, or state manager (Zustand, Pinia, Redux, etc)
- [ ] Avoid directly mutating or reading global state in the view — inject it via Flow/controller

---

### 6. Reconnect the Pieces

- [ ] Hook up the UI layer to the Flow/controller
- [ ] UI receives props only
- [ ] Controller wires up state + handlers
- [ ] Controller calls the service
- [ ] Service handles infra and returns data

> **Goal**: A clean, traceable, maintainable feature

---

### 7. Sanity Check

- [ ] Can I test the service without a browser or React?
- [ ] Can I test the flow without rendering anything?
- [ ] Can I test the UI with fake props?
- [ ] Can I reuse the service logic in another feature?
- [ ] Can I swap out the UI component and keep the flow the same?
- [ ] Would a junior dev *immediately* understand what each file is responsible for?

> **If all of these are YES, you’ve done a great job. Pat yourself on the back.**

---

### BONUS: Naming Convention Template (optional, but handy)

| Layer        | Suggested Name           |
|--------------|---------------------------|
| UI           | `FeatureForm`, `XView`    |
| Flow         | `useFeatureFlow`, `useX`  |
| Service      | `featureService.ts`       |
| Policy       | `featurePolicy.ts`        |
| Presenter    | `featurePresenter.ts`     |
| State        | `useFeatureStore` / `context` |

Use your own flavor, but keep it **predictable and intentional**.

---

### To Wrap Up

This checklist gives me **repeatable, transferable thinking** that applies in:

- Vue
- React
- Angular
- Svelte
- Web Components
- Vanilla JS
- Even backends if you are fullstack (Next.js, Nuxt.js, etc)

This is no longer writing components, this is how to start **thinking in and constructing systems**.
