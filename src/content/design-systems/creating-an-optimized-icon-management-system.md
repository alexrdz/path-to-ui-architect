---
title: 'Creating an Optimized Icon Management System'
description: 'Creating an optimized icon management system'
category: 'design-systems'
order: 1
tags: ['icon-management', 'svg-sprites', 'vuejs']
---

As I dive deeper into building out our design system I keep running into some really fun problems to solve. Recently, icons became one of these exciting challenges. This was my first major architectural decision. So I put quite a bit of effort into this. But first, a little background.

Our team relied on Fort Awesome to generate our icon font. It served us well, but we knew we wanted a different direction going forward. And with the recent announcement that Fort Awesome is shutting down, we needed to re-evaluate our icon strategy immediately. We needed to find a new approach—one that was robust, scalable, and maintainable for the future of our design system.

This post is about that process. I'll walk you through the two main solutions we considered: embedding SVGs directly into CSS versus using SVG Sprites. We'll explore the pros and cons of each, and I'll share why we ultimately decided on SVG Sprites. I'll also show you an example of how I implemented this chosen approach in our Vue.js environment and discuss why I believe it's a truly effective way to manage icons within our design system.

Admittedly, I had never considered icon management for two reasons:

1. in my personal projects, I've never needed more than 5 icons. So creating single purpose icon components like `IconSkull.astro` or `IconPlay.tsx` or even `icon_pause.php` was quick and easy.
2. in every job I've had, an icon solution was already in place.

But the issue came to the forefront quite quickly. Our specific situation involved Fort Awesome, which had been the established icon solution since I joined the company. While it fulfilled its basic purpose for a considerable time, there was an understanding within the team that we might benefit from a different, more integrated strategy in the long run. But it never became a priority. The impending shutdown of Fort Awesome served as the necessary catalyst, thankfully, accelerating our timeline to investigate and implement a more robust, future-proof approach tailored to our Vue.js environment and design system goals.

 So I needed to understand what our needs and considerations are before I could agree with or even think about a solution. The top considerations we had were:

- **Performance:** Large icon sets, whether delivered as fonts or numerous individual files, can negatively impact load times and rendering performance.
- **Accessibility:** Ensuring icons are correctly interpreted by assistive technologies requires careful implementation (e.g., appropriate ARIA attributes), which can be easily overlooked.
- **Scalability:** As a design system grows, the icon library must scale efficiently. Adding, updating, or removing icons should be a streamlined process, not a bottleneck; automated system.
- **Maintainability:** The chosen icon strategy heavily influences long-term maintenance. Complex or tightly-coupled implementations can make updates cumbersome and error-prone.

In discussions, we offered a couple of ideas to the team. The two options or proposals were a CSS-based approach with embedded SVGs in the CSS, and SVG sprites. Instinctively, I didn't love the idea of the CSS-based approach. But it was instinctual, I had no evidence. Thankfully, we have our aforementioned considerations to apply to each. Here is where I landed:

### CSS-Based approach

**Performance**

| Pros                                                         | Cons                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - CSS is cached by browsers - efficient<br />-  no extra HTTP requests<br />- simple and easy to implement | - very large CSS files<br />- can possibly affect FCP && LCP / render blocking<br />- less control over SVGs if they are bg images |

I'm not sure how much control over the SVGs we'll need but would be nice to have the option. Time to first Paint could be an issue depending on actual performance, but something to keep in mind. I'm leaning towards the **Cons** winning here.



**Accessibility**

| Pros                  | Cons                                                         |
| --------------------- | ------------------------------------------------------------ |
| - simple to implement | - bg images are not accessible<br />- possibly require extra markup with proper ARIA attributes <br />- no semantic meaning for assistive technologies |

