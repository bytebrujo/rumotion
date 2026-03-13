---
name: gif
description: Displaying GIFs, APNG, AVIF and WebP in Picus
metadata:
  tags: gif, animation, images, animated, apng, avif, webp
---

# Using Animated images in Picus

## Basic usage

Use `<AnimatedImage>` to display a GIF, APNG, AVIF or WebP image synchronized with Picus's timeline:

```tsx
import { AnimatedImage, staticFile } from "picus";

export const MyComposition = () => {
  return (
    <AnimatedImage src={staticFile("animation.gif")} width={500} height={500} />
  );
};
```

Remote URLs are also supported (must have CORS enabled):

```tsx
<AnimatedImage
  src="https://example.com/animation.gif"
  width={500}
  height={500}
/>
```

## Sizing and fit

Control how the image fills its container with the `fit` prop:

```tsx
// Stretch to fill (default)
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="fill" />

// Maintain aspect ratio, fit inside container
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="contain" />

// Fill container, crop if needed
<AnimatedImage src={staticFile("animation.gif")} width={500} height={300} fit="cover" />
```

## Playback speed

Use `playbackRate` to control the animation speed:

```tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={2} /> {/* 2x speed */}
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={0.5} /> {/* Half speed */}
```

## Looping behavior

Control what happens when the animation finishes:

```tsx
// Loop indefinitely (default)
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="loop" />

// Play once, show final frame
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="pause-after-finish" />

// Play once, then clear canvas
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="clear-after-finish" />
```

## Styling

Use the `style` prop for additional CSS (use `width` and `height` props for sizing):

```tsx
<AnimatedImage
  src={staticFile("animation.gif")}
  width={500}
  height={500}
  style={{
    borderRadius: 20,
    position: "absolute",
    top: 100,
    left: 50,
  }}
/>
```

## Getting GIF duration

Use `getGifDurationInSeconds()` from `@picus/gif` to get the duration of a GIF.

```bash
npx picus add @picus/gif
```

```tsx
import { getGifDurationInSeconds } from "@picus/gif";
import { staticFile } from "picus";

const duration = await getGifDurationInSeconds(staticFile("animation.gif"));
console.log(duration); // e.g. 2.5
```

This is useful for setting the composition duration to match the GIF:

```tsx
import { getGifDurationInSeconds } from "@picus/gif";
import { staticFile, CalculateMetadataFunction } from "picus";

const calculateMetadata: CalculateMetadataFunction = async () => {
  const duration = await getGifDurationInSeconds(staticFile("animation.gif"));
  return {
    durationInFrames: Math.ceil(duration * 30),
  };
};
```

## Alternative

If `<AnimatedImage>` does not work (only supported in Chrome and Firefox), you can use `<Gif>` from `@picus/gif` instead.

```bash
npx picus add @picus/gif # If project uses npm
bunx picus add @picus/gif # If project uses bun
yarn picus add @picus/gif # If project uses yarn
pnpm exec picus add @picus/gif # If project uses pnpm
```

```tsx
import { Gif } from "@picus/gif";
import { staticFile } from "picus";

export const MyComposition = () => {
  return <Gif src={staticFile("animation.gif")} width={500} height={500} />;
};
```

The `<Gif>` component has the same props as `<AnimatedImage>` but only supports GIF files.
