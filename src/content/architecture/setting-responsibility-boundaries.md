---
title: 'Setting Responsibility Boundaries'
description: 'Using function naming to align with code responsibility'
category: "architecture"
order: 1
tags: ["component-design", "code-responsibility", "single-responsibility"]
---

## Setting Responsibility Boundaries

### Why is this important?

Let's talk about setting responsibility boundaries for our code. What exactly does this mean? Well, I think looking at some code will help. Let's mix things up a bit... for this example, we'll take a look at a React component.

```tsx
import { useState } from 'react'
import { User } from './types'

interface CommentComposerProps {
  user: User | null
}

export function CommentComposer({ user }: CommentComposerProps) {
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Failed to post comment')
      setComment('')
      setSuccess(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <p>Please log in to comment.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !comment}>
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Posted!</p>}
    </form>
  )
}
```
ok, so this is what i have gathered. looking at the component in its initial state, this looks like a fairly common way of writing components. i have written plenty of components like this. so to the junior dev eye, this makes sense and there doesn't seem to be any issues - and i think that's mainly because it works.

But let's break down why and how this component breaks the single responsibility principle. And how we can fix this.

We'll start with understanding what the component is meant to do and what it is doing.


so... it looks like the handleSubmit function is doing some of the [orchestration](/mindset/glossary#orchestration). however, it should only concern itself with handling the submission. i think we can extract the setState functions (setLoading, setError, setSuccess). and while its job is to handle submissions, it should do so by proxy meaning it should call a service, not handle the fetch itself. and because it is named handleSubmit it probably shouldn't handle the setComment or succes, etc. either. the return or rendering portion seems fine to me.


"Because it's called handleSubmit, it shouldn't manage comment reset or setSuccess."
That’s a fantastic naming/code alignment insight. You’re thinking in contracts now.

If it’s called handleSubmit, it should:

Accept the submission intent

Delegate the actual logic

Surface the result (via promise or state)

Architectural move: pull all status-related state (loading, error, success) into a controller hook, and let the component just reflect it.

Success state + comment reset are tightly coupled. setComment('') lives in handleSubmit, right next to setSuccess(true).
But those are two different responsibilities:
- One is about form lifecycle.
- One is about user feedback.
Architectural move: centralize “what happens after a successful submission” into a single transition in a state machine or controller. we can then avoid issues or perplexing cases like:
- “Oops, forgot to reset the field”
- “Wait, now it clears on error too?”
- “Why does it say ‘Posted!’ even though the field is still full?”

The component assumes too much about its world. This component assumes
- fetch('/api/comments') is how you post a comment
- A successful response always looks the same
- Failure means show a red `<p>`

Architectural move: extract those assumptions into composable _policies_:
- useCommentService
- useNotification
- useCommentFlow
Now we can let those policies handle the details of the world, and the component just reflects the state - in other words, let the UI component only render - not think or assume.
