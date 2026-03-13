---
name: fonts
description: Loading Google Fonts and local fonts in Picus
metadata:
  tags: fonts, google-fonts, typography, text
---

# Using fonts in Picus

## Google Fonts with @picus/google-fonts

The recommended way to use Google Fonts. It's type-safe and automatically blocks rendering until the font is ready.

### Prerequisites

First, the @picus/google-fonts package needs to be installed.
If it is not installed, use the following command:

```bash
npx picus add @picus/google-fonts # If project uses npm
bunx picus add @picus/google-fonts # If project uses bun
yarn picus add @picus/google-fonts # If project uses yarn
pnpm exec picus add @picus/google-fonts # If project uses pnpm
```

```tsx
import { loadFont } from "@picus/google-fonts/Lobster";

const { fontFamily } = loadFont();

export const MyComposition = () => {
  return <div style={{ fontFamily }}>Hello World</div>;
};
```

Preferrably, specify only needed weights and subsets to reduce file size:

```tsx
import { loadFont } from "@picus/google-fonts/Roboto";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});
```

### Waiting for font to load

Use `waitUntilDone()` if you need to know when the font is ready:

```tsx
import { loadFont } from "@picus/google-fonts/Lobster";

const { fontFamily, waitUntilDone } = loadFont();

await waitUntilDone();
```

## Local fonts with @picus/fonts

For local font files, use the `@picus/fonts` package.

### Prerequisites

First, install @picus/fonts:

```bash
npx picus add @picus/fonts # If project uses npm
bunx picus add @picus/fonts # If project uses bun
yarn picus add @picus/fonts # If project uses yarn
pnpm exec picus add @picus/fonts # If project uses pnpm
```

### Loading a local font

Place your font file in the `public/` folder and use `loadFont()`:

```tsx
import { loadFont } from "@picus/fonts";
import { staticFile } from "picus";

await loadFont({
  family: "MyFont",
  url: staticFile("MyFont-Regular.woff2"),
});

export const MyComposition = () => {
  return <div style={{ fontFamily: "MyFont" }}>Hello World</div>;
};
```

### Loading multiple weights

Load each weight separately with the same family name:

```tsx
import { loadFont } from "@picus/fonts";
import { staticFile } from "picus";

await Promise.all([
  loadFont({
    family: "Inter",
    url: staticFile("Inter-Regular.woff2"),
    weight: "400",
  }),
  loadFont({
    family: "Inter",
    url: staticFile("Inter-Bold.woff2"),
    weight: "700",
  }),
]);
```

### Available options

```tsx
loadFont({
  family: "MyFont", // Required: name to use in CSS
  url: staticFile("font.woff2"), // Required: font file URL
  format: "woff2", // Optional: auto-detected from extension
  weight: "400", // Optional: font weight
  style: "normal", // Optional: normal or italic
  display: "block", // Optional: font-display behavior
});
```

## Using in components

Call `loadFont()` at the top level of your component or in a separate file that's imported early:

```tsx
import { loadFont } from "@picus/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1
      style={{
        fontFamily,
        fontSize: 80,
        fontWeight: "bold",
      }}
    >
      {text}
    </h1>
  );
};
```
