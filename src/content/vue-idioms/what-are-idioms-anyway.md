---
title: "What are Idioms Anyway?"
category: vue-idioms
order: 1
description: "A brief overview of what Idioms are and why they matter"
tags: [vue-idioms, vuejs]
---

## **What are "Vue idioms"?**

Think of **idioms** as “the way things are done” in Vue — patterns, conventions, and habits that **feel natural** and are **widely accepted** by the Vue community and core team.

They’re not rules — they’re *the Vue way*.

------

### **Idiom: Use `v-model` for two-way binding**

#### Not idiomatic:

```vue
<input :value="form.name" @input="form.name = $event.target.value" />
```

#### Idiomatic Vue:

```vue
<input v-model="form.name" />
```

**Why?**

- Cleaner syntax
- Built-in reactivity
- Easier maintenance

------

### **Idiom: Use `defineProps()` + `defineEmits()` in `<script setup>`**

#### Not idiomatic:

```ts
export default {
  props: { ... },
  emits: [ ... ],
}
```

#### Idiomatic Vue 3:

```ts
const props = defineProps<{ ... }>()
const emit = defineEmits<[ ... ]>()
```

**Why?**

- Leverages `<script setup>` for zero-boilerplate
- Better TypeScript inference
- Cleaner and faster

------

### **Idiom: Prefer `ref()` / `computed()` over `data()` and `methods`**

#### Not idiomatic in Vue 3:

```ts
data() {
  return {
    count: 0,
  }
},
methods: {
  increment() {
    this.count++
  }
}
```

#### Idiomatic:

```ts
const count = ref(0)
function increment() {
  count.value++
}
```

**Why?**

- Composition API is now the preferred paradigm in Vue 3
- Better for reuse and modularity
- No weird `this` context

------

### **Idiom: Template refs instead of querySelector**

#### Not idiomatic:

```ts
const el = document.querySelector('.thing')
```

#### Idiomatic:

```vue
<div ref="thingRef"></div>
```

```ts
const thingRef = ref<HTMLElement | null>(null)
```

**Why?**

- Tied to Vue's reactivity system
- Safe access (especially with SSR)
- Avoids manual DOM queries

------

### **Idiom: Use composables for logic, not giant components**

------

## TL;DR of Vue Idioms

| Principle              | Idiomatic Vue 3                              |
| ---------------------- | -------------------------------------------- |
| Data binding           | `v-model`, `ref()`, `computed()`             |
| Composition            | `<script setup>`, `defineProps()`            |
| Logic reuse            | `useMyComposable()`                          |
| Template ref access    | `ref="el"` + `const el = ref()`              |
| Reactive state         | Use `ref()`/`reactive()` instead of `data()` |
| Separation of concerns | Business logic in composables                |
