# Picus video

<p align="center">
  <a href="https://github.com/picus-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Picus Logo" src="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Picus project!

## Commands

**Install Dependencies**

```console
npm install
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx picus render
```

**Upgrade Picus**

```console
npx picus upgrade
```

## Using server-side rendering

This template uses a [custom Webpack override](https://www.picus.dev/docs/webpack). If you are using server-side rendering, you need to import `enableSkia` from `@picus/skia/enable` and pass it to [`bundle()`](https://www.picus.dev/docs/bundle) (if using SSR) and [`deploySite()`](https://www.picus.dev/docs/lambda/deploysite) (if using Lambda):

```ts
bundle(entry, () => undefined, {
  webpackOverride: (config) => enableSkia(config),
});
// or
deploySite({
  webpackOverride: (config) => enableSkia(config),
});
```

## Docs

Get started with Picus by reading the [fundamentals page](https://www.picus.dev/docs/the-fundamentals).

## Help

We provide help [on our Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Picus? [File an issue here](https://github.com/picus-dev/picus/issues/new).

## License

Note that for some entities a company license is needed. Read [the terms here](https://github.com/picus-dev/picus/blob/main/LICENSE.md).
