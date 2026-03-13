---
name: parameters
description: Make a video parametrizable by adding a Zod schema
metadata:
  tags: parameters, zod, schema
---

To make a video parametrizable, a Zod schema can be added to a composition.

First, `zod` must be installed .

Search the project for lockfiles and run the correct command depending on the package manager:

If `package-lock.json` is found, use the following command:

```bash
npm i zod
```

If `bun.lockb` is found, use the following command:

```bash
bun i zod
```

If `yarn.lock` is found, use the following command:

```bash
yarn add zod
```

If `pnpm-lock.yaml` is found, use the following command:

```bash
pnpm i zod
```

Then, a Zod schema can be defined alongside the component:

```tsx title="src/MyComposition.tsx"
import { z } from "zod";

export const MyCompositionSchema = z.object({
  title: z.string(),
});

const MyComponent: React.FC<z.infer<typeof MyCompositionSchema>> = () => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};
```

In the root file, the schema can be passed to the composition:

```tsx title="src/Root.tsx"
import { Composition } from "picus";
import { MycComponent, MyCompositionSchema } from "./MyComposition";

export const PicusRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComponent}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{ title: "Hello World" }}
      schema={MyCompositionSchema}
    />
  );
};
```

Now, the user can edit the parameter visually in the sidebar.

All schemas that are supported by Zod are supported by Picus.

Picus requires that the top-level type is a z.object(), because the collection of props of a React component is always an object.

## Color picker

For adding a color picker, use `zColor()` from `@picus/zod-types`.

If it is not installed, use the following command:

```bash
npx picus add @picus/zod-types # If project uses npm
bunx picus add @picus/zod-types # If project uses bun
yarn picus add @picus/zod-types # If project uses yarn
pnpm exec picus add @picus/zod-types # If project uses pnpm
```

Then import `zColor` from `@picus/zod-types`:

```tsx
import { zColor } from "@picus/zod-types";
```

Then use it in the schema:

```tsx
export const MyCompositionSchema = z.object({
  color: zColor(),
});
```
