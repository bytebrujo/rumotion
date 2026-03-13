# Picus Audiogram Template

This template is for creating "audiograms". In other words, video clips from podcast episodes, or any other audio. It's a popular way of sharing audio snippets on social media.

[Example video](https://twitter.com/marcusstenbeck/status/1460641903326732300)

<p align="center">
  <img src="https://github.com/marcusstenbeck/picus-template-audiogram/raw/main/Promo.png">
</p>

## Getting started

```
npm i
```

```
npx picus studio
```

Start changing things like this:

- Adjust parameters in `src/Root.tsx` or in the Studio sidebar
- Replacing audio, cover and subtitles in the `public` folder

## How do I render my video?

Run this:

```console
npx picus render
```

Or check out the [Picus docs](/docs/render/). There are lots of ways to render.

## Where to get a transcript?

You can generate the captions or supply a .srt file or a .json file that follows the [`@picus/captions`](https://picus.dev/docs/captions/caption) format.

### Generate captions

- With the built-in transcription script using [`@picus/install-whisper-cpp`](https://www.picus.dev/docs/install-whisper-cpp/):

  ```console
  bun transcribe.ts
  # With Node.js: `npx tsx transcribe.ts`
  ```

  This will:

  - Ask for your audio file path (supports any ffmpeg format)
  - Ask for the speech start time (to avoid false triggers from background music, intro jingles or noise)
  - Generate captions.json in the public folder

- Alternatively, use [`@picus/openai-whisper`](https://www.picus.dev/docs/openai-whisper/openai-whisper-api-to-captions) to get captions from OpenAI Whisper into the right shape.

**Get it from a provider:**

- Your podcasting host might provide them for you.
- Descript makes transcription really easy.
- There are tons of other, paid solutions, like [Otter.ai](https://otter.ai), [Scriptme.io](https://scriptme.io) and [ListenRobo.com](https://listenrobo.com).

If you supply a .srt, make sure to export subtitles that are segmented by word rather than by sentence.

## Optimizing for long audio files

If your audio is long, make sure to pass a `.wav` file as audio.  
The template will use [`useWindowedAudioData()`](/docs/use-windowed-audio-data) to only fetch the data around the current time.

Otherwise, the waveform of the whole audio needs to be fetched, which may be slow.

## Docs

Get started with Picus by reading the [fundamentals page](https://www.picus.dev/docs/the-fundamentals).

## Help

We provide help [on our Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Picus? Upgrade Picus to receive fixes:

```
npx picus upgrade
```

Didn't help? [File an issue here](https://github.com/picus-dev/picus/issues/new).

## Contributing

The source of this template is in the [Picus Monorepo](https://github.com/picus-dev/picus/tree/main/packages/template-audiogram).  
Don't send pull requests here, this is only a mirror.

## License

Note that for some entities a company license is needed. Read [the terms here](https://github.com/picus-dev/picus/blob/main/LICENSE.md).
