---
name: lottie
description: Embedding Lottie animations in Picus.
metadata:
  category: Animation
---

# Using Lottie Animations in Picus

## Prerequisites

First, the @picus/lottie package needs to be installed.  
If it is not, use the following command:

```bash
npx picus add @picus/lottie # If project uses npm
bunx picus add @picus/lottie # If project uses bun
yarn picus add @picus/lottie # If project uses yarn
pnpm exec picus add @picus/lottie # If project uses pnpm
```

## Displaying a Lottie file

To import a Lottie animation:

- Fetch the Lottie asset
- Wrap the loading process in `delayRender()` and `continueRender()`
- Save the animation data in a state
- Render the Lottie animation using the `Lottie` component from the `@picus/lottie` package

```tsx
import { Lottie, LottieAnimationData } from "@picus/lottie";
import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "picus";

export const MyAnimation = () => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));

  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch("https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json")
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} />;
};
```

## Styling and animating

Lottie supports the `style` prop to allow styles and animations:

```tsx
return (
  <Lottie animationData={animationData} style={{ width: 400, height: 400 }} />
);
```
