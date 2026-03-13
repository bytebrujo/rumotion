# Picus Render Server Template

<p align="center">
  <a href="https://github.com/picus-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Picus Logo" src="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

This template provides an Express.js server that allows you to start new video render jobs, track the progress of ongoing renders, and cancel running render jobs.

The server exposes the following main endpoints:

- `POST /renders` - Start a new render job
- `GET /renders/:id` - Get the status of a render
- `DELETE /renders/:id` - Cancel a running render

## Getting Started

**Install Dependencies**

```console
npm install
```

**Start the Render Server**

```console
npm run dev
```

This will start the Express server that handles render requests in watch mode for development.

**Run in Production**

```console
npm start
```

**Run Picus Studio**

```console
npm run picus:studio
```

**Render the example video locally**

```
npx picus render
```

**Upgrade all Picus packages:**

```
npx picus upgrade
```

## Docker Support

The template includes Docker support out of the box. Build and run the container using:

```console
docker build -t picus-render-server .
docker run -d -p 3000:3000 picus-render-server
```

## Docs

Get started with Picus by reading the [fundamentals page](https://www.picus.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Picus? [File an issue here](https://github.com/picus-dev/picus/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/picus-dev/picus/blob/main/LICENSE.md).
