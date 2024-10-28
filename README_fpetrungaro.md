# Welcome!

## Introduction

A getting started guide for this Server-Side ServisBOT app.

Main Features:
* Server-side rendering: implemented server-side rendering for a more performant application
* Leverage dynamic routing of NExt.js
* 0 vulnerabilities for the NPM packages installed
* Common API endpoint for Logs
* Minimal set of dependencies in package.json
* APIs have been annotated with @swagger decorator and documented in Swagger
* API error handling

## Getting started

### Pre-requisites

Node and NPM installed

### Project setup

Create a new Next.js app with TypeScript support
```shell
npx create-next-app@latest --typescript .
```
### Install required dependencies

```shell
npm install @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux redux-thunk
npm install next-redux-wrapper
```

## Project Structure

```shell
/pages
  ├── index.tsx                # Main bot list page
  ├── bot/[botId].tsx          # Bot detail page with workers and logs for a bot
  └── bot/[botId]/worker/[workerId].tsx  # Worker detail page showing logs for a specific worker associated to a specific bot
/store
  ├── index.ts                  # Redux store setup
  ├── botSlice.ts               # Redux slice for managing bots
  ├── workerSlice.ts            # Redux slice for managing workers
  ├── logSlice.ts               # Redux slice for managing logs
/components
  ├── BotList.tsx               # Bot list component
  ├── WorkerList.tsx            # Worker list component
  └── LogList.tsx               # Log list component
/types
  └── dataModels.ts             # TypeScript types for data models
/data
  ├── bots.json                 # Dummy bot data
  ├── workers.json              # Dummy worker data
  └── logs.json                 # Dummy log data
```

Summary
•	index.tsx: Displays the list of bots.
•	bot/[botId].tsx: Displays the list of workers and logs for a specific bot.
•	worker/[workerId].tsx: Displays the list of logs for a specific worker within a bot.
This setup meets the requirements with clear structure and modularized code, allowing each page to handle its own responsibility effectively.

## Run the App
```shell
npm run dev
```


## Documentation

Documentation is based on Swagger

```shell
npm install swagger-ui-react swagger-jsdoc @types/swagger-ui-react
```

Browse

```shell
http://localhost:3000/swagger
```



## TODOS

* Implemenent API Authorization
* Use database for data
* Use server-side pagination for a better performance