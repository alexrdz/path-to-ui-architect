---
title: "Testing Fundamentals"
description: "Introduction to frontend testing practices"
category: "testing"
order: 1
tags: ["testing", "fundamentals"]
---

testing is the one thing i realllllly dislike about ui/web development. never been a fan. BUT... i think it there are 2 main reasons for this. 1. i never really fully understood testing, especially setup. but 2. i think it is because all the places i have had to do unit tests - it has never been done right. and most of it has to do with bad component/app architecture. so having stated that, let's dive in! i am hoping to learn this finally and i think you are the perfect resource for this endeavor.

### Why testing has sucked

1. Bad Architecture — If everything is tangled up in one big component, testing is painful. You can’t test in isolation, can’t mock things cleanly, and end up writing brittle spaghetti tests.

2. Unclear Purpose — Most teams never teach what you're supposed to test, or why. Just “write tests,” and that’s it.

Saying, "we want to get to 100% coverage" or boasting "we have 90% coverage" doesn't mean anything if our tests are brittle, our architecture is bad, or our setup is a mess. Not to mention bad tests that don't help us catch bugs or prevent regressions.

One thing that gets left out of the conversation, at least for me, is that testing starts before you write a test. It begins with [building features with clear boundaries](/blog/setting-responsible-boundaries). When you build a feature with clear boundaries, you're setting up a foundation for testing.
