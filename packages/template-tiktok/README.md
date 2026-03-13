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
npm i
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

## Captioning

Replace the `sample-video.mp4` with your video file.
Caption all the videos in you `public` by running the following command:

```console
node sub.mjs
```

Only caption a specific video:

```console
node sub.mjs <path-to-video-file>
```

Only caption a specific folder:

```console
node sub.mjs <path-to-folder>
```

## Configure Whisper.cpp

Captioning will download Whisper.cpp and the 1.5GB big `medium.en` model. To configure which model is being used, you can configure the variables in `whisper-config.mjs`.

### Non-English languages

To support non-English languages, you need to change the `WHISPER_MODEL` variable in `whisper-config.mjs` to a model that does not have a `.en` sufix.

## Docs

Get started with Picus by reading the [fundamentals page](https://www.picus.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://picus.dev/discord).

## Issues

Found an issue with Picus? [File an issue here](https://github.com/picus-dev/picus/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/picus-dev/picus/blob/main/LICENSE.md).