Looks like the **Cons** win again.  You can read more about accessibility [following this link](https://www.24a11y.com/2017/svg-icon-fonts-accessibility-case-study/) and [this link at Font Awesome about icons used as semantic elements](https://docs.fontawesome.com/web/dig-deeper/accessibility).



**Scalability**

| Pros                         | Cons                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| - simple and familiar syntax | - adding new icons is a chore<br />- automation and writing to css file can be tricky<br />- difficult to manage as icon library/set grows |

The **Cons** have it.



**Maintainability**

| Pros                                                         | Cons                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - no external dependencies <br />-  no extra packages to consider / low overhead <br /> | - painful to update icons in CSS<br />- no versioning<br />- limited control over icon properties - would need icon to be replaced |

Again, not sure how much control we'd need but would be nice to have as an option. Scalability and maintainability issues are definitely not winning me over.



### SVG Sprites Approach

**Performance**

| Pros                                                         | Cons                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - single HTTP request<br />- inlined in initial HTML <br />- good browser caching | - large initial load<br />- no "lazy loading" - all icons loaded on first render no matter if used or not |

So far so good. I was concerned with the initial page load thinking that our icon set of ~120 icons could add a significant lag to rendering. So I did the most un-scientific experiment to get an initial idea of what I may be dealing with. I went to [the longest article on wikipedia](https://en.wikipedia.org/wiki/Plug-in_electric_vehicle) and copied the source into a `.txt ` file and looked at the document's info. It weighed in at a whopping 750Kb.  Well, that was a waste of time and told me nothing. So I then replaced the contents of the text file with 400 svg icons. Now we're at 281Kb which is a bit sizable. But I'm not sure we'll ever have a need for 400 icons, but you never know. So how does this compare to actual metrics? At last check, our icon font weighs in at 167Kb - but we load a `woff` and a `woff2` font both weighing the same for a total of 334KB. **Cons** are not deal breakers. The **Pros** have it.



**Accessibility**

| Pros                                                         | Cons                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| - I=icons are in the DOM - should be screen reader friendly<br />-  easy to implement proper title, description and ARIA attrs<br />- simple and easy to implement | - requires proper implementation of ARIA attributes <br /> |

In comparison with the CSS approach, this is arguably better.



**Scalability**

| Pros                                                         | Cons                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - adding new icons is easier via updating the sprite<br />-  an automation script (python or node) can generate the sprite from individual SVGS - this also fits our workflow as our designer generates individual SVGS from Figma<br />- designer to developer hand-off is automated | - requires initial tooling to be written<br />- architecture can be more complex than the CSS solution |

I like the idea of automated hand-off, and we could probably add the sprite generation into our build script or as part of the design system's publishing workflow. But I think more consideration and questioning is needed in terms of scalability. Are we expecting to handle more than just icons? Are we considering a limit to how many icons we should handle for our design system? How do we see the icon system growing and what impact would that have on our automation scripts? Will updating and scaling the scripts be trivial, tricky? This is a tie for me. I like the idea a lot but there are too many unknowns.



**Maintainability**

| Pros                                                         | Cons                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - icon design and SVG generation handled by designer in their tool of preference (Figma)<br />- individual SVG files makes for easy maintenance or even individually versioned<br />- simple and easy to add/edit/remove icons<br />- allows for better component-based approach in Vue (or any framework)<br />- supports dynamic styling, animating | - potential for over-engineering<br />- requires more understanding of the icon system than switching classes <br />- requires extensive and updated documentation to ensure proper maintenance is provided |

I'm going to hand it to the **Pros** here. I'm weary of the potential for over-engineering but goig in with that might help us all keep each other in check and ensure we are keeping it as simple and easy as possible. Some complexity may be required but we can assess that through spikes and discussions. And it could be used as a good example or model of how to write more modular and scalable systems and components.

I'm sure it's quite evident I have a bias for the SVG Sprite approach. And yes, that was my proposal. But how would I implement this? Let's give it a shot.

### Implementing the SVG Sprite Solution in Vue

Before writing any code, I set out some clear goals for what this new icon system needed to achieve or what my constraints are:

- **Simple API:** Using an icon should be straightforward for any developer. The component's interface needed to be intuitive.
- **Maintainability & Scalability:** The system had to be easy to manage and capable of growing alongside our design system without becoming unwieldy. We needed an automated way to handle icon updates.
- **Developer-Friendly & Robust:** It needed to be approachable, even for junior developers, but without cutting corners. The implementation should follow Vue best practices or "idiomatic and intelligent."

So let's start with our base icon component. I think I'll call it `BaseIcon.vue` What is our API going to look like? If I want to use this, what makes sense for me. Maybe something like

`<BaseIcon name="icon-star-hollow" size="xs" variant="success" />`

That looks pretty good to me. And it's a component, so we can add as many props as we want - within reason of course. At this point, any more props and I think we can group some into a `config` or `options` object prop.

So now I've identified three (3) props, `name`, `size`, and `variant`. I can see from here that I can probably use at least 2 union types or Enums and a string. Perfect, this gives me a good place to start writing out my component with its props, not thinking about state, or any events or methods at the moment. Ideally, we won't have any in this component. One of our goals is to keep simple and easy to manage.

**Writing out our component**

```vue
<template>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

// setup union types for `size` and `variant`
  type IconSize = 'xs' | 's' | 'm' | 'l' | 'xl';
  type IconVariant = 'info' | 'danger' | 'success' | 'warning';

// setup the props interface
  interface Props {
    name: string; // required, "icon-star"
    size?: IconSize;
    variant?: IconVariant;
    className?: string;
    attrs?: Record<string, any>;
  }

// setup props with defaults
  const props = withDefaults(defineProps<Props>(), {
    size: 'm',
    variant: 'info',
    className: '',
    attrs: () => ({}),
  });

// create a map for sizes - mapping type to value
  const sizeMap: Record<IconSize, number> = {
    xs: 16,
    s: 24,
    m: 32,
    l: 48,
    xl: 64,
  };

// map for variants - mapping type to value
  const variantMap: Record<IconVariant, string> = {
    info: 'info',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
  };

// computed value to re-render the component when size prop changes
  const computedSize = computed<number>(() => {
    return sizeMap[props.size];
  });

// computed value to re-render the component when variant prop changes
  const computedVariant = computed<string>(() => {
    return variantMap[props.variant];
  });


  // prop name to use in our template file - svg sprite
  const iconHref = computed(() => `#${props.name}`);

  // concat class names, always include `icon` class
  const iconClass = computed(() =>
    ['icon', props.className, computedVariant.value].filter(Boolean)
  );


</script>
```

Ok, that's a lot of code for three (3) props isn't it? While it may seem like a lot, most of it is config. Let's start with the first two types. These are just safeguards to limit the prop values we can use with this component.

Then we have our props interface declaration. This ensures we have the proper types attached to each prop.

Computed values are the actual value that is derived from the props. Basically, making these computed allows them to be tracked by Vue's reactivity system allowing re-renders of the component when the dependency values in our computed properties change.

Now that we've addressed our props and added types to our component, it's time to write our icon markup. Remembering that we are using SVG sprites, this is where they shine when mixed with component architecture:

```vue
<template>
  <svg
    :class="iconClass"
    :width="computedSize"
    :height="computedSize"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    v-bind="props.attrs"
  >
    <use :href="iconHref" />
  </svg>
</template>
```

That's it. We compute the width and height with our props, same for color via the semantic `variant` prop. And last, we accept any valid HTML attributes.

But what exactly is this `<use :href="iconHref" />` doing? That's the magic of sprites at work. See, this will only work with an svg structure like this:

```html
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">

  <symbol id="icon-facebook" viewBox="0 0 24 24"><path
    d="M24 1.3v21.3c0 .7-.6 1.3-1.3 1.3h-6.1v-9.3h3.1l.5-3.6h-3.6v-2.2c0-1.1.3-1.8 1.8-1.8h1.9v-3.2c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.7h-3.1v3.6h3.1v9.2h-11.5c-.7 0-1.3-.6-1.3-1.3v-21.4c0-.7.6-1.3 1.3-1.3h21.3c.8 0 1.4.6 1.4 1.3z"
  /></symbol>

  <symbol id="icon-instagram" viewBox="0 0 300 300"><circle cx="10" cy="10" r="3.3" />
    <path d="M38.52.012h222.978C282.682.012 300 17.336 300 38.52v222.978c0 21.178-17.318 38.49-38.502 38.49H38.52c-21.184 0-38.52-17.313-38.52-38.49V38.52C0 17.336 17.336.012 38.52.012zm180.026 33.317c-7.438 0-13.505 6.091-13.505 13.525v32.314c0 7.437 6.067 13.514 13.505 13.514h33.903c7.426 0 13.506-6.077 13.506-13.514V46.854c0-7.434-6.08-13.525-13.506-13.525h-33.903zm47.538 93.539h-26.396a87.715 87.715 0 0 1 3.86 25.759c0 49.882-41.766 90.34-93.266 90.34-51.487 0-93.254-40.458-93.254-90.34 0-8.963 1.37-17.584 3.861-25.759H33.35V253.6c0 6.563 5.359 11.902 11.916 11.902h208.907c6.563 0 11.911-5.339 11.911-11.902V126.868zm-115.801-35.89c-33.26 0-60.24 26.128-60.24 58.388 0 32.227 26.98 58.375 60.24 58.375 33.278 0 60.259-26.148 60.259-58.375 0-32.261-26.981-58.388-60.259-58.388z"/>
  </symbol>

  <symbol id="icon-twitter" viewBox="0 0 24 24"><path
    d="M21.5 7.6v.6c0 6.6-5 14.1-14 14.1-2.8 0-5.4-.8-7.6-2.2l1.2.1c2.3 0 4.4-.8 6.1-2.1-2.2 0-4-1.5-4.6-3.4.3.1.6.1.9.1.5 0 .9-.1 1.3-.2-2.1-.6-3.8-2.6-3.8-5 .7.4 1.4.6 2.2.6-1.3-.9-2.2-2.4-2.2-4.1 0-.9.2-1.8.7-2.5 2.4 3 6.1 5 10.2 5.2-.1-.4-.1-.7-.1-1.1 0-2.7 2.2-5 4.9-5 1.4 0 2.7.6 3.6 1.6 1-.3 2.1-.7 3-1.3-.4 1.2-1.1 2.1-2.2 2.7 1-.1 1.9-.4 2.8-.8-.6 1.1-1.4 2-2.4 2.7z"
  /></symbol>

</svg>

```

This SVG would be injected or written into the DOM. In our case, this would be added to the `index.html` file that hosts our root element for our app. As you can see, the main `svg` opening tag has an inline style of `display: none` which prevents it from appearing visually in our DOM. It will not take up any space, but we can still interact with it in the DOM. This is perfect since we will only need to access the paths for the icons used in a component.

So when we use this component in our app, our usage is pretty much what we started with:

`<BaseIcon name="icon-instagram" size="l" variant="info" data-test="test" />`

And this is what is rendered in our DOM:
```html
<svg data-v-92245bab="" data-v-7a7a37b1="" class="icon info" width="48" height="48" data-test="test" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
  <use data-v-92245bab="" href="#icon-instagram"></use>
</svg>
```

Notice the `data-` attribute? It does nothing here but I wanted to illustrate how we can pass valid attributes directly to our Svg Element. And as I mentioned, our SVG sprite can be injected or written into the DOM. Which brings us to our last step:

### Injecting our sprite to our DOM

Our designer currently exports SVGs into their own files inside a particular directory. We'll need an intermediary step to generate the sprite file, which is out of scope for this post. Ultimately, we will end up with a `sprite.svg` file in our `public` directory of our app. So that let's us access it programmatically and append it to our DOM using the power of composables.

**useSvgLoader.ts**

Again, assessing what it is I need, I can write out some steps and constraints for the composable.

- Append sprite contents to the DOM (preferably outside the root element)
- Prevent duplicate loading of the sprite
- Provide loading and error states
- Load when the app mounts

I'm adding comments in some parts of the code but otherwise, I think this pretty self explanatory:

```ts
import { ref, onMounted } from 'vue';

// define state - singleton pattern to load once
const isLoaded = ref(false);
const isLoading = ref(false);
const error = ref<Error | null>(null);

const SPRITE_CONTAINER_ID = 'svg-sprite-container';

export default function useSvgLoader() {
  const loadSvgSprite = async () => {
    // check to see if already loaded OR exists in DOM, or is currently loading
    if (
      isLoaded.value ||
      document.getElementById(SPRITE_CONTAINER_ID) ||
      isLoading.value
    ) {
      isLoaded.value = true;
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch('/sprite.svg');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch SVG sprite: ${response.status} ${response.statusText}`
        );
      }
      const svgText = await response.text();

      const svgRegex = /^<svg[\s>]/i;
      if (!svgText || !svgRegex.test(svgText.trimStart())) {
        throw new Error('Fetched sprite content seems invalid or malformed.');
      }

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = svgText;
      const svgElement = tempDiv.firstElementChild as SVGElement | null;

      if (svgElement && svgElement.tagName.toLowerCase() === 'svg') {
        svgElement.setAttribute('id', SPRITE_CONTAINER_ID);
        svgElement.setAttribute('aria-hidden', 'true');
        svgElement.style.position = 'absolute';
        svgElement.style.width = '0';
        svgElement.style.height = '0';
        svgElement.style.overflow = 'hidden';

        // ensure sprite container doesn't exist before appending
        if (!document.getElementById(SPRITE_CONTAINER_ID)) {
          document.body.appendChild(svgElement);
        } else {
          // console.log('SVG sprite already present.');
          // we can probably remove this `else` branch, but good to keep in case we need to debug or modify behavior
        }
        isLoaded.value = true;
      } else {
        throw new Error('Could not extract SVG element from fetched content.');
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err : new Error(String(err));
      console.error('Failed to load SVG sprite:', error.value);
    } finally {
      isLoading.value = false;
    }
  };

  // onMounted will run when the component using the composable mounts
  // this should be the main or main layout component component
  onMounted(() => {
    loadSvgSprite();
  });

  return { isLoading, isLoaded, error };
}

```

I used a singleton pattern for loading and managing an SVG sprite container. The composable ensures the sprite is loaded exactly once when the component mounts, with built-in loading and error states. The composable handles fetching the sprite, validating its content, and appending it to the DOM with proper accessibility attributes.

You may be wondering about this part here: `document.body.appendChild(svgElement);` as Vue really frowns on this. In this case, however, we are appending directly to the `body` element, which is outside our app's root element, and therefore not under its jurisdiction or part of the Shadow DOM.

Another point to note is that when adding the aria attributes to the sprite, it assumes the icons are decorative. If an icon needs to convey meaning independently, consumers could pass an `aria-label` or any other valid HTML attributes like normal (see the example usage above).

And last, the composable should be invoked at the top layer of the app, in our case, it's the main layout component. This ensures the sprite is loaded early in the application lifecycle.

I have a working version on [StackBlitz at this link](https://stackblitz.com/edit/vitejs-vite-slgd3dbq?file=src%2Fcomposables%2FuseSvgLoader.ts) should you want to see it in action.

### Conclusion

Navigating the transition away from Fort Awesome forced us to deeply consider the fundamentals of icon management within our design system. What started as a reaction to a tool's shutdown became an opportunity to build a more robust, performant, and accessible solution tailored to our specific needs in a Vue.js environment.

As detailed, we weighed the pros and cons of embedding SVGs in CSS versus leveraging SVG sprites. While the CSS approach offered initial simplicity, the SVG sprite method ultimately won out due to its significant advantages in caching performance, accessibility compliance, styling flexibility, and long-term scalability and maintainability – aligning perfectly with the goals I set out. The implementation, centered around the `BaseIcon` component and the `useSvgLoader` composable, provides a developer-friendly API while handling the complexities of sprite injection efficiently.

This process was a significant learning experience for me, marking a key step in contributing to our design system's architecture. This wasn’t just an icon migration — it was a turning point in how we think about design systems, developer experience, and sustainable architecture - a first for our team. SVG sprites gave us a scalable, accessible, and elegant foundation — and building it helped me grow as a UI architect.

What are your experiences with icon management? Have you used SVG sprites, or do you prefer a different method? I'd love to hear your thoughts, questions, or alternative solutions. email me at drinkhorchata [at] duck.com or bluesky @alexrdz.bsky.social



---
#### Abrazado a ti by Kevin Kaarl
<lite-youtube videoid="6tpTJIkbRTA" playlabel="Play: Kevin Kaarl"></lite-youtube>
