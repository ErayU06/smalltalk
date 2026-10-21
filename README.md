# SmallTalk

A mobile app for practicing everyday English conversations. Learners pick a real-life scenario, chat with a partner, and get tips and feedback when the conversation ends. The interface is in Turkish and the practice language is English.

**Status:** early prototype. Conversations currently follow scripted lines with suggested replies; there is no backend yet.

## Features

- Six conversation scenarios across three levels (beginner, intermediate, advanced), such as ordering at a café or meeting a new neighbor
- Chat-style practice screen with a typing indicator and suggested replies
- Feedback screen with language tips after each conversation
- Progress screen with a weekly activity chart
- Profile screen
- Light and dark themes

## Tech stack

| Area | Tools |
| --- | --- |
| Language | TypeScript |
| Framework | React Native 0.86, Expo SDK 57 |
| Navigation | Expo Router (file-based routing, tabs and dynamic routes) |
| Platforms | iOS, Android and web (React Native Web) |
| Quality | ESLint, TypeScript strict checks |

## Project structure

```
src/app/(tabs)/        Home, Progress and Profile tabs
src/app/practice/[id]  Conversation screen for a scenario
src/app/feedback/[id]  Feedback screen after a conversation
src/components/        Message bubbles, scenario cards, weekly chart and themed UI
src/data/              Scenarios and sample progress data
src/hooks/             Practice session logic and theming
```

## Run locally

```bash
npm install
npx expo start
```

## Roadmap

- Free-form replies evaluated by a language model instead of scripted lines
- Speech input and pronunciation feedback
- Saved progress and accounts

## Author

Eray Ulusoy · [erayulusoy.com](https://erayulusoy.com)
