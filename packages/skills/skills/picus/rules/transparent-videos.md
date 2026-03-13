---
name: transparent-videos
description: Rendering transparent videos in Picus
metadata:
  tags: transparent, alpha, codec, vp9, prores, webm
---

# Rendering Transparent Videos

Picus can render transparent videos in two ways: as a ProRes video or as a WebM video.

## Transparent ProRes

Ideal for when importing into video editing software.

**CLI:**

```bash
npx picus render --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 MyComp out.mov
```

**Default in Studio** (restart Studio after changing):

```ts
// picus.config.ts
import { Config } from "@picus/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva444p10le");
Config.setCodec("prores");
Config.setProResProfile("4444");
```

**Setting it as the default export settings for a composition** (using `calculateMetadata`):

```tsx
import { CalculateMetadataFunction } from "picus";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  return {
    defaultCodec: "prores",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva444p10le",
    defaultProResProfile: "4444",
  };
};

<Composition
  id="my-video"
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  calculateMetadata={calculateMetadata}
/>;
```

## Transparent WebM (VP9)

Ideal for when playing in a browser.

**CLI:**

```bash
npx picus render --image-format=png --pixel-format=yuva420p --codec=vp9 MyComp out.webm
```

**Default in Studio** (restart Studio after changing):

```ts
// picus.config.ts
import { Config } from "@picus/cli/config";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuva420p");
Config.setCodec("vp9");
```

**Setting it as the default export settings for a composition** (using `calculateMetadata`):

```tsx
import { CalculateMetadataFunction } from "picus";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  return {
    defaultCodec: "vp8",
    defaultVideoImageFormat: "png",
    defaultPixelFormat: "yuva420p",
  };
};

<Composition
  id="my-video"
  component={MyVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  calculateMetadata={calculateMetadata}
/>;
```
