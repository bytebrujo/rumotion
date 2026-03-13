# Picus + React Router 7 Starter Kit

<p align="center">
  <a href="https://github.com/picus-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Picus Logo" src="https://github.com/picus-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

This is a [React Router 7 starter kit](https://reactrouter.com/home) with [Picus](https://picus.dev), [`@picus/player`](https://picus.dev/player) and [`@picus/lambda`](https://picus.dev/lambda) built in.  
It lets you render a video from a React Router app with AWS Lambda.

## Getting started

Install dependencies using

<!-- create-video will replace this with the package manager specific command -->

```
npm install
```

## Run the React Router app

Run the example app using:

```
npm run dev
```

## Edit the video

Start the Picus Preview (the editor interface) using:

```
npm run picus:studio
```

## Render videos with AWS Lambda

Follow these steps to set up video rendering:

1. Follow the steps in [Picus Lambda setup guide](https://www.picus.dev/docs/lambda/setup).
2. Rename the `.env.example` file to `.env`.
3. Fill in the `PICUS_AWS_ACCESS_KEY_ID` and `PICUS_AWS_SECRET_ACCESS_KEY` values that you got from the first step.

4. Run the following to deploy your Lambda function and Picus site:

```
node deploy.mjs
```

> Rerun this command whenever you have upgraded to a new Picus version.

5. Restart the server.

## Commands

Start the app in development mode:

```
npm run dev
```

Build the app for production:

```
npm run build
```

Start the app in production mode (after build is done):

```
npm run dev
```

Start the Picus Studio:

```
npm run picus:studio
```

Render the example video locally:

```
npx picus render
```

Upgrade all Picus packages:

```
npx picus upgrade
```

Render the example video on AWS Lambda:

```
npm run picus:renderlambda
```

Deploy/Update the Picus video on S3 and the Lambda function:

```
node deploy.mjs
```

## Upgrading Picus

When upgrading Picus to a newer version, you will need to redeploy your function and update your site using the commands above.  
If your functions or sites are already used in production, make sure to not overwrite them - [read here](https://www.picus.dev/docs/lambda/upgrading) for more details about upgrading.

## Docs

Get started with Picus by reading the [fundamentals page](https://www.picus.dev/docs/the-fundamentals).  
See the [React Router Docs](https://reactrouter.com/) to read about the framework.

## Help

Join the [Picus Discord server](https://picus.dev/discord) to chat with other Picus builders.

## Issues

Found an issue with Picus? [File an issue here](https://picus.dev/issue).

## License

Note that for some entities a Picus company license is needed. Read [the terms here](https://picus.dev/license).
