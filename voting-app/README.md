# PollWave – Angular Polling App

A clean, production-grade Angular 17 frontend for the Spring Boot Polling REST API.

## Features
- 📋 **View all polls** – grid layout with vote counts and leading option
- 🗳️ **Vote on a poll** – select an option, submit, see live results with progress bars
- ➕ **Create a poll** – reactive form with dynamic options (2–8), validation
- 🔗 **Connected to Spring Boot** via `HttpClient` service

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── poll.model.ts          # Poll, PollOption, VoteRequest interfaces
│   ├── services/
│   │   └── poll.service.ts        # API calls: getAll, getById, create, vote
│   ├── components/
│   │   ├── poll-list/             # Home page – all polls grid
│   │   ├── poll-detail/           # Single poll – vote + results
│   │   └── create-poll/           # New poll form
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   ├── app.component.*
├── environments/
│   └── environment.ts             # API base URL config
├── styles.scss                    # Global CSS variables & resets
└── index.html
```

## Prerequisites
- Node.js 18+
- Angular CLI 17: `npm install -g @angular/cli`
- Spring Boot backend running on `http://localhost:8080`

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
ng serve

# 3. Open in browser
http://localhost:4200
```

## API Endpoints Used

| Method | URL                        | Description      |
|--------|----------------------------|------------------|
| GET    | /api/polls                 | Get all polls    |
| GET    | /api/polls/:id             | Get poll by ID   |
| POST   | /api/polls                 | Create a poll    |
| POST   | /api/polls/vote            | Submit a vote    |

## Configuration

To change the backend URL, edit `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'   // ← change this
};
```

## CORS Note

Make sure your Spring Boot backend allows requests from `http://localhost:4200`.
Add this to your Spring Boot controller or config:

```java
@CrossOrigin(origins = "http://localhost:4200")
```

Or configure a global CORS policy in a `WebMvcConfigurer` bean.
