# Welcome!

## Introduction

A getting started guide for this Server-Side rendering ServisBOT app.

## Main Features
* Server-side rendering: implemented server-side rendering for better performance
* Leverage dynamic routing of Next.js
* 0 vulnerabilities for the NPM packages installed
* Common API endpoint for Logs
* Minimal set of dependencies in package.json
* APIs have been annotated with @swagger decorator and documented in Swagger
* Pagination, Sorting, Filtering implemented with material UI built-in features
* 

## Getting started

### Pre-requisites

Node and NPM installed

### Project setup

Install the dependencies
```shell
npm run install
```

### Run the App
```shell
npm run dev
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



## NPM tasks

## Tests
```shell
npm run test
```

to run a test automatically when a file changes

```shell
npm run test:watch
```
Coverage is generated under `coverage` folder

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

* Implement API Authentication
* Use database for data storage
* Use server-side pagination for better performance
* i18n