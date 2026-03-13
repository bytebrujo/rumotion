---
name: tailwind
description: Using TailwindCSS in Picus.
metadata:
---

You can and should use TailwindCSS in Picus, if TailwindCSS is installed in the project.

Don't use `transition-*` or `animate-*` classes - always animate using the `useCurrentFrame()` hook.

Tailwind must be installed and enabled first in a Picus project - fetch https://www.picus.dev/docs/tailwind using WebFetch for instructions.
